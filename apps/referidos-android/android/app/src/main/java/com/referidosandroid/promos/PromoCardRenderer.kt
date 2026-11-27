package com.referidosandroid.promos

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.graphics.Shader
import android.graphics.Typeface
import android.text.Layout
import android.text.StaticLayout
import android.text.TextPaint
import com.facebook.react.bridge.ReadableMap
import kotlin.math.max

internal data class PromoCardData(
  val title: String,
  val offer: String,
  val description: String,
  val businessName: String,
  val expirationLabel: String,
  val template: String,
  val color: String,
  val photo: String?,
) {
  companion object {
    fun from(map: ReadableMap): PromoCardData {
      fun read(key: String) = map.getString(key)?.trim().orEmpty()
      return PromoCardData(
        title = read("title"),
        offer = read("offer"),
        description = read("description"),
        businessName = read("businessName"),
        expirationLabel = read("expirationLabel"),
        template = read("template"),
        color = read("color"),
        photo = read("photo").ifBlank { null },
      )
    }
  }
}

internal object PromoCardRenderer {
  const val SIZE = 1080
  private val bodyTypeface = Typeface.create("sans-serif", Typeface.NORMAL)
  private val heavyTypeface = Typeface.create("sans-serif-black", Typeface.NORMAL)
  private val mediumTypeface = Typeface.create("sans-serif-medium", Typeface.NORMAL)

  private data class Palette(val dark: Int, val bright: Int, val soft: Int, val accent: Int)

  private fun palette(color: String): Palette {
    fun from(dark: String, bright: String, soft: String, accent: String) =
      Palette(Color.parseColor(dark), Color.parseColor(bright), Color.parseColor(soft), Color.parseColor(accent))
    return when (color) {
      "forest" -> from("#123B36", "#266755", "#E7F5E9", "#C7F379")
      "coral" -> from("#591E3D", "#9A3956", "#FFF0E9", "#FFD380")
      "ocean" -> from("#172D62", "#325798", "#E8F2FF", "#BDF3FF")
      else -> from("#321B60", "#663AA8", "#F1E9FF", "#E3F690")
    }
  }

  fun draw(canvas: Canvas, card: PromoCardData, photo: Bitmap?) {
    val colors = palette(card.color)
    val light = card.template == "editorial"
    val graphic = card.template == "contrast"
    val primary = if (light) colors.dark else Color.WHITE
    val secondary = if (light) colors.dark else colors.soft
    val highlight = if (light) colors.bright else colors.accent
    val paint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
    paint.shader = if (light) null else LinearGradient(
      70f, 0f, 1060f, 1180f, colors.dark, colors.bright, Shader.TileMode.CLAMP,
    )
    paint.color = colors.soft
    canvas.drawRect(0f, 0f, SIZE.toFloat(), SIZE.toFloat(), paint)
    paint.shader = null

    paint.color = highlight
    paint.alpha = if (light) 23 else 39
    if (graphic) {
      canvas.save()
      canvas.rotate(-26f, 930f, 440f)
      for (x in 798..1178 step 58) {
        canvas.drawRoundRect(x.toFloat(), -150f, x + 20f, 1260f, 10f, 10f, paint)
      }
      canvas.restore()
    } else {
      paint.style = Paint.Style.STROKE
      paint.strokeWidth = 2f
      for (radius in 210..520 step 35) canvas.drawCircle(960f, 283f, radius.toFloat(), paint)
      paint.style = Paint.Style.FILL
    }
    paint.alpha = 255

    paint.style = Paint.Style.STROKE
    paint.strokeWidth = 2f
    paint.color = primary
    paint.alpha = 86
    canvas.drawRoundRect(36f, 36f, 1044f, 1044f, 32f, 32f, paint)
    paint.style = Paint.Style.FILL
    paint.alpha = 255

    paint.color = highlight
    if (card.businessName.isNotBlank()) {
      canvas.drawPath(sparkle(94f, 99f, 20f), paint)
      drawText(canvas, card.businessName, 128f, 78f, 830, 62, 36, 14, 1, primary, mediumTypeface)
    }

    val hasPhoto = card.photo != null
    val contentWidth = if (hasPhoto) 488 else 924
    if (photo != null) {
      val corner = if (graphic) 22f else 48f
      val photoBounds = RectF(602f, 172f, 1008f, 723f)
      paint.color = highlight
      canvas.drawRoundRect(RectF(614f, 184f, 1020f, 735f), corner, corner, paint)
      val clip = Path().apply { addRoundRect(photoBounds, corner, corner, Path.Direction.CW) }
      canvas.save()
      canvas.clipPath(clip)
      val scale = max(photoBounds.width() / photo.width, photoBounds.height() / photo.height)
      val halfWidth = photo.width * scale / 2f
      val halfHeight = photo.height * scale / 2f
      canvas.drawBitmap(photo, null, RectF(
        photoBounds.centerX() - halfWidth, photoBounds.centerY() - halfHeight,
        photoBounds.centerX() + halfWidth, photoBounds.centerY() + halfHeight,
      ), paint)
      canvas.restore()
    } else if (!hasPhoto) {
      paint.color = highlight
      canvas.drawPath(sparkle(950f, 727f, if (graphic) 30f else 24f), paint)
      canvas.drawPath(sparkle(889f, 730f, 10f), paint)
    }

    drawText(canvas, card.title, 76f, if (graphic) 488f else 198f, contentWidth, 171,
      if (hasPhoto) 60 else 76, 16, if (hasPhoto) 3 else 2, primary, heavyTypeface)
    drawText(canvas, card.offer, 72f, if (graphic) 190f else 378f, contentWidth, if (graphic) 276 else 310,
      if (hasPhoto) 106 else 140, 18, if (hasPhoto) 3 else 2, highlight, heavyTypeface)

    if (card.description.isNotBlank()) {
      drawText(canvas, card.description, 78f, 768f, 924, 145, 37, 16, 3, secondary, bodyTypeface)
    }

    if (card.expirationLabel.isNotBlank()) {
      paint.color = primary
      paint.alpha = 95
      canvas.drawRect(78f, 928f, 1002f, 930f, paint)
      drawText(canvas, "Válida hasta ${card.expirationLabel}", 78f, 952f, 890, 60, 28, 23, 1, primary, mediumTypeface)
    }
  }

  private fun sparkle(x: Float, y: Float, radius: Float) = Path().apply {
    val offset = radius * 0.23f
    moveTo(x, y - radius)
    lineTo(x + offset, y - offset)
    lineTo(x + radius, y)
    lineTo(x + offset, y + offset)
    lineTo(x, y + radius)
    lineTo(x - offset, y + offset)
    lineTo(x - radius, y)
    lineTo(x - offset, y - offset)
    close()
  }

  private fun drawText(
    canvas: Canvas, value: String, x: Float, y: Float, width: Int, height: Int,
    initialSize: Int, minimumSize: Int, maxLines: Int, color: Int, typeface: Typeface,
  ) {
    if (value.isBlank()) return
    val text = value.replace(Regex("\\s+"), " ")
    val paint = TextPaint(Paint.ANTI_ALIAS_FLAG).apply {
      this.color = color
      this.typeface = typeface
    }
    fun layout(size: Int): StaticLayout {
      paint.textSize = size.toFloat()
      return StaticLayout.Builder.obtain(text, 0, text.length, paint, width)
        .setAlignment(Layout.Alignment.ALIGN_NORMAL)
        .setIncludePad(false)
        .build()
    }
    var size = initialSize
    var fitted = layout(size)
    while ((fitted.lineCount > maxLines || fitted.height > height) && size > minimumSize) {
      size = (size - 4).coerceAtLeast(minimumSize)
      fitted = layout(size)
    }
    canvas.save()
    canvas.translate(x, y)
    // Scale unusually wide or tall text after wrapping, without dropping characters.
    val scale = minOf(1f, height.toFloat() / fitted.height)
    canvas.scale(scale, scale)
    fitted.draw(canvas)
    canvas.restore()
  }
}
