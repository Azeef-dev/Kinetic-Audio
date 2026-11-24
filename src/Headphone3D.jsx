import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useGLTF, Float, ContactShadows, Center, Resize, Environment, Sparkles } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cloneSceneWithMaterials } from './utils/cloneScene';

gsap.registerPlugin(ScrollTrigger);

export function Headphone3D() {
    const groupRef = useRef();
    const { camera } = useThree();
    const { scene } = useGLTF('/headphone.glb');
    const model = useMemo(() => cloneSceneWithMaterials(scene), [scene]);

    useLayoutEffect(() => {
        const group = groupRef.current;
        if (!group) return;

        camera.position.set(0, 0, 5);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.scroll-container',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.2,
                },
            });

            // Hero: grow in from nothing
            tl.fromTo(group.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.out' }, 0);

            // Hero -> Design: swing right, tilt to show the hinge detail
            tl.to(group.position, { x: 1.6, y: -0.1, z: 0.5, duration: 1 }, 1)
                .to(group.rotation, { y: Math.PI * 0.65, x: 0.15, z: -0.08, duration: 1 }, 1)
                .to(camera.position, { x: 0.35, z: 4.3, duration: 1 }, 1);

            // Design -> Sound: swing left, close on the driver
            tl.to(group.position, { x: -1.7, y: -0.2, z: 1.3, duration: 1 }, 2)
                .to(group.rotation, { y: -Math.PI * 0.55, x: -0.1, z: 0.18, duration: 1 }, 2)
                .to(camera.position, { x: -0.3, z: 3.4, duration: 1 }, 2);

            // Sound -> Specs: center, full spin, pull back
            tl.to(group.position, { x: 0, y: 0.15, z: -0.4, duration: 1 }, 3)
                .to(group.rotation, { y: Math.PI * 2.2, x: 0, z: 0, duration: 1 }, 3)
                .to(camera.position, { x: 0, z: 6.4, duration: 1 }, 3);

            // Specs -> Gallery: vanish so the 2D photo grid takes over
            tl.to(group.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.8 }, 4.2);

            // Gallery -> CTA: return with a flourish spin, dolly in for the finale
            tl.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.8 }, 5.2)
                .to(group.position, { x: 0, y: 0, z: 0, duration: 0.8 }, 5.2)
                .to(group.rotation, { y: Math.PI * 4, x: 0, z: 0, duration: 0.8 }, 5.2)
                .to(camera.position, { x: 0, z: 4.2, duration: 0.8 }, 5.2);
        });

        return () => ctx.revert();
    }, [camera]);

    return (
        <>
            <ambientLight intensity={1.2} />
            <hemisphereLight intensity={1.6} groundColor="#000000" color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" castShadow />
            <directionalLight position={[10, 5, -5]} intensity={5} color="#3b82f6" />
            <directionalLight position={[-10, -5, 5]} intensity={4} color="#ec4899" />
            <spotLight position={[0, 10, 0]} intensity={2.5} penumbra={1} />

            <Environment preset="city" />
            <Sparkles count={60} scale={6} size={2} speed={0.3} opacity={0.35} color="#60a5fa" />

            <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.4}>
                <group ref={groupRef}>
                    <Center>
                        <Resize scale={2.8}>
                            <primitive object={model} />
                        </Resize>
                    </Center>
                </group>
            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.55} scale={12} blur={2.4} far={4} color="#3b82f6" />
        </>
    );
}

useGLTF.preload('/headphone.glb');