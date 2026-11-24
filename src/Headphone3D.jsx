import React, { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, ContactShadows, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Headphone3D() {
    const modelRef = useRef();

    // AGAR AAPKE PAAS .GLB MODEL HAI TOH YEH USE KAREIN:
    // const { scene } = useGLTF('/headphone.glb');

    useLayoutEffect(() => {
        const el = modelRef.current;

        // GSAP Scroll Animation - Jaise scroll karenge model move aur rotate hoga
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            }
        });

        // Section 1 to 2: Model moves right and rotates to show side profile
        tl.to(el.position, { x: 2.5, y: -0.5, z: 0 }, 0)
            .to(el.rotation, { y: Math.PI * 0.8, x: 0.2 }, 0)

            // Section 2 to 3: Model moves left, zooms in (for sound quality section)
            .to(el.position, { x: -2.5, y: -1, z: 1.5 }, 1)
            .to(el.rotation, { y: -Math.PI * 0.5, x: -0.2, z: 0.5 }, 1)

            // Section 3 to 4 (Footer/Buy): Model comes back to center
            .to(el.position, { x: 0, y: 0, z: 0.5 }, 2)
            .to(el.rotation, { y: Math.PI * 2, x: 0, z: 0 }, 2);

    }, []);

    return (
        <>
            {/* Realistic Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#3b82f6" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* 3D Model Group */}
                <group ref={modelRef} position={[0, 0, 0]} scale={0.9}>

                    {/* AGAR .GLB FILE HAI TOH NICHE WALI LINE UNCOMMENT KAREIN: */}
                    {/* <primitive object={scene} /> */}

                    {/* --- PROCEDURAL 3D HEADPHONE (Chalne ke liye banaya gaya) --- */}
                    {/* Headband */}
                    <mesh position={[0, 0.5, 0]}>
                        <torusGeometry args={[1.2, 0.1, 16, 100, Math.PI]} />
                        <meshStandardMaterial color="#1e1e1e" metalness={0.8} roughness={0.2} />
                    </mesh>
                    {/* Left Earcup */}
                    <mesh position={[-1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
                        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Right Earcup */}
                    <mesh position={[1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
                        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Glowing Rings */}
                    <mesh position={[-1.41, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <torusGeometry args={[0.35, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[1.41, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <torusGeometry args={[0.35, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
                    </mesh>
                    {/* ---------------------------------------------------------- */}

                </group>
            </Float>
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#3b82f6" />
        </>
    );
}