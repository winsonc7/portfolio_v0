import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import GUI from 'lil-gui'
import { Color } from 'three'

/**
 * Base
 */
// // Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new Color(0x40e0d0)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const fontLoader = new FontLoader()

var items = [];
var texts = [];

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const textMaterial = new THREE.MeshNormalMaterial()
        const donutMaterial = new THREE.MeshNormalMaterial({wireframe: true})

        // Text
        const nameTextGeometry = new TextGeometry(
            'Winson Cheng',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const jobTextGeometry = new TextGeometry(
            'Software Engineer',
            {
                font: font,
                size: 0.3,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        const majorTextGeometry = new TextGeometry(
            'AI + Theory',
            {
                font: font,
                size: 0.3,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        nameTextGeometry.center()
        jobTextGeometry.center()
        majorTextGeometry.center()

        const nameText = new THREE.Mesh(nameTextGeometry, textMaterial)
        scene.add(nameText)
        texts.push(nameText)

        const jobText = new THREE.Mesh(jobTextGeometry, textMaterial)
        scene.add(jobText)
        camera.lookAt(jobText.position)
        texts.push(jobText)

        const majorText = new THREE.Mesh(majorTextGeometry, textMaterial)
        scene.add(majorText)
        texts.push(majorText)

        nameTextGeometry.computeBoundingBox()
        nameTextGeometry.translate(0, 0.6, 0)

        jobTextGeometry.computeBoundingBox()
        jobTextGeometry.translate(-0.4, 0, 0)

        majorTextGeometry.computeBoundingBox()
        majorTextGeometry.translate(-1.1, -0.5, 0)

        // Donuts
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)

        const range = 20
        for(let i = 0; i < 150; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            donut.position.x = (Math.random() - 0.5) * range
            donut.position.y = (Math.random() - 0.5) * range
            donut.position.z = (Math.random() - 0.5) * range
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            items.push(donut)

            scene.add(donut)
        }

        // Boxes
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 4, 4, 4)

        for(let i = 0; i < 150; i++)
        {
            const box = new THREE.Mesh(boxGeometry, donutMaterial)
            box.position.x = (Math.random() - 0.5) * range
            box.position.y = (Math.random() - 0.5) * range
            box.position.z = (Math.random() - 0.5) * range
            box.rotation.x = Math.random() * Math.PI
            box.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            box.scale.set(scale, scale, scale)
            items.push(box)

            scene.add(box)
        }

        // Pyramids
        const pyramidGeometry = new THREE.TetrahedronGeometry(0.5, 2)

        for(let i = 0; i < 150; i++)
        {
            const pyramid = new THREE.Mesh(pyramidGeometry, donutMaterial)
            pyramid.position.x = (Math.random() - 0.5) * range
            pyramid.position.y = (Math.random() - 0.5) * range
            pyramid.position.z = (Math.random() - 0.5) * range
            pyramid.rotation.x = Math.random() * Math.PI
            pyramid.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            pyramid.scale.set(scale, scale, scale)
            items.push(pyramid)

            scene.add(pyramid)
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for (let i = 0; i < items.length; i++) {
        items[i].rotation.x += 0.01;
        items[i].rotation.y += 0.01;
        items[i].position.x += Math.sin(elapsedTime) / 200
        items[i].position.z += Math.cos(elapsedTime) / 200
    }
    
    for (let i = 0; i < texts.length; i++) {
        texts[i].rotation.y += 0.001;
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()