import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF, Float, ContactShadows, Center, Resize } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Headphone3D() {
    const modelRef = useRef();

    // Aapka 3D Model load ho raha hai
    const { scene } = useGLTF('/headphone.glb');

    useLayoutEffect(() => {
        const el = modelRef.current;

        // GSAP Scroll Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Section 1 to 2: Model moves right and rotates
        tl.to(el.position, { x: 2.2, y: -0.2, z: 0 }, 0)
            .to(el.rotation, { y: Math.PI * 0.8, x: 0.2 }, 0)

            // Section 2 to 3: Model moves left and zooms in
            .to(el.position, { x: -2.2, y: -0.5, z: 1.2 }, 1)
            .to(el.rotation, { y: -Math.PI * 0.5, x: -0.2, z: 0.3 }, 1)

            // Section 3 to 4: Model comes back to center
            .to(el.position, { x: 0, y: 0.2, z: 0.5 }, 2)
            .to(el.rotation, { y: Math.PI * 2, x: 0, z: 0 }, 2);

    }, []);

    return (
        <>
            {/* Pure Three.js Studio Lighting (Bina kisi internet error ke!) */}
            <ambientLight intensity={2} />
            <hemisphereLight intensity={2.5} groundColor="#000000" color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={4} color="#ffffff" />
            <directionalLight position={[10, 5, -5]} intensity={6} color="#3b82f6" />
            <directionalLight position={[-10, -5, 5]} intensity={5} color="#ec4899" />
            <spotLight position={[0, 10, 0]} intensity={3} penumbra={1} />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={modelRef}>
                    <Center>
                        <Resize scale={2.8}>
                            <primitive object={scene} />
                        </Resize>
                    </Center>
                </group>
            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#3b82f6" />
        </>
    );
}