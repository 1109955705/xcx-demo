// pages/test2/index.js
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
    const query = wx.createSelectorQuery()
    query.select('#myCanvas').node().exec((res) => {
      const canvas = res[0].node
      const gl = canvas.getContext('webgl')
      this.setData({
        canvasWidth: width,
        canvasHeight: height,
      })
      gl.clearColor(0.9,0.9,0.8,1);
      gl.clear(gl.COLOR_BUFFER_BIT);
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
      success(res) {
        console.log(res.tempFilePath)
      }
    })
  }

})