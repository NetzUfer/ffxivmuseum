import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ArtifactViewer = ({ modelPath, background = '#0a1428' }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xc9a66b, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point light with golden hue for magical effect
    const pointLight = new THREE.PointLight(0xc9a66b, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controlsRef.current = controls;
    
    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;
        
        // Add magical particle effect around the model
        addParticles(scene, box);
        
        scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
    
    // Add magical particles around the model
    function addParticles(scene, box) {
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 100;
      
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      const boxSize = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
      
      for (let i = 0; i < particleCount; i++) {
        // Position particles in a sphere around the model
        const radius = maxDim * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        sizes[i] = Math.random() * 0.05 + 0.01;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xc9a66b,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);
      
      // Animate particles
      function animateParticles() {
        const positions = particleGeometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Slow rotation around the model
          const x = positions[i3];
          const z = positions[i3 + 2];
          
          positions[i3] = x * Math.cos(0.001) - z * Math.sin(0.001);
          positions[i3 + 2] = x * Math.sin(0.001) + z * Math.cos(0.001);
        }
        
        particleGeometry.attributes.position.needsUpdate = true;
      }
      
      return animateParticles;
    }
    
    // Animation loop
    let animateParticles;
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (animateParticles) {
        animateParticles();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelPath, background]);
  
  return (
    <div className="artifact-viewer-container">
      <div 
        ref={mountRef} 
        className="artifact-viewer"
        style={{ 
          width: '100%', 
          height: '500px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(201, 166, 107, 0.3)'
        }}
      />
      <div className="artifact-controls">
        <div className="control-instructions">
          <p>Linksklick + Ziehen: Rotieren</p>
          <p>Mausrad: Zoomen</p>
          <p>Rechtsklick + Ziehen: Schwenken</p>
        </div>
      </div>
    </div>
  );
};

export default ArtifactViewer;
