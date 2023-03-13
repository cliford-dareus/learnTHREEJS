const canvas = document.getElementById('webgl');
import './style.css';
import * as THREE from 'three';
import ScrollMagic from 'scrollmagic';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap, Linear } from 'gsap';

const SIZE = {
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new THREE.Scene();

// geometry
const geometry = new THREE.SphereGeometry(4, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: '#00ff83'});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

// Light
const light =  new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10,10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, SIZE.width / SIZE.height);
camera.position.z = 20;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 4;

// renderer
const renderer = new THREE.WebGL1Renderer({canvas});
renderer.setSize(SIZE.width, SIZE.height);
renderer.setPixelRatio(2);
renderer.render( scene, camera );

// resize
window.addEventListener('resize',() => {
  SIZE.width = window.innerWidth;
  SIZE.height = window.innerHeight;

  camera.updateProjectionMatrix();
  camera.aspect = SIZE.width / SIZE.height;
  renderer.setSize(SIZE.width, SIZE.height);
});

// LOop
const animate = () => {
  window.requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
};

animate();

// GSAP Timeline
const tl = gsap.timeline({ defaults: { duration: 1}});
tl.fromTo(
  mesh.scale,
  {z: 0, y: 0, x: 0},
  {z: 1, y: 1, x: 1}
)
tl.fromTo(
  '.nav',
  {y: '-100%'},
  {y: '0%'}
)
tl.fromTo(
  '.section h1',
  {opacity: 0},
  {opacity: 1}
)

// Mousse Animations
let mouseDown = false;
let rgb = [];

window.addEventListener('mousedown', () => mouseDown=true);
window.addEventListener('mouseup', ()=> mouseDown= false);

window.addEventListener('mousemove',(e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/SIZE.width) * 255),
      Math.round((e.pageY/SIZE.height) * 255),
      Math.floor(Math.random() * 255)
    ]

    
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    console.log(newColor)
    gsap.to(
      mesh.material.color,
      {r: newColor.r, g: newColor.g, b: newColor.b}
    )
  }
})

// const tl2 = gsap.timeline()
const controller = new ScrollMagic.Controller();

// tl2.fromTo(
//   'section.section.two',
//   {xPercent: 100},
//   {xPercent:0, ease: Linear.easeNone},
//   '+=1'
// )

new ScrollMagic.Scene({
  duration: '100%',
  triggerElement: '.two',
  triggerHook: 0
})
.setPin('.one')
.addTo(controller)
.addIndicators({
  colorTrigger: 'white',
  colorEnd: 'white',
  colorStart: 'white'
})