import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function () {
    'use strict';

    const MODEL_PATH = 'assets/eve_model_v2.glb';
    const FPS = 24;
    const IDLE_FRAME = 112;
    const WAVE_START_FRAME = 112;
    const WAVE_END_FRAME = 140;
    const IDLE_TIME = IDLE_FRAME / FPS;
    const WAVE_START = WAVE_START_FRAME / FPS;
    const WAVE_END = WAVE_END_FRAME / FPS;

    let scene, camera, renderer, clock;
    let eveRoot = null;
    let mixer = null;
    let actions = [];
    let isWaving = false;
    let isVisible = true;
    let isRendering = false;
    let isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    let centerOffset = new THREE.Vector3();

    let isDragging = false;
    let prevX = 0, prevY = 0;
    let orbitTheta = 0, orbitPhi = Math.PI / 2;
    let targetTheta = 0, targetPhi = Math.PI / 2;
    let camDistance = 2;

    function init() {
        const container = document.getElementById('eve-3d-container');
        if (!container) return;

        clock = new THREE.Clock();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.001, 100);

        renderer = new THREE.WebGLRenderer({
            antialias: !isMobile, alpha: true, powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1.8));
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
        keyLight.position.set(2, 4, 5); scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0xddeeff, 1.0);
        fillLight.position.set(-3, 2, 2); scene.add(fillLight);
        const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
        topLight.position.set(0, 5, 0); scene.add(topLight);
        const glow = new THREE.PointLight(0x00aaff, 1.5, 4);
        glow.position.set(0, 0.5, 1); scene.add(glow);

        loadModel(container);
        setupOrbitControls(container);

        window.addEventListener('resize', () => {
            if (!camera || !renderer) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, { passive: true });

        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !isRendering) { isRendering = true; clock.start(); animate(); }
            });
        }, { threshold: 0.05 }).observe(container);
    }

    let baseTheta = 0, basePhi = Math.PI / 2;
    let downTime = 0, downX = 0, downY = 0;

    function setupOrbitControls(container) {
        container.style.cursor = 'grab';

        container.addEventListener('pointerdown', (e) => {
            isDragging = true;
            prevX = e.clientX; prevY = e.clientY;
            downX = e.clientX; downY = e.clientY;
            downTime = Date.now();
            container.style.cursor = 'grabbing';
            e.preventDefault();
        });

        window.addEventListener('pointermove', (e) => {
            if (isDragging) {
                baseTheta -= (e.clientX - prevX) * 0.005;
                basePhi -= (e.clientY - prevY) * 0.005;
                basePhi = Math.max(0.3, Math.min(Math.PI - 0.3, basePhi));
                targetTheta = baseTheta;
                targetPhi = basePhi;
                prevX = e.clientX; prevY = e.clientY;
            } else {
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
                targetTheta = baseTheta + (mouseX * -0.5);
                targetPhi = basePhi + (mouseY * -0.2);
            }
        });

        window.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const c = document.getElementById('eve-3d-container');
            if (c) c.style.cursor = 'grab';

            const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
            if (Date.now() - downTime < 300 && dist < 10) {
                if (window.eveAnimate) window.eveAnimate('wave');
            }

            targetTheta = baseTheta;
            targetPhi = basePhi;
        });

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
            downX = prevX; downY = prevY;
            downTime = Date.now();
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            baseTheta -= (e.touches[0].clientX - prevX) * 0.005;
            basePhi -= (e.touches[0].clientY - prevY) * 0.005;
            basePhi = Math.max(0.3, Math.min(Math.PI - 0.3, basePhi));
            targetTheta = baseTheta;
            targetPhi = basePhi;
            prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const touch = e.changedTouches[0];
            if (touch) {
                const dist = Math.hypot(touch.clientX - downX, touch.clientY - downY);
                if (Date.now() - downTime < 300 && dist < 15) {
                    if (window.eveAnimate) window.eveAnimate('wave');
                }
            }
            targetTheta = baseTheta;
            targetPhi = basePhi;
        });
    }

    function loadModel(container) {
        new GLTFLoader().load(MODEL_PATH,
            (gltf) => {
                eveRoot = gltf.scene;

                eveRoot.traverse((child) => {
                    if (!child.isMesh) return;
                    const v = child.geometry.attributes.position?.count || 0;
                    if (v <= 4) { child.visible = false; return; }
                    if (child.material) child.material.side = THREE.DoubleSide;
                    console.log(`EVE: MESH ${child.name} ${v}v parent=${child.parent?.name}`);
                });

                scene.add(eveRoot);

                mixer = new THREE.AnimationMixer(eveRoot);
                actions = [];

                gltf.animations.forEach(clip => {
                    const action = mixer.clipAction(clip);
                    action.setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                    action.play();
                    action.paused = true;
                    action.time = IDLE_TIME;
                    actions.push(action);
                });

                mixer.update(0);

                const box = new THREE.Box3().setFromObject(eveRoot);
                const size = new THREE.Vector3(); box.getSize(size);
                const scale = 1.0 / Math.max(size.x, size.y, size.z);
                eveRoot.scale.multiplyScalar(scale);

                const sbox = new THREE.Box3().setFromObject(eveRoot);
                const center = new THREE.Vector3(); sbox.getCenter(center);
                centerOffset.copy(center);

                eveRoot.position.sub(center);

                console.log(`EVE: ✅ Loaded! Paused at frame ${IDLE_FRAME}`);
                console.log(`EVE: Scale=${scale.toFixed(4)}, Center=${center.x.toFixed(3)},${center.y.toFixed(3)},${center.z.toFixed(3)}`);

                camDistance = 1.0 / Math.tan(THREE.MathUtils.degToRad(20)); // zoomed in more
                camera.position.set(0, 0, camDistance);
                camera.lookAt(0, 0, 0);

                isRendering = true;
                animate();
            },
            (p) => { if (p.total > 0) console.log('EVE:', Math.round((p.loaded / p.total) * 100) + '%'); },
            (err) => { console.error('EVE: ❌', err); }
        );
    }

    function playWave() {
        if (!mixer || actions.length === 0 || isWaving) return;
        isWaving = true;
        console.log('EVE: 👋 Wave! (frames 112→140)');

        actions.forEach(action => {
            action.paused = false;
            action.time = WAVE_START;
        });
    }

    function recenterModel() {
        if (!eveRoot) return;
        const box = new THREE.Box3().setFromObject(eveRoot);
        const currentCenter = new THREE.Vector3();
        box.getCenter(currentCenter);
        eveRoot.position.sub(currentCenter);
    }

    function animate() {
        if (!isVisible) { isRendering = false; clock.stop(); return; }
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (mixer) {
            if (isWaving) {
                mixer.update(delta);
                recenterModel();

                const currentTime = actions[0]?.time || 0;
                if (currentTime >= WAVE_END) {
                    actions.forEach(action => {
                        action.time = IDLE_TIME;
                        action.paused = true;
                    });
                    mixer.update(0);
                    recenterModel();
                    isWaving = false;
                    console.log('EVE: Wave done ✅ → back to frame 112');
                }
            }
        }

        // Add a smooth continuous rotation if not dragging, on top of mouse tracking
        if (!isDragging) {
            baseTheta += delta * 0.15;
            targetTheta += delta * 0.15;
        }

        orbitTheta += (targetTheta - orbitTheta) * 0.1;
        orbitPhi += (targetPhi - orbitPhi) * 0.1;
        
        // Dynamic floating effect and visual centering
        const floatOffset = Math.sin(time * 1.5) * 0.05;
        const VISUAL_Y_OFFSET = -0.12; // Shifts camera down so EVE appears higher and perfectly centered

        camera.position.set(
            camDistance * Math.sin(orbitPhi) * Math.sin(orbitTheta),
            camDistance * Math.cos(orbitPhi) + floatOffset + VISUAL_Y_OFFSET,
            camDistance * Math.sin(orbitPhi) * Math.cos(orbitTheta)
        );
        camera.lookAt(0, floatOffset + VISUAL_Y_OFFSET, 0);

        renderer.render(scene, camera);
    }

    window.eveAnimate = function (action) {
        if (action === 'wave' || action === 'greeting') playWave();
    };
    window.eveIsLoaded = function () { return eveRoot !== null; };
    
    window.initEve = function() {
        const container = document.getElementById('eve-3d-container');
        if (container && container.querySelector('canvas')) return; // already initialized
        init();
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.initEve);
    else window.initEve();
})();
