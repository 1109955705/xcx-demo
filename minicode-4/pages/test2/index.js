import * as THREE from '../../libs/three.min.js'
import { OBJLoader } from '../../libs/jsm/loaders/OBJLoader.js';
const app = getApp();
const RESOURCE_URL = 'https://raw.githubusercontent.com/1109955705/xcx-demo/master/minicode-4/libs/models/obj/cerberus/'
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
    // 场景
    var scene = new THREE.Scene();
    this._scene = scene;
		scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );
    const material = new THREE.MeshStandardMaterial();

    // 模型
    new OBJLoader()
          // .setPath( '../../libs/models/obj/cerberus/' )
          .setPath('https://raw.githubusercontent.com/1109955705/xcx-demo/master/minicode-4/libs/models/obj/cerberus/')
					.load( 'Cerberus.obj',  ( group ) => {
            console.log('CerberXusXXXXXXXXX', group)
            const textureLoader = new THREE.TextureLoader(undefined,this._webGLCanvas)

            material.roughness = 1;
            material.metalness = 1;
            
            const diffuseMap = textureLoader.load( 'https://raw.githubusercontent.com/1109955705/xcx-demo/master/minicode-4/libs/models/obj/cerberus/Cerberus_A.jpg', this.renderWebGL);
            console.log('diffuseMap', )
            diffuseMap.encoding = THREE.sRGBEncoding;
            material.map = diffuseMap;
            
            material.metalnessMap = material.roughnessMap = textureLoader.load( 'https://raw.githubusercontent.com/1109955705/xcx-demo/master/minicode-4/libs/models/obj/cerberus/Cerberus_RM.jpg', this.renderWebGL );
            material.normalMap = textureLoader.load( RESOURCE_URL + 'Cerberus_N.jpg', this.renderWebGL );
            
            material.map.wrapS = THREE.RepeatWrapping;
						material.roughnessMap.wrapS = THREE.RepeatWrapping;
						material.metalnessMap.wrapS = THREE.RepeatWrapping;
            material.normalMap.wrapS = THREE.RepeatWrapping;
            
            group.traverse( function ( child ) {
							if ( child.isMesh ) {
								child.material = material;
							}
						} );
						group.rotation.y = Math.PI / 2;
						group.position.x += 0.25;
            scene.add( group );
          })

    //设置渲染器大小
    this._renderer = renderer;
    this._renderer.setSize(this._webGLCanvas.width, this._webGLCanvas.height);

    //开始渲染
    this.renderWebGL();
  },

  /**
   * 渲染函数
   */
  renderWebGL() {
    this._renderer.render(this._scene,this._camera);
  },
});
