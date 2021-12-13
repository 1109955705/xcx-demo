import test from '../../libs/util'

const app = getApp();
const pageNamesArr = [
  'test1',
  'test2',
]
Page({
  data: {
    pageNamesArr,
  },

  onReady() {
    const url = 'https://raw.githubusercontent.com/1109955705/xcx-demo/master/minicode-4/libs/models/obj/cerberus/Cerberus.obj'
 
    // wx.request({
    //   url,
    //   responseType: 'text',
    //   success (res) {
    //     console.log(res.data)
    //   },
    //   fail (err) {
    //     console.log('error', err)
    //   },
    // })

  },
  jump() {

  }
});
