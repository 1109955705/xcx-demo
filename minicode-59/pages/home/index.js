// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainHide: false,
    extreHide: false,
    mainLeave: false,
    mainEnter: false,
    back: false,
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
          selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
      this.changeTabBarData({show: false})
      if (!this.data.mainHide) {
        this.setData({
          mainLeave: true,
          mainEnter: false,
        })
      }
    }, 300);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  back() {
    this.setData({
      extreHide: true,
      mainHide: false,
      back: true,
    })
    setTimeout(()=> {
      this.setData({
        mainEnter: true,
      })
    })
    this.changeTabBarData({show: true})
  },
  transitionend() {
    const { back } = this.data
    if (back) {
      this.setData({
        mainHide: false,
        extreHide: false,
        back: false
      })
    } else {
      this.setData({
        mainHide: true,
      })
    }
  },
  changeTabBarData(data) {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData(data)
    }
  }
})