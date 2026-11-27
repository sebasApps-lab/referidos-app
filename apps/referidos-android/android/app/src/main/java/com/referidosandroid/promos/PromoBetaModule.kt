package com.referidosandroid.promos

import android.app.Activity
import android.app.DatePickerDialog
import android.content.ClipData
import android.content.Intent
import android.graphics.Color
import android.os.Build
import androidx.core.content.FileProvider
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import java.io.File
import java.io.IOException
import java.util.Calendar
import java.util.Locale
import java.util.UUID

@Suppress("DEPRECATION")
internal class PromoBetaModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  private data class Pending(val request: Int, val promise: Promise, val file: File? = null)

  private var pending: Pending? = null
  private val sessionId = UUID.randomUUID().toString()

  private val documentListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
      val operation = pending ?: return
      if (requestCode != operation.request) return
      pending = null
      val uri = data?.data
      if (resultCode != Activity.RESULT_OK || uri == null) {
        operation.file?.delete()
        operation.promise.resolve(null)
        return
      }
      work(operation.promise) {
        if (requestCode == PICK_PHOTO) {
          operation.promise.resolve(PromoMedia.importPhoto(context, uri))
        } else {
          val file = checkNotNull(operation.file)
          try {
            val output = context.contentResolver.openOutputStream(uri)
              ?: throw IOException("Cannot open destination")
            output.use { stream -> file.inputStream().use { it.copyTo(stream) } }
            operation.promise.resolve("document")
          } finally {
            file.delete()
          }
        }
      }
    }
  }

  init {
    context.addActivityEventListener(documentListener)
  }

  override fun getName() = "ReferidosPromoBeta"

  override fun getConstants(): MutableMap<String, Any> = mutableMapOf("sessionId" to sessionId)

  override fun invalidate() {
    context.removeActivityEventListener(documentListener)
    context.runOnUiQueueThread {
      pending?.file?.delete()
      pending = null
    }
    super.invalidate()
  }

  @ReactMethod
  fun pickPhoto(promise: Promise) {
    val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
      addCategory(Intent.CATEGORY_OPENABLE)
      type = "image/*"
    }
    openDocument(intent, Pending(PICK_PHOTO, promise))
  }

  @ReactMethod
  fun pickDate(value: String?, promise: Promise) {
    withActivity(promise) { activity ->
      val today = Calendar.getInstance()
      val parts = value?.split('-')?.mapNotNull(String::toIntOrNull).orEmpty()
      val dialog = DatePickerDialog(
        activity,
        { _, year, month, day -> promise.resolve(String.format(Locale.ROOT, "%04d-%02d-%02d", year, month + 1, day)) },
        parts.getOrNull(0) ?: today.get(Calendar.YEAR),
        parts.getOrNull(1)?.minus(1) ?: today.get(Calendar.MONTH),
        parts.getOrNull(2) ?: today.get(Calendar.DAY_OF_MONTH),
      )
      dialog.setOnCancelListener { promise.resolve(null) }
      dialog.show()
      dialog.getButton(DatePickerDialog.BUTTON_POSITIVE).setTextColor(Color.parseColor("#592FA0"))
      dialog.getButton(DatePickerDialog.BUTTON_NEGATIVE).setTextColor(Color.parseColor("#592FA0"))
    }
  }

  @ReactMethod
  fun prunePhotos(retained: ReadableArray, promise: Promise) {
    val names = (0 until retained.size()).mapNotNull(retained::getString).toSet()
    work(promise) {
      PromoMedia.prunePhotos(context, names)
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun shareImage(data: ReadableMap, promise: Promise) {
    val card = PromoCardData.from(data)
    work(promise) {
      val file = PromoMedia.temporaryPng(context, card)
      withActivity(promise, onFailure = { file.delete() }) { activity ->
        val uri = FileProvider.getUriForFile(context, "${context.packageName}.promo-exports", file)
        val send = Intent(Intent.ACTION_SEND).apply {
          type = "image/png"
          putExtra(Intent.EXTRA_STREAM, uri)
          clipData = ClipData.newUri(context.contentResolver, "Promoción", uri)
          addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        activity.startActivity(Intent.createChooser(send, "Compartir promoción"))
        promise.resolve("chooser_opened")
      }
    }
  }

  @ReactMethod
  fun saveImage(data: ReadableMap, promise: Promise) {
    val card = PromoCardData.from(data)
    work(promise) {
      if (Build.VERSION.SDK_INT >= 29) {
        PromoMedia.saveToGallery(context, card)
        promise.resolve("gallery")
      } else {
        val file = PromoMedia.temporaryPng(context, card)
        val intent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
          addCategory(Intent.CATEGORY_OPENABLE)
          type = "image/png"
          putExtra(Intent.EXTRA_TITLE, "referidos-promocion.png")
        }
        openDocument(intent, Pending(SAVE_DOCUMENT, promise, file))
      }
    }
  }

  private fun openDocument(intent: Intent, operation: Pending) {
    withActivity(operation.promise, onFailure = { operation.file?.delete() }) { activity ->
      check(pending == null) { "A document picker is already open" }
      pending = operation
      try {
        activity.startActivityForResult(intent, operation.request)
      } catch (error: Exception) {
        pending = null
        throw error
      }
    }
  }

  private fun withActivity(promise: Promise, onFailure: () -> Unit = {}, action: (Activity) -> Unit) {
    context.runOnUiQueueThread {
      try {
        val activity = currentActivity ?: throw IllegalStateException("The app is not in the foreground")
        action(activity)
      } catch (error: Exception) {
        onFailure()
        promise.reject("promo_activity_failed", error)
      }
    }
  }

  private fun work(promise: Promise, action: () -> Unit) {
    PromoMedia.worker.execute {
      try {
        action()
      } catch (error: Exception) {
        promise.reject("promo_media_failed", error)
      } catch (error: OutOfMemoryError) {
        promise.reject("promo_image_too_large", error)
      }
    }
  }

  companion object {
    private const val PICK_PHOTO = 23151
    private const val SAVE_DOCUMENT = 23152
  }
}
