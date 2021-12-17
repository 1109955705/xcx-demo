import * as THREE from '../../libs/three.min.js'

const { windowWidth, windowHeight, pixelRatio, } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera;
let cube;
export default (_canvas) => {
  canvas = _canvas;
  canvas.width = windowWidth * pixelRatio;
  canvas.height = windowHeight * pixelRatio;

  initScene(); // 初始化场景
  initCamera(); // 初始化相机
  initRenender(); // 初始化渲染器
  initLight(); // 初始化光线
  // initOthers(); // 初始化其他参数
  // initaxisHelper(); // 辅助坐标
  initGeometrys() // 初始化物体
  function initScene() {
    scene = new THREE.Scene();
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(
      60,
      canvas.width / canvas.height,
      1,
      1000
    );
  }

  function initRenender() {
    renderer = new THREE.WebGLRenderer({
      canvas,
    });
    // renderer.setSize(this._webGLCanvas.width, this._webGLCanvas.height);
    renderer.setClearColor(0x7fffd4, 1)
  }

  function initLight() {
    const ambiLight = new THREE.AmbientLight(0x333333);
    scene.add(ambiLight);

    const direLight = new THREE.DirectionalLight(0xffffff, 1.0);
    direLight.position.set(100, 300, 100);
    scene.add(direLight);
  }

  function initGeometrys() {
    const cubeGeo = new THREE.BoxGeometry(30, 30, 30);
    //创建材质，设置材质为基本材质（不会反射光线，设置材质颜色为绿色）
    const mat = new THREE.MeshBasicMaterial({ color: 0xfca745 });
    //创建Cube的Mesh对象
    cube = new THREE.Mesh(cubeGeo, mat);
    //设置Cube对象的位置
    cube.position.set(0, 0, -100);
    //将Cube加入到场景中
    scene.add(cube);
  }

  function animation() {
    cube.rotation.y += 0.03;
  }

  function render() {
    animation()
    renderer.render(scene, camera)
    canvas.requestAnimationFrame(()=>{
      render()
    });
  }

  render()
}