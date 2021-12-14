import * as THREE from '../../libs/three.js'
const app = getApp();
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
        this._webGLCanvas.style.width = this._webGLCanvas.width.width;
        this._webGLCanvas.style.height = this._webGLCanvas.width.height;
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
    // renderer.setClearColor(0xffffff)

    //创建摄像头
    const camera = new THREE.PerspectiveCamera(
      45,
      this._webGLCanvas.width / this._webGLCanvas.height,
      10,
      2000
    );
    camera.up.set(0, 1, 0); // 设置相机对象的上方向是哪个轴
    camera.position.set(0,0,0);
    camera.lookAt(0,1,0);

    const scene = new THREE.Scene();

    //辅助线 红色x轴 蓝色z轴 绿色y轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add( axesHelper );

    var cubeGeo = new THREE.BoxGeometry(1, 2, 1);
    var mat = new THREE.MeshBasicMaterial({ color: 0xfca745 });
    var cube1 = new THREE.Mesh(cubeGeo, mat);
    cube1.position.set(0, 0, 0);
    scene.add( cube1 );
    renderer.render(scene, camera);
  },

  /**
   * 渲染函数
   */
  renderWebGL(cube) {
    //获取当前一帧的时间
    var now = Date.now() ;
    //计算时间间隔,由于Date对象返回的时间是毫秒，所以除以1000得到单位为秒的时间间隔
    var duration = (now - this._lastTime) / 1000;
    //打印帧率
    // console.log(1/duration + 'FPS');
    //重新赋值上一帧时间
    this._lastTime = now;
    //旋转Cube对象，这里希望每秒钟Cube对象沿着Y轴旋转180度（Three.js中用弧度表示，所以是Math.PI）
    cube.rotation.y += duration * Math.PI;

    //渲染执行场景，指定摄像头看到的画面
    this._renderer.render(this._scene,this._camera);
    //设置帧回调函数，并且每一帧调用自定义的渲染函数
    this._webGLCanvas.requestAnimationFrame(()=>{
      this.renderWebGL(cube);
    });
  },
});
