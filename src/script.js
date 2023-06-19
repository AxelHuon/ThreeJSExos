import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xff0000 );



/*Texture*/

const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('./fond-bois-naturel.jpg');
const metalTexture = textureLoader.load('./Metallic_surface_texture.jpg');


console.log(woodTexture)


// Plan
const geometryPlan = new THREE.PlaneGeometry(5, 5); // Définissez les dimensions du sol selon vos besoins
const materialPlan = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
const plan = new THREE.Mesh( geometryPlan, materialPlan );
plan.rotateX(-20)
plan.position.set(0,-1,0)
scene.add( plan );



// Sphere 1
const geometrySphere = new THREE.SphereGeometry(0.4, 32, 32); // Rayon de 1 unité avec une résolution de 32 segments
const materialSphere = new THREE.MeshStandardMaterial( {map: woodTexture} );
const sphere = new THREE.Mesh( geometrySphere, materialSphere );
sphere.position.set(0, 1, 0); // Placez la sphère à la position souhaitée
scene.add( sphere );


// Sphere 2
const geometrySphere2 = new THREE.SphereGeometry(0.4, 32, 32); // Rayon de 1 unité avec une résolution de 32 segments
const materialSphere2 = new THREE.MeshLambertMaterial( {color: 0xff00ff} );
const sphere2 = new THREE.Mesh( geometrySphere2, materialSphere2 );
sphere2.position.set(2, 0.4, 0); // Placez la sphère à la position souhaitée
scene.add( sphere2 );







// Sphere 3

let angleX =-1
let angleY = 0.5
const geometrySphere3 = new THREE.SphereGeometry(0.4, 32, 32); // Rayon de 1 unité avec une résolution de 32 segments
const materialSphere3 = new THREE.MeshStandardMaterial( {map: metalTexture} );
const sphere3 = new THREE.Mesh( geometrySphere3, materialSphere3 );
sphere3.position.set(0, 0, 0); // Placez la sphère à la position souhaitée
scene.add( sphere3 );


let spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(4, 6, 5); // Définit la position de la lumière spot à (10, 5, 0)
spotLight.castShadow = true; // Active l'ombrage pour la spotlight
scene.add(spotLight);






// Sizes
const sizes = {
    width: 1500,
    height: 800
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 0, 4)
scene.add( camera );


// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize( sizes.width, sizes.height );

// Controls
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = true

// Animate

const animate = () => {
    controls.update();
    
    // Mise à jour des angles de rotation
    angleX += 0.02;
    angleY += 0.02;
    
    // Mise à jour de la position de la sphère 3
    sphere3.position.x = Math.cos(angleX);
    sphere3.position.y = Math.cos(angleY) +1
    
    renderer.render(scene, camera);
    
    window.requestAnimationFrame(animate);
};

animate()
