import * as THREE from '../../libs/three.min.js'
import { OBJLoader } from '../../libs/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../../libs/jsm/controls/OrbitControls'

const RESOURCE_URL = 'http://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/'

const { windowWidth, windowHeight, pixelRatio, } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;
let cube;

export default (_canvas) => {
  canvas = _canvas;
  // 设置画布大小
  canvas.width = windowWidth * pixelRatio;
  canvas.height = windowHeight * pixelRatio;

  // 适配点击事件
  canvas.clientHeight = canvas.height
  canvas.clientWidth = canvas.width;

  // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小，但微信小程序不支持. threejs和其它文件中有使用这个属性
  canvas.style = {} 
  canvas.style.width = windowWidth * pixelRatio;
  canvas.style.height = windowHeight * pixelRatio; 

  initRenender(); // 初始化渲染器
  initCamera(); // 初始化相机
  initScene(); // 初始化场景
  initControl(); // 初始化控制器
  initLight(); // 初始化光线
  initaxesHelper(); // 辅助坐标
  initGeometrys() // 初始化物体
  initOthers(); // 初始化其他参数

  /**
   * 初始化渲染器
   */
  function initRenender() {
    renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setClearColor(0x7fffd4, 1)
    renderer.outputEncoding = THREE.sRGBEncoding; // 
    renderer.toneMapping = THREE.ReinhardToneMapping; // 色彩映射
    renderer.toneMappingExposure = 3; // 色调映射的曝光级别
  }

  /**
   * 初始化相机
   */
  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      60,
      canvas.width / canvas.height,
      1,
      1000
    );
    camera.up.set(0, 1, 0); // 设置相机对象的上方向是哪个轴
    camera.position.set(0,0,100);
    camera.lookAt(0,0,0);
  }

  /**
   * 初始化场景
   */
  function initScene() {
    scene = new THREE.Scene();
  }
  
  /**
   * 渲染控制器
   */
  function initControl() {
    controls = new OrbitControls(camera, renderer.domElement);
    //是否可以缩放 
    controls.enableZoom = true; 
    controls.addEventListener('change', render);
  }

  /**
   * 初始化辅助坐标
   */
  function initaxesHelper() {
    //辅助线 红色x轴 蓝色z轴 绿色y轴
    const axesHelper = new THREE.AxesHelper(100);
    scene.add( axesHelper );
  }

  /**
   * 初始化物体
   */
  function initGeometrys() {
    const material = new THREE.MeshStandardMaterial();
    new OBJLoader()
          .setPath(RESOURCE_URL)
					.load( 'Cerberus.obj',  ( group ) => {
            const textureLoader = new THREE.TextureLoader(undefined, canvas)
              .setPath(RESOURCE_URL);

            material.roughness = 1;
            material.metalness = 1;
            
            const diffuseMap = textureLoader.load('Cerberus_A.jpg', render);
            diffuseMap.encoding = THREE.sRGBEncoding;
            material.map = diffuseMap;
            
            material.metalnessMap = material.roughnessMap = textureLoader.load('Cerberus_RM.jpg', render);
            material.normalMap = textureLoader.load('Cerberus_N.jpg', render);
            
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
            cube = group
            scene.add(group);

            render();
          })
  }

  /**
   * 初始化灯光
   */
  function initLight() {
    const hemiLight = new THREE.HemisphereLight(  0x443333, 0x222233, 4 );
    hemiLight.position.set(100, 100, 100)
    scene.add( hemiLight );
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 30 );
    scene.add( hemiLightHelper );
    // const light = new THREE.PointLight( 0xff0000, 1, 100 );
    // light.position.set( 50, 50, 50 );
    // scene.add( light );
   
    // const light = new THREE.AmbientLight( 0x404040 );
    // scene.add( light );
  }

  /**
   * 设置其它参数
   */
  function initOthers() {}

  /**
   * 设置动画
   */
  function animation() {}

  /**
   * 渲染函数
   */
  function render() {
    renderer.render(scene, camera)
  }

  render()
}