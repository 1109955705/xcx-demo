const app = getApp()

Page({
  data: {
    title: "首页标题", // 不设置title，cbar默认显示app.globalData.appName
  },
  onLoad: function () {
    
  },
  goto: function () {
    wx.navigateTo({
      url: '../index2/index',
    })
  }
})
