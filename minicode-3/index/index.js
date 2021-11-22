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
      .exec((rect) => {
        // 初始化画布信息
        let {
          canvasWidth,
          canvasHeight
        } = this.data
        let {
          pixelRatio: dpr
        } = getSystemInfoSync()
        const canvas = rect[0].node
        const ctx = canvas.getContext('2d')
        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr
        ctx.scale(dpr, dpr)
        // 内容边距 15px
        const padding = rpx2px(50)
        const productImgSize = canvasWidth - 2 * padding
        const interval = rpx2px(20)
        const avatarSize = rpx2px(66)
        const borderRadius = rpx2px(10)
        // 底部置白
        ctx.fillStyle = '#FFF'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        // 开始画头像和昵称
        let avatarPicture = 'https://wx.qlogo.cn/mmhead/xH7wf3Yz5NbiaxEE2RGxib8833ibzVE4sxW2zaoopmEx84/0'
        let nickname = 'NineSu'
        let avatarImage = canvas.createImage()
        avatarImage.src = avatarPicture
        const avatarImagePromise = new Promise(resolve => {
          avatarImage.onload = () => {
            // 绘制头像
            this.drawRoundImage(ctx, avatarImage, padding, padding, avatarSize, avatarSize, borderRadius)
            resolve()
          }
          avatarImage.onerror = (err) => {
            resolve()
          }
        })
        let nicknameFontSize = rpx2px(32)
        // 绘制昵称
        ctx.font = `${nicknameFontSize}px sans-serif`
        ctx.fillStyle = '#303133'
        // ctx.textBaseline = 'middle'
        ctx.fillText(nickname, padding + avatarSize + rpx2px(20), padding + nicknameFontSize)
        // 绘制时间
        const dateTimeText = '2021-11-21 20:28'
        let timeFontSize = rpx2px(20)
        ctx.font = `${timeFontSize}px sans-serif`
        ctx.fillStyle = '#909399'
        ctx.fillText(dateTimeText, padding + avatarSize + rpx2px(20), padding + avatarSize)
        // 绘制商品图片
        let productImage = canvas.createImage()
        productImage.src = 'http://mmbiz.qpic.cn/mmbiz_jpg/ibddfibicoqWyN3rs2FaibCanHKOPyIre7rB1UzOYjLu8Z5DGu11OZwbNGaQSqq7fSL5bHEwu6sZiaggkIF0IrZbnlA/0?wx_fmt=jpeg'
        const productImagePromise = new Promise(resolve => {
          productImage.onload = () => {
            // 绘制商品图片
            this.drawRoundImage(ctx, productImage, padding, interval + padding + avatarSize, productImgSize, productImgSize, borderRadius)
            resolve()
          }
          productImage.onerror = (err) => {
            resolve()
          }
        })
        // 绘制标题
        ctx.fillStyle = '#303133'
        let title = '这是一段很长的文本，为什么定义这么长呢？我也不知道呢。毕竟，谁不喜欢长的呢。'
        let titleFontSize = rpx2px(40)
        this.canvasWrapText(ctx, title, padding, 2 * interval + padding + avatarSize + productImgSize + titleFontSize, productImgSize, titleFontSize, 2)
        let y = 2 * interval + padding + avatarSize + productImgSize + (2 * titleFontSize * 1.3) /*字体高度*/ + rpx2px(10) /*间距*/
        ctx.fillStyle = '#909399'
        let titleDescFontSize = rpx2px(28)
        this.canvasWrapText(ctx, '分享朋友圈，让更多人购买，赚取丰厚佣金', padding, y + titleDescFontSize, productImgSize, titleDescFontSize, 1)
        // 绘制二维码
        let miniQrCode = canvas.createImage()
        const miniQrCodeSize = rpx2px(240)
        const miniQrCodePromise = new Promise(resolve => {
          const path = 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.71f2a8d9.png'
          miniQrCode.src = path
          miniQrCode.onload = () => {
            let startX = canvasWidth - padding - miniQrCodeSize
            let startY = canvasHeight - padding - miniQrCodeSize
            ctx.drawImage(miniQrCode, 0, 0, miniQrCode.width, miniQrCode.height, startX, startY, miniQrCodeSize, miniQrCodeSize)
            resolve()
          }
          miniQrCode.onerror = (err) => {
            resolve()
          }
        })
        // 绘制提示文本
        let shareTipsImg = canvas.createImage()
        shareTipsImg.src = 'http://mmbiz.qpic.cn/mmbiz_png/ibddfibicoqWyN3rs2FaibCanHKOPyIre7rBPZr5ibGNjjzJxmNdPM6R1siaia3VRaEHOQoF3zl9mSd84ZgAOWpXzSY1Q/0?wx_fmt=png'
        const shareTipsImgPromise = new Promise(resolve => {
          shareTipsImg.onload = () => {
            let imgWidth = rpx2px(360)
            let imgHeight = imgWidth / shareTipsImg.width * shareTipsImg.height
            let startY = canvasHeight - padding - interval - imgHeight
            ctx.drawImage(shareTipsImg, 0, 0, shareTipsImg.width, shareTipsImg.height, padding, startY, imgWidth, imgHeight)
            // 绘制价格
            let price = 99
            ctx.fillStyle = '#fb6705'
            let priceFontSize = rpx2px(40)
            this.canvasWrapText(ctx, '¥' + price, padding, startY - priceFontSize, productImgSize - miniQrCodeSize, priceFontSize, 1)
            resolve()
          }
          shareTipsImg.onerror = (err) => {
            resolve()
          }
        })
        let saveImageSuccess = (tempFilePath) => {
          this.setData({
            shareFriendsPicture: tempFilePath,
            showShareFriendsPicturePopup: true,
          })
        }
        Promise.all([avatarImagePromise, productImagePromise, miniQrCodePromise, shareTipsImgPromise])
          .then((res) => {
            // 生成图片
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