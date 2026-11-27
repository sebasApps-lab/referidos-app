package com.referidosandroid.promos

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Handler
import android.os.Looper
import android.view.View
import androidx.core.content.FileProvider
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.uimanager.annotations.ReactProp
import java.util.concurrent.Future

class PromoExportProvider : FileProvider()

class PromoBetaPackage : ReactPackage {
  override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> =
    listOf(PromoBetaModule(context))

  override fun createViewManagers(context: ReactApplicationContext): List<ViewManager<*, *>> =
    listOf(PromoCardManager())
}

internal class PromoCardManager : SimpleViewManager<PromoCardView>() {
  override fun getName() = "ReferidosPromoCard"

  override fun createViewInstance(context: ThemedReactContext) = PromoCardView(context)

  @ReactProp(name = "cardData")
  fun setCardData(view: PromoCardView, data: ReadableMap?) {
    val thumbnail = data?.hasKey("thumbnail") == true && data.getBoolean("thumbnail")
    view.setCard(data?.let(PromoCardData::from), thumbnail)
  }

  override fun onDropViewInstance(view: PromoCardView) {
    view.setCard(null, false)
    super.onDropViewInstance(view)
  }
}

internal class PromoCardView(context: Context) : View(context) {
  private var card: PromoCardData? = null
  private var photo: Bitmap? = null
  private var thumbnail = false
  private var request = 0
  private var decode: Future<*>? = null
  private val main = Handler(Looper.getMainLooper())

  fun setCard(next: PromoCardData?, thumbnail: Boolean) {
    val needsPhoto = card?.photo != next?.photo || this.thumbnail != thumbnail
    card = next
    this.thumbnail = thumbnail
    if (needsPhoto) loadPhoto()
    invalidate()
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    loadPhoto()
  }

  override fun onDetachedFromWindow() {
    clearPhoto()
    super.onDetachedFromWindow()
  }

  private fun clearPhoto() {
    request++
    decode?.cancel(false)
    decode = null
    // A previously drawn bitmap may still be referenced by the hardware renderer.
    photo = null
  }

  private fun loadPhoto() {
    clearPhoto()
    val name = card?.photo ?: return
    if (!isAttachedToWindow) return
    val generation = request
    val sample = if (thumbnail) 8 else 2
    decode = PromoMedia.previewWorker.submit {
      val bitmap = runCatching { PromoMedia.readPhoto(context.applicationContext, name, sample) }.getOrNull()
      main.post {
        if (generation == request && isAttachedToWindow) {
          photo = bitmap
          decode = null
          invalidate()
        } else {
          bitmap?.recycle()
        }
      }
    }
  }

  override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    val current = card ?: return
    val scale = minOf(width, height).toFloat() / PromoCardRenderer.SIZE
    canvas.save()
    canvas.scale(scale, scale)
    canvas.clipRect(0, 0, PromoCardRenderer.SIZE, PromoCardRenderer.SIZE)
    PromoCardRenderer.draw(canvas, current, photo)
    canvas.restore()
  }
}
