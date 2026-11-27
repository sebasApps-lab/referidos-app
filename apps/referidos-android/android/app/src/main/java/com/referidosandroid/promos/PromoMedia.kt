package com.referidosandroid.promos

import android.content.ContentValues
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.ImageDecoder
import android.graphics.Matrix
import android.media.ExifInterface
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import java.io.File
import java.io.IOException
import java.io.OutputStream
import java.util.UUID
import java.util.concurrent.Executors
import kotlin.math.max
import kotlin.math.roundToInt

internal object PromoMedia {
  private const val PHOTO_SIZE = 1600
  private const val EXPORT_AGE_MS = 24L * 60 * 60 * 1000
  private val photoName = Regex("[a-f0-9-]{36}\\.jpg")
  val worker = Executors.newSingleThreadExecutor()
  val previewWorker = Executors.newSingleThreadExecutor()

  private fun photos(context: Context) = File(context.filesDir, "promo-photos")

  fun photoFile(context: Context, name: String?): File? =
    name?.takeIf(photoName::matches)?.let { File(photos(context), it) }

  fun readPhoto(context: Context, name: String?, sampleSize: Int = 1): Bitmap? =
    photoFile(context, name)?.let {
      BitmapFactory.decodeFile(it.path, BitmapFactory.Options().apply { inSampleSize = sampleSize })
    }

  fun importPhoto(context: Context, uri: Uri): String {
    val bitmap = if (Build.VERSION.SDK_INT >= 28) {
      val source = ImageDecoder.createSource(context.contentResolver, uri)
      ImageDecoder.decodeBitmap(source) { decoder, info, _ ->
        val width = info.size.width
        val height = info.size.height
        val scale = minOf(1f, PHOTO_SIZE.toFloat() / max(width, height))
        decoder.setTargetSize(max(1, (width * scale).roundToInt()), max(1, (height * scale).roundToInt()))
        decoder.allocator = ImageDecoder.ALLOCATOR_SOFTWARE
      }
    } else {
      decodeLegacy(context, uri)
    }
    val name = "${UUID.randomUUID()}.jpg"
    val file = checkNotNull(photoFile(context, name))
    try {
      file.parentFile?.mkdirs()
      file.outputStream().use { output ->
        check(bitmap.compress(Bitmap.CompressFormat.JPEG, 88, output))
      }
      return name
    } catch (error: Exception) {
      file.delete()
      throw error
    } finally {
      bitmap.recycle()
    }
  }

  @Suppress("DEPRECATION")
  private fun decodeLegacy(context: Context, uri: Uri): Bitmap {
    val resolver = context.contentResolver
    val options = BitmapFactory.Options().apply { inJustDecodeBounds = true }
    resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, options) }
    if (options.outWidth <= 0 || options.outHeight <= 0) throw IOException("Invalid photo")
    options.inJustDecodeBounds = false
    options.inSampleSize = 1
    while (max(options.outWidth, options.outHeight) / options.inSampleSize > PHOTO_SIZE * 2) {
      options.inSampleSize *= 2
    }
    val decoded = resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, options) }
      ?: throw IOException("Cannot decode photo")
    val orientation = runCatching {
      resolver.openInputStream(uri)?.use {
        ExifInterface(it).getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL)
      }
    }.getOrNull()
    val scale = minOf(1f, PHOTO_SIZE.toFloat() / max(decoded.width, decoded.height))
    val transform = Matrix().apply {
      setScale(scale, scale)
      when (orientation) {
        ExifInterface.ORIENTATION_FLIP_HORIZONTAL -> postScale(-1f, 1f)
        ExifInterface.ORIENTATION_ROTATE_180 -> postRotate(180f)
        ExifInterface.ORIENTATION_FLIP_VERTICAL -> postScale(1f, -1f)
        ExifInterface.ORIENTATION_TRANSPOSE -> { postScale(-1f, 1f); postRotate(270f) }
        ExifInterface.ORIENTATION_ROTATE_90 -> postRotate(90f)
        ExifInterface.ORIENTATION_TRANSVERSE -> { postScale(-1f, 1f); postRotate(90f) }
        ExifInterface.ORIENTATION_ROTATE_270 -> postRotate(270f)
      }
    }
    val result = Bitmap.createBitmap(decoded, 0, 0, decoded.width, decoded.height, transform, true)
    if (result !== decoded) decoded.recycle()
    return result
  }

  fun prunePhotos(context: Context, retained: Set<String>) {
    photos(context).listFiles()?.forEach { file ->
      if (photoName.matches(file.name) && file.name !in retained) file.delete()
    }
  }

  fun renderPng(context: Context, card: PromoCardData, output: OutputStream) {
    val photo = readPhoto(context, card.photo)
    if (card.photo != null && photo == null) throw IOException("Missing photo")
    val size = PromoCardRenderer.SIZE
    val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    try {
      PromoCardRenderer.draw(Canvas(bitmap), card, photo)
      if (!bitmap.compress(Bitmap.CompressFormat.PNG, 100, output)) throw IOException("Cannot encode PNG")
    } finally {
      bitmap.recycle()
      photo?.recycle()
    }
  }

  fun temporaryPng(context: Context, card: PromoCardData): File {
    val dir = File(context.cacheDir, "promo-exports").apply { mkdirs() }
    val cutoff = System.currentTimeMillis() - EXPORT_AGE_MS
    dir.listFiles()?.forEach { if (it.lastModified() < cutoff) it.delete() }
    val file = File(dir, exportName())
    try {
      file.outputStream().use { renderPng(context, card, it) }
      return file
    } catch (error: Exception) {
      file.delete()
      throw error
    }
  }

  fun saveToGallery(context: Context, card: PromoCardData) {
    check(Build.VERSION.SDK_INT >= 29)
    val resolver = context.contentResolver
    val values = ContentValues().apply {
      put(MediaStore.Images.Media.DISPLAY_NAME, exportName())
      put(MediaStore.Images.Media.MIME_TYPE, "image/png")
      put(MediaStore.Images.Media.RELATIVE_PATH, "${Environment.DIRECTORY_PICTURES}/Referidos Promos")
      put(MediaStore.Images.Media.IS_PENDING, 1)
    }
    val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
      ?: throw IOException("Cannot create image")
    try {
      val output = resolver.openOutputStream(uri) ?: throw IOException("Cannot open image")
      output.use { renderPng(context, card, it) }
      val published = ContentValues().apply { put(MediaStore.Images.Media.IS_PENDING, 0) }
      if (resolver.update(uri, published, null, null) != 1) throw IOException("Cannot publish image")
    } catch (error: Exception) {
      runCatching { resolver.delete(uri, null, null) }
      throw error
    }
  }

  private fun exportName() = "referidos-promo-${UUID.randomUUID()}.png"
}
