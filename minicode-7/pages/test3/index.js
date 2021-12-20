// pages/test3/index.js
const { pixelRatio } = wx.getSystemInfoSync();
const width = 300
const height = 150
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
    this.setData({
      canvasWidth: width,
      canvasHeight: height,
    })
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        this._canvas = canvas
        const ctx = canvas.getContext('2d')
        const { pixelRatio } = wx.getSystemInfoSync()
        canvas.width = res[0].width * pixelRatio
        canvas.height = res[0].height * pixelRatio
        ctx.scale(pixelRatio, pixelRatio)
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'orange';
        ctx.arc(300, 75, 75, 0, 2 * Math.PI);
        ctx.fill();
      })
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
      canvas: this._canvas,
      success(res) {
        console.log('canvasToTempFilePath', res.tempFilePath)
      }
    })
  }

})