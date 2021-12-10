import * as THREE from '../../libs/three'
const app = getApp();
const pageNamesArr = [
  'test1',
  'test2',
]
Page({
  data: {
    pageNamesArr,
  },
  onLoad() {},
  onReady() {
    console.log('xxxxx')
    const url = ''
    wx.request({
      url: 'www.baidu.com',
      method: "GET",
      success: (response) => {
        console.log('success', response)
      },
      fail: (err) => {        
        console.log('fail', err)      
      },
      complete: () => {        
        console.log('complete')      
      }
     }
    )
  },
  jump() {

  }
});
