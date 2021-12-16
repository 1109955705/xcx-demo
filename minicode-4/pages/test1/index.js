import * as THREE from '../../libs/three.js'
import useThree from './useThree'
const app = getApp();
Page({
  data: {
    canvasWidth: 0,
    canvasHeight: 0,
  },
  onLoad() {},
  onReady() {
    //初始化Canvas对象
    this.initWebGLCanvas();
    // 设置场景
  },
  /**
   * 初始化Canvas对象
   */
  initWebGLCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#canvas')      
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('webgl')
        console.log('xxxxx', ctx)
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();
        this.setData({
          canvasWidth: windowWidth,
          canvasHeight: windowHeight,
        });
        useThree(canvas)
      });
  },
})