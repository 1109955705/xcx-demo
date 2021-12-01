import { Stage, Rect, Circle, EventNames } from "../bundle.esm.js";

function getSystemInfoSync() {
  return wx.getSystemInfoSync()
}
function rpx2px(rpx) {
  return rpx * (wx.getSystemInfoSync().windowWidth / 750)
}



Page({
  data: {
    // canvas
    canvasWidth: null,
    canvasHeight: null,
  },
  onReady() {
    let {
      screenHeight,
      screenWidth
    } = wx.getSystemInfoSync()
    this.setData({
      canvasWidth: screenWidth,
      canvasHeight: screenHeight,
    })
    this.createShareFriendsPicture()
  },
  onSaveSharePictureClick() {
    let {
      shareFriendsPicture
    } = this.data
    wx.saveImageToPhotosAlbum({
      filePath: shareFriendsPicture,
      success: (res) => {
        wx.showModal({
          title: '操作提示',
          content: '图片保存成功，可以去朋友圈分享了',
          showCancel: false,
        })
      },
      fail: (res) => {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.showModal({
                title: '信息授权提示',
                content: '需要访问您当前的相册，请到小程序的设置中授权',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {},
                    })
                  } else {
                    wx.showModal({
                      title: '操作提示',
                      content: '需要您的授权',
                      showCancel: false,
                    })
                  }
                },
              })
            }
          },
        })
      },
    })
  },
  /**
   * 绘制圆角矩形
   * @param ctx 画布
   * @param x 矩形在画布的起始位置 X 坐标
   * @param y 矩形在画布的起始位置 Y 坐标
   * @param width 矩形宽度
   * @param height 矩形高度
   * @param radius 矩形圆角弧度
   */
  drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI)
    ctx.lineTo(x + width, y + height - radius)
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI)
    ctx.lineTo(x + radius, y + height)
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI)
    ctx.lineTo(x, y + radius)
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI)
    ctx.closePath()
  },
  /**
   * 绘制圆角图片
   * @param ctx canvas
   * @param image 图片对象
   * @param startX 起始坐标
   * @param startY 起始坐标
   * @param width 需要绘制的图片宽度
   * @param height 需要绘制的图片高度
   * @param radius 图片圆角大小
   */
  drawRoundImage(ctx, image, startX, startY, width, height, radius) {
    ctx.save()
    // 先绘制目标图片大小的圆角矩形
    this.drawRoundRect(ctx, startX, startY, width, height, radius)
    // 裁剪画布
    ctx.clip()
    // 在裁剪后的画布上绘制图片
    ctx.drawImage(image, 0, 0, image.width, image.height, startX, startY, width, height)
    // 恢复画布
    ctx.restore()
  },
  createShareFriendsPicture() {
    wx.showLoading({
      title: '生成图片中...',
    })
    // 获取画布
    wx.createSelectorQuery().select('#canvas')
      .fields({
        node: true,
        size: true
      })
      .exec((rectxxx) => {
        // 初始化画布信息
        let {
          canvasWidth,
          canvasHeight
        } = this.data
        let {
          pixelRatio: dpr
        } = getSystemInfoSync()
        const canvas = rectxxx[0].node
        const osCanvas = wx.createOffscreenCanvas({
          type: '2d',
          width: canvasWidth,
          height: canvasHeight,
        })

        const stage = new Stage(canvas, osCanvas, dpr);
        const rect = new Rect({
          origin: [0, 0],
          x: 0,
          y: 0,
          width: 250,
          height: 250,
          radius0: 20,
          radius1: 20,
          radius2: 20,
          radius3: 20,
          fillColor: "green",
        });
        console.log("xxxxxx", rect);
        const circle = new Circle({
          origin: [0, 0],
          x: 100,
          y: 100,
          radius: 100,
          fillColor: "red",
        });
        stage.add(rect);
        stage.add(circle);
        let saveImageSuccess = (tempFilePath) => {
          this.setData({
            shareFriendsPicture: tempFilePath,
            showShareFriendsPicturePopup: true,
          })
        }
        wx.canvasToTempFilePath({
          canvas: canvas,
          success(res) {
            console.log(res)
            wx.hideLoading()
            saveImageSuccess(res.tempFilePath)
          },
          fail(res) {
            console.log(res)
          },
        })
      })
  },
  /**
   * 绘制多行文本
   * @param canvas
   * @param text 文本内容
   * @param x 起始坐标
   * @param y 起始坐标
   * @param maxWidth 文本最大宽度
   * @param fontSize 字体大小
   * @param maxRowNum 最大行
   */
  canvasWrapText(canvas, text, x, y, maxWidth, fontSize, maxRowNum) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
      return
    }
    let lineHeight = fontSize * 1.3
    canvas.font = `${fontSize}px sans-serif` // 绘制文字的字号和大小
    // 字符分隔为数组
    let arrText = text.split('')
    let line = ''
    let rowNum = 1
    for (let n = 0; n < arrText.length; n++) {
      let testLine = line + arrText[n]
      let metrics = canvas.measureText(testLine)
      let testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        if (rowNum >= maxRowNum) {
          let arrLine = testLine.split('')
          arrLine.splice(-2)
          let newTestLine = arrLine.join('')
          newTestLine += '...'
          canvas.fillText(newTestLine, x, y)
          return
        }
        canvas.fillText(line, x, y)
        line = arrText[n]
        y += lineHeight
        rowNum += 1
      } else {
        line = testLine
      }
    }
    canvas.fillText(line, x, y)
  },
})