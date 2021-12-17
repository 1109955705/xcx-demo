import * as THREE from '../../libs/three.min.js'
import { OBJLoader } from '../../libs/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../../libs/jsm/controls/OrbitControls'
const app = getApp();
// https://gitee.com/zhisonggang/threejs/raw/master/examples/models/obj/cerberus/Cerberus.obj
const RESOURCE_URL = 'https://gitee.com/zhisonggang/threejs/raw/master/examples/models/obj/cerberus/'
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
    //创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: this._webGLCanvas,
    });

    // 摄像头
    const camera = new THREE.PerspectiveCamera(
      60,
      this._webGLCanvas.width / this._webGLCanvas.height,
      1,
      1000
    );
    this._camera = camera;
    camera.up.set(0, 1, 0); // 设置相机对象的上方向是哪个轴
    camera.position.set(0,0,100);
    camera.lookAt(0,0,0);

    // 场景
    var scene = new THREE.Scene();
    this._scene = scene;
    const hemiLight = new THREE.HemisphereLight(  0x443333, 0x222233, 50 );
    scene.add( hemiLight );
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 30 );
    scene.add( hemiLightHelper );
    const material = new THREE.MeshStandardMaterial();

    // 模型
    new OBJLoader()
          .setPath(RESOURCE_URL)
					.load( 'Cerberus.obj',  ( group ) => {
            const textureLoader = new THREE.TextureLoader(undefined,this._webGLCanvas)
              .setPath(RESOURCE_URL);

            material.roughness = 1;
            material.metalness = 1;
            
            const diffuseMap = textureLoader.load('Cerberus_A.jpg',  this.renderWebGL);
            console.log('diffuseMap', diffuseMap)
            diffuseMap.encoding = THREE.sRGBEncoding;
            material.map = diffuseMap;
            
            material.metalnessMap = material.roughnessMap = textureLoader.load('Cerberus_RM.jpg',  this.renderWebGL);
            material.normalMap = textureLoader.load('Cerberus_N.jpg',  this.renderWebGL);
            
            material.map.wrapS = THREE.RepeatWrapping;
						material.roughnessMap.wrapS = THREE.RepeatWrapping;
						material.metalnessMap.wrapS = THREE.RepeatWrapping;
            material.normalMap.wrapS = THREE.RepeatWrapping;

            group.traverse( function ( child ) {
              console.log('child', child.isMesh)
							if ( child.isMesh ) {
								child.material = material;
							}
						} );
						group.rotation.y = Math.PI / 2;
            group.position.x += 10;
            group.position.y += 0;
            group.scale.set(30,30,30)
            // group.children[0].material.color.set(0xFFB6C1);//设置材质颜色
            scene.add(group);

            this.renderWebGL();
          })
    //设置渲染器大小
    this._renderer = renderer;
    this._renderer.setSize(this._webGLCanvas.width, this._webGLCanvas.height);
    renderer.setClearColor(0x7fffd4, 1)
    //开始渲染
    this.renderWebGL();
  },

  /**
   * 渲染函数
   */
  renderWebGL() {
    this._webGLCanvas.requestAnimationFrame(()=>{
      this._renderer.render(this._scene,this._camera);
    });
  },
});
