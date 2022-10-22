import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16 ,100);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
const torus = new THREE.Mesh( geometry, material);
scene.add(torus)

const newPointLight = new THREE.PointLight(0xfffff0)
newPointLight.position.set(10,10,10)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(newPointLight, ambientLight)

const pointLightHelper = new THREE.PointLightHelper(newPointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper)

// Controls for the mouse
const controls = new OrbitControls(camera, renderer.domElement);

//Random Star Generator
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100) );

  star.position.set(x, y, z)
  scene.add(star)
}


Array(200).fill().forEach(addStar)

// todo: Add page loader to scene
//Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar

const haydenTexture= new THREE.TextureLoader().load('hayden.png')

const hayden = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: haydenTexture } )
)

scene.add(hayden)

// Mars

const marsTexture = new THREE.TextureLoader().load('mars_Flat.jpg');
const normalTexture = new THREE.TextureLoader().load('v-texture.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3 ,32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsTexture,
    normalMap: normalTexture,
  }
  )
);

scene.add(mars)

mars.position.z = 10;
mars.position.setX(-10);

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  mars.rotation.z += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;
  
  hayden.rotation.x += 0.01;
  hayden.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.00002;
  camera.position.y = t * -0.002;


}

document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame (animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update
  
  renderer.render( scene, camera );
}

animate()