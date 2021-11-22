const app = getApp()
Page({
  data: {
    title:"发布页等等",
  },
  onLoad: function (e) {
    // 页面中动态添加的成员变量需要通过app.js的setProp方法添加，避免物拦截返回后页面没有之前动态添加的数据
    // 动态添加的成员变量指的是在页面函数中通过this.xxxx=ssss方式动态添加的成员变量，ssss可能为任何数据
    // 如 this.a = 5 这需要写成 app.setProp(this, 'a', 5)
    // this.b = function(){} 这需要写成 app.setProp(this, 'b', function(){})
  },
  onShow: function () {
    
  },
  save: function () {
    // 这里只是模拟保存信息，主要代码是wx.removeStorageSync('showBackModal')
    // 清除showBackModal，让其不会再弹出拦截弹框
    // 【保存成功】时，清除showBackModal就好
    wx.removeStorageSync('showBackModal')
    wx.showToast({
      title: '保存成功, 5s后返回上一页',
      icon:'none',
      duration: 4500
    })
    setTimeout(()=>{
      // 保存成功返回上一页，或者根据自己的需求
      wx.navigateBack()
    }, 5000)
  },
  input(e) {
    this.setData({
      inputval:e.detail.value
    })
  },
  textareainput(e) {
    this.setData({
      textareaval: e.detail.value
    })
  },
  onBeforeBack: function () {
    // 只要页面存在这个方法，并返回return wx.showModal就会监听拦截用户返回动作
    return wx.showModal({
      title: '提示',
      content: '信息尚未保存，确定要返回吗？',
      confirmStay: !1 //结合content意思，点击确定按钮后，是否留在原来页面，confirmStay默认false
    })
  }
});