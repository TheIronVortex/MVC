import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
const ThreeScene = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        // Three.js code adapted for React
        let simplex = new SimplexNoise();
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x220000);
        let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 5, 3).setLength(10);
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const mount = mountRef.current;
        mount.appendChild(renderer.domElement);
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        let texLoader = new THREE.TextureLoader();
        texLoader.load(
            "https://cywarr.github.io/small-shop/FruitMarket.jpg",
            (envMap) => {
                envMap.colorSpace = THREE.SRGBColorSpace;
                envMap.mapping = THREE.EquirectangularRefractionMapping;
                scene.environment = envMap;
            }
        );
        scene.add(new THREE.AmbientLight(0xffffff, Math.PI * 0.5));
        let g = new THREE.IcosahedronGeometry(1, 200);
        g.deleteAttribute('normal');
        g.deleteAttribute('uv');
        g = mergeVertices(g, 0.001);
        let pos = g.attributes.position;
        let color = [];
        let c = new THREE.Color();
        let v = new THREE.Vector3();
        let s = new THREE.Spherical();
        for (let i = 0; i < pos.count; i++) {
            v.fromBufferAttribute(pos, i).multiplyScalar(1.5);
            let n1 = simplex.noise3d(v.x, v.y, v.z);
            v.fromBufferAttribute(pos, i).multiplyScalar(25);
            let n2 = simplex.noise3d(v.x, v.y, v.z);
            n2 = Math.abs(n2) ** 0.25;
            let l = 4 + n1 * 0.05 + n2 * 0.05;
            s.setFromVector3(v);
            let t = s.phi / Math.PI;
            let mix = THREE.MathUtils.smoothstep(t, 0.0125, 0.1);
            mix = Math.sqrt(1 - --mix * mix) ** 3;
            l = THREE.MathUtils.lerp(3.5, l, mix);
            v.fromBufferAttribute(pos, i).setLength(l);
            pos.setXYZ(i, v.x, v.y * 0.9, v.z);
            c.set(mix < 0.05 ? "#ffee55" : t > 0.995 ? "#886644" : "#f28500");
            color.push(c.r, c.g, c.b);
        }
        g.computeVertexNormals();
        g.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
        let m = new THREE.MeshPhysicalMaterial({
            vertexColors: true,
            reflectivity: 1,
            metalness: 0.8,
            roughness: 0.6,
            envMapIntensity: 2.5
        });
        let o = new THREE.Mesh(g, m);
        scene.add(o);
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        document.body.style.overflow = 'hidden';
        document.body.style.margin = '0';
        // Cleanup
        return () => {
            document.body.style.overflow = '';
            document.body.style.margin = '';
            mount.removeChild(renderer.domElement);
            // Perform additional cleanup steps if necessary
        };

    }, []);
    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};
export default ThreeScene;