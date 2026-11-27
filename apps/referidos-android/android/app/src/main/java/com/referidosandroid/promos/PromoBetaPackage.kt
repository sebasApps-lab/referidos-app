package com.referidosandroid.promos

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
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
}

internal class PromoCardView(context: Context) : View(context) {
  private var card: PromoCardData? = null
  private var photo: Bitmap? = null

  fun setCard(next: PromoCardData?, thumbnail: Boolean) {
    val previousPhoto = card?.photo
    card = next
    if (previousPhoto != next?.photo) {
      photo = null
      next?.photo?.let { name ->
        PromoMedia.previewWorker.execute {
          val bitmap = runCatching {
            PromoMedia.readPhoto(context.applicationContext, name, if (thumbnail) 8 else 1)
          }.getOrNull()
          post {
            if (card?.photo == name) {
              photo = bitmap
              invalidate()
            } else {
              bitmap?.recycle()
            }
          }
        }
      }
    }
    invalidate()
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
