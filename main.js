//-------------------------------------------------
// Title: main.js
// Author: Halil Mert Guler
// ID: 16729097450
// Project: 9
// Description: main javascript file of the app
//-------------------------------------------------

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Tmport shaders
import vertShader from './shaders/vertexShader.glsl.js';
import fragShader from './shaders/fragmentShader.glsl.js';

// Tmport images
import floorTexture from './assets/img/floor.jpg';
import moonTexture from './assets/img/moon.jpg';
import tesseractTexture from './assets/img/tesseract.jpg';
import brickTexture from './assets/img/brick.jpg';
import brickStandTexture from './assets/img/brickFloor.jpg';
import bay_bk from './assets/img/skybox/bay_bk.jpg';
import bay_dn from './assets/img/skybox/bay_dn.jpg';
import bay_ft from './assets/img/skybox/bay_ft.jpg';
import bay_lt from './assets/img/skybox/bay_lf.jpg';
import bay_rt from './assets/img/skybox/bay_rt.jpg';
import bay_up from './assets/img/skybox/bay_up.jpg';

// Import 3D object models
const cheeseburgerObj = new URL('assets/obj/cheeseburger.glb', import.meta.url);
const pickleObj = new URL('assets/obj/pickle.glb', import.meta.url);
const pugObj = new URL('assets/obj/pug.glb', import.meta.url);
const spaceshipObj = new URL('assets/obj/spaceship.glb', import.meta.url);
const treeObj = new URL('assets/obj/tree.glb', import.meta.url);


// Set up the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 50);
orbit.update();


// Set up lights in the scene
const point_light1 = new THREE.PointLight(0xFFED89, 2000.0);
point_light1.position.set(50, 50, 0);
scene.add(point_light1);

const point_light2 = new THREE.PointLight(0x8EE7FF, 2000.0);
point_light2.position.set(-50, 50, 0);
scene.add(point_light2);

const spot_light = new THREE.SpotLight(0xffffff);
spot_light.position.set(30, 80, 30);
spot_light.angle = 10;
spot_light.penumbra = 1;
spot_light.intensity = 15000;
scene.add(spot_light);

const rectLight = new THREE.PointLight(0x00ffff, 100);
rectLight.position.set(18, 7, 25.5);
scene.add(rectLight);


// Configure the skybox
const cube_texture_loader = new THREE.CubeTextureLoader();
scene.background = cube_texture_loader.load([bay_rt, bay_lt, bay_up, bay_dn, bay_bk, bay_ft]);


// Create floor objects
const texture_loader = new THREE.TextureLoader();
const floor_geometry = new THREE.PlaneGeometry(25, 30);
const floor_material = new THREE.MeshStandardMaterial({ map: texture_loader.load(floorTexture) });

const floor1 = new THREE.Mesh(floor_geometry, floor_material);
floor1.position.set(12.5, 0, -15);
floor1.rotation.x = -0.5 * Math.PI;
floor1.rotation.z = Math.PI;
scene.add(floor1);

const floor2 = new THREE.Mesh(floor_geometry, floor_material);
floor2.position.set(-12.5, 0, -15);
floor2.rotation.x = -0.5 * Math.PI;
scene.add(floor2);

const floor3 = new THREE.Mesh(floor_geometry, floor_material);
floor3.position.set(-12.5, 0, 15);
floor3.rotation.x = -0.5 * Math.PI;
scene.add(floor3);

const floor4 = new THREE.Mesh(floor_geometry, floor_material);
floor4.position.set(12.5, 0, 15);
floor4.rotation.x = -0.5 * Math.PI;
floor4.rotation.z = Math.PI;
scene.add(floor4);


// Create floor objects
const baseGeometry = new THREE.BoxGeometry(52, 1, 62);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.set(0, -0.6, 0);
scene.add(base);
const emissiveMaterialBase = new THREE.MeshStandardMaterial({ emissive: 0xcccccc, emissiveIntensity: 0.5 });
base.material = emissiveMaterialBase;

for (let i = 1; i <= 8; i++) {
    let standGeometry = new THREE.BoxGeometry(4, 4, 4);
    let standMaterial = new THREE.MeshStandardMaterial({ map: texture_loader.load(brickStandTexture) });
    let topStandGeometry = new THREE.BoxGeometry(4.5, 0.8, 4.5);
    let topStandMaterial = new THREE.MeshStandardMaterial({ map: texture_loader.load(brickTexture) });

    let stand = new THREE.Mesh(standGeometry, standMaterial);
    let topStand = new THREE.Mesh(topStandGeometry, topStandMaterial);

    switch (i) {
        case 1:
            stand.position.set(-18, 2, 8.5);
            topStand.position.set(-18, 4, 8.5);
            break;
        case 2:
            stand.position.set(18, 2, 8.5);
            topStand.position.set(18, 4, 8.5);
            break;
        case 3:
            stand.position.set(-18, 2, -8.5);
            topStand.position.set(-18, 4, -8.5);
            break;
        case 4:
            stand.position.set(18, 2, -8.5);
            topStand.position.set(18, 4, -8.5);
            break;
        case 5:
            stand.position.set(-18, 2, 25.5);
            topStand.position.set(-18, 4, 25.5);
            break;
        case 6:
            stand.position.set(18, 2, 25.5);
            topStand.position.set(18, 4, 25.5);
            break;
        case 7:
            stand.position.set(18, 2, -25.5);
            topStand.position.set(18, 4, -25.5);
            break;
        case 8:
            stand.position.set(-18, 2, -25.5);
            topStand.position.set(-18, 4, -25.5);
            break;
    }

    scene.add(stand);
    scene.add(topStand);
}


// Create additional 3D objects
// tesseract
const tesseractGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const tesseractmaterial = new THREE.MeshStandardMaterial({ map: texture_loader.load(tesseractTexture) });
const tesseract = new THREE.Mesh(tesseractGeometry, tesseractmaterial);
tesseract.position.set(18, 7, 25.5);
tesseract.scale.set(1.5, 1.5, 1.5);
scene.add(tesseract);
const emissiveMaterial = new THREE.MeshStandardMaterial({ emissive: 0x00ffff, emissiveIntensity: 1 });
tesseract.material = emissiveMaterial;

// moon
const moonGeometry = new THREE.SphereGeometry(1, 50, 50);
const moonMaterial = new THREE.MeshStandardMaterial({ map: texture_loader.load(moonTexture) });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-18, 7, 8.5);
moon.scale.set(2, 2, 2);
scene.add(moon);


// Set up shadered object with uniforms
const uniforms = {
    time: { value: 0.0 },
    speed: { value: 50.0 },
    charSize: { value: { x: 2.0, y: 1.5 } },
    charResolution: { value: 5.5 },
    color: { value: new THREE.Color('white') },
    resolution: { value: { x: 1.0, y: 1.0 } },
}
const torusKnotShaderMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader
})
const torusKnotGeometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotShaderMat);
torusKnot.position.set(18, 8, -8.5);
torusKnot.rotation.set(0, -45, 0);
scene.add(torusKnot);


// Load 3D models with GLTFLoader
const obj_loader = new GLTFLoader();

obj_loader.load(cheeseburgerObj.href, function (e) {
    const object = e.scene;
    object.position.set(-18, 4.5, -25.5);
    object.scale.set(30, 30, 30);
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
})

obj_loader.load(pickleObj.href, function (e) {
    const object = e.scene;
    object.position.set(18, 4, -25);
    object.rotation.set(0, -90, 0);
    object.scale.set(1.5, 1.5, 1.5);
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
})

obj_loader.load(pugObj.href, function (e) {
    const object = e.scene;
    object.position.set(-18, 4.5, 25.5);
    object.rotation.set(0, -30, 0);
    object.scale.set(1.3, 1.3, 1.3);
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
})

obj_loader.load(spaceshipObj.href, function (e) {
    const object = e.scene;
    object.position.set(18, 4.5, 8.5);
    object.rotation.set(0, -30, 0);
    object.scale.set(1, 1, 1);
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
})

obj_loader.load(treeObj.href, function (e) {
    const object = e.scene;
    object.position.set(-17.5, 4.5, -8.5);
    object.rotation.set(0, 0, 0);
    object.scale.set(1, 1, 1);
    scene.add(object);
}, undefined, function (error) {
    console.error(error);
})


// Define animations
const clock = new THREE.Clock();
function animation() {
    tesseract.rotation.x += 0.01;
    tesseract.rotation.y += 0.01;

    moon.rotation.y += 0.005;

    uniforms.time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);
