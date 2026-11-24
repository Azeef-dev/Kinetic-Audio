import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Center, Resize, Float } from '@react-three/drei';
import { cloneSceneWithMaterials } from './utils/cloneScene';

function Model({ color }) {
    const { scene } = useGLTF('/headphone.glb');
    const model = useMemo(() => cloneSceneWithMaterials(scene), [scene]);

    useLayoutEffect(() => {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m) => {
                    // This tints every mesh. If you only want the shell to change color,
                    // check child.name here (e.g. `if (child.name.includes('Shell'))`)
                    // using the actual node names from your GLB file.
                    if (m.color) m.color.set(color);
                });
            }
        });
    }, [model, color]);

    return (
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
            <Center>
                <Resize scale={2.6}>
                    <primitive object={model} />
                </Resize>
            </Center>
        </Float>
    );
}

export default function HeadphoneViewer({ color }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} shadows>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
            <directionalLight position={[-6, 3, -4]} intensity={1.2} color="#60a5fa" />
            <Environment preset="studio" />

            <Suspense fallback={null}>
                <Model color={color} />
            </Suspense>

            <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.2} far={3} />

            <OrbitControls
                enablePan={false}
                enableZoom
                minDistance={3}
                maxDistance={7}
                autoRotate
                autoRotateSpeed={1.2}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.6}
            />
        </Canvas>
    );
}

useGLTF.preload('/headphone.glb');