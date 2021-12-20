// pages/test1/index.js
const { pixelRatio } = wx.getSystemInfoSync();
const width = 300
const height = 100
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHeight: 0,
    canvasWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const ctx = wx.createCanvasContext('myCanvas')


    console.log('xxxx', pixelRatio)
    
    // style上的宽高表示视图窗口和画布的大小
    // ctx.width = 600 // 无效，必须设置canvas 上style属性的宽高
    // ctx.height = 150 // 无效, 必须设置canvas 上style属性的宽高

    this.setData({
      canvasWidth: width * pixelRatio,
      canvasHeight: height * pixelRatio,
    })
    // ctx.scale(pixelRatio, pixelRatio) 

    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, width, height)

    ctx.setFillStyle('yellow')
    ctx.fillRect(width, 0, width, height)

    ctx.setFillStyle('blue')
    ctx.fillRect(10, 10, 150, 75)

    ctx.draw()

  },
  export() {

    // 输出为展示，
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: width * pixelRatio,
      height: height * pixelRatio,
      destWidth:  width * pixelRatio, // 输出图片宽度
      destHeight: height * pixelRatio, // 输出图片高度
      canvasId: 'myCanvas',
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  }

})