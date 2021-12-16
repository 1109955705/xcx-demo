const app = getApp();
import * as THREE from '../../libs/three.min.js'
import { OrbitControls } from '../../libs/jsm/controls/OrbitControls'
import EventBus from '../../libs/adpter/EventBus'
import touchEventHandlerFactory from '../../libs/adpter/touchEventHandlerFactory'

Page({
  data: {
    canvasWidth: 0,
    canvasHeight: 0,
  },
  onLoad() {

  },
  onReady() {
    //初始化Canvas对象
    this.initWebGLCanvas();
    // 设置场景
  },
  /**
   * 初始化Canvas对象
   */
  initWebGLCanvas() {
    //获取页面上的标签id为webgl的对象，从而获取到canvas对象
    const query = wx.createSelectorQuery();
    query.select('#webgl').node()
      .exec((res) => {
        const canvas = res[0].node;
        this._webGLCanvas = canvas;
        //获取系统信息，包括屏幕分辨率，显示区域大小，像素比等
        var info = wx.getSystemInfoSync();
        this._sysInfo = info;
        //设置canvas的大小，这里需要用到窗口大小与像素比乘积来定义
        this._webGLCanvas.width =
          this._sysInfo.windowWidth * this._sysInfo.pixelRatio;
        this._webGLCanvas.height =
          this._sysInfo.windowHeight * this._sysInfo.pixelRatio;
        //设置canvas的样式
        this._webGLCanvas.style = {};
        this._webGLCanvas.style.width = this._webGLCanvas.width;
        this._webGLCanvas.style.height = this._webGLCanvas.height;

        this._webGLCanvas.clientHeight = this._webGLCanvas.height
        this._webGLCanvas.clientWidth = this._webGLCanvas.width;
        //设置显示层canvas绑定的样式style数据，页面层则直接用窗口大小来定义
        this.setData({
          canvasWidth: this._sysInfo.windowWidth,
          canvasHeight: this._sysInfo.windowHeight,
        });

        this.initWebGLScene()
      });
  },

  /**
   * 初始化WebGL场景
   */
  initWebGLScene() {

    const renderer = new THREE.WebGLRenderer({
      canvas: this._webGLCanvas,
    });
    this._renderer = renderer
    // renderer.setClearColor(0xffffff)
    //创建摄像头
    const camera = new THREE.PerspectiveCamera(
      45,
      this._webGLCanvas.width / this._webGLCanvas.height,
      10,
      2000
    );
    this._camera = camera
    camera.up.set(0, 1, 0); // 设置相机对象的上方向是哪个轴
    camera.position.set(100,100,100);
    camera.lookAt(0,0,0);
    const controls = new OrbitControls(camera, renderer.domElement);
    //是否可以缩放 
    controls.enableZoom = true; 
    controls.addEventListener('change', this.renderWebGL);
    const scene = new THREE.Scene();
    this._scene = scene
    //辅助线 红色x轴 蓝色z轴 绿色y轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add( axesHelper );

    const cubeGeo = new THREE.BoxGeometry(20, 20, 20);
    const texture = new THREE.TextureLoader(undefined,this._webGLCanvas).load( '../../libs/textures/crate.gif' );
    // var mat = new THREE.MeshBasicMaterial({ color: 0xfca745 });

    const mat = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(cubeGeo, mat);
    cube.position.set(0, 0, 0);
    scene.add( cube );
    setTimeout(() => {
      this._renderer.render(this._scene,this._camera);
    }, 200)
  },

  /**
   * 渲染函数
   */
  renderWebGL() {
    this._webGLCanvas.requestAnimationFrame(()=>{
      this._renderer.render(this._scene,this._camera);
    });
  },
  onTouchStart(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchMove(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchEnd(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
  onTouchTap(e) {
    const event = touchEventHandlerFactory(e)
    EventBus.dispatchEvent(event)
  },
});
