import React, { Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { Headphone3D } from './Headphone3D';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text entrance
            gsap.fromTo('.hero-eyebrow', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
            gsap.fromTo('.hero-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.5, ease: 'power3.out' });
            gsap.fromTo('.hero-sub', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

            // Mood-lighting glows that fade in/out with whichever section is on screen
            gsap.utils.toArray('.glow-layer').forEach((layer) => {
                const section = document.getElementById(layer.dataset.glow);
                if (!section) return;
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    onEnter: () => gsap.to(layer, { opacity: 1, duration: 0.6, overwrite: true }),
                    onLeave: () => gsap.to(layer, { opacity: 0, duration: 0.6, overwrite: true }),
                    onEnterBack: () => gsap.to(layer, { opacity: 1, duration: 0.6, overwrite: true }),
                    onLeaveBack: () => gsap.to(layer, { opacity: 0, duration: 0.6, overwrite: true }),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Base + mood-lighting layers, sit behind the 3D canvas */}
            <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
            <div data-glow="sec-design" className="glow-layer fixed inset-0 -z-10 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(59,130,246,0.35), transparent 60%)' }} />
            <div data-glow="sec-sound" className="glow-layer fixed inset-0 -z-10 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(236,72,153,0.3), transparent 60%)' }} />
            <div data-glow="sec-specs" className="glow-layer fixed inset-0 -z-10 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.3), transparent 65%)' }} />
            <div data-glow="sec-cta" className="glow-layer fixed inset-0 -z-10 opacity-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.4), transparent 60%)' }} />

            {/* Fixed 3D canvas, pinned behind the scrolling content */}
            <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
                    <Suspense fallback={null}>
                        <Headphone3D />
                    </Suspense>
                </Canvas>
            </div>

            <div className="scroll-container relative z-20">
                <section id="sec-hero" className="h-screen flex flex-col items-center justify-between py-24 px-10 text-center">
                    <div className="mt-10">
                        <h2 className="hero-eyebrow text-blue-500 tracking-[0.3em] text-sm font-semibold uppercase opacity-0">
                            Next-Gen Audio
                        </h2>
                        <h1 className="hero-title text-6xl md:text-8xl font-extrabold tracking-tight mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 opacity-0">
                            AURA PRO X
                        </h1>
                    </div>
                    <div className="hero-sub flex flex-col items-center gap-4 opacity-0">
                        <p className="max-w-md text-gray-400 text-sm md:text-base bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
                            Scroll down to experience the 3D sound revolution.
                        </p>
                        <ChevronDown className="w-6 h-6 text-blue-400 animate-bounce" />
                    </div>
                </section>

                <section id="sec-design" className="h-screen flex items-center px-10 md:px-24">
                    <div className="w-full md:w-1/2 space-y-6 bg-black/40 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Crafted for <span className="text-blue-500">Comfort.</span>
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Aerospace-grade aluminum cups milte hain memory foam cushions ke sath. Iska ergonomic design aapko ghanton tak bina kisi thakan ke music sunne ki azaadi deta hai.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="Detail 1" className="rounded-xl h-32 w-full object-cover border border-white/20" />
                            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80" alt="Detail 2" className="rounded-xl h-32 w-full object-cover border border-white/20" />
                        </div>
                    </div>
                </section>

                <section id="sec-sound" className="h-screen flex items-center justify-end px-10 md:px-24">
                    <div className="w-full md:w-1/2 space-y-6 bg-black/40 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Pure <span className="text-pink-500">Bass.</span> Zero Noise.
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Active Noise Cancellation (ANC) ke sath duniya ko mute karein. 50mm custom drivers aapko woh har beat mehsoos karwayenge jo artist ne studio mein banayi thi.
                        </p>
                        <div className="flex gap-8 pt-4">
                            <div>
                                <h3 className="text-3xl font-bold text-blue-400">40 Hrs</h3>
                                <p className="text-xs text-gray-400">Battery Life</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-pink-400">0.01s</h3>
                                <p className="text-xs text-gray-400">Ultra Low Latency</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="sec-specs" className="h-screen flex flex-col items-center justify-center text-center px-10 gap-12">
                    <h2 className="text-4xl md:text-6xl font-bold">
                        Numbers That <span className="text-purple-400">Matter.</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                        <Stat value="40 Hrs" label="Battery Life" color="text-blue-400" />
                        <Stat value="0.01s" label="Ultra Low Latency" color="text-pink-400" />
                        <Stat value="50mm" label="Custom Drivers" color="text-purple-400" />
                        <Stat value="-35dB" label="Noise Cancellation" color="text-emerald-400" />
                    </div>
                </section>

                <section id="sec-gallery" className="min-h-screen flex flex-col justify-center px-10 md:px-24 py-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
                        In The <span className="text-blue-500">Wild.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80" className="w-full h-72 object-cover rounded-2xl" alt="Lifestyle 1" />
                        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" className="w-full h-72 object-cover rounded-2xl md:col-span-2" alt="Lifestyle 2" />
                        <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" className="w-full h-72 object-cover rounded-2xl md:col-span-2" alt="Lifestyle 3" />
                        <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80" className="w-full h-72 object-cover rounded-2xl" alt="Lifestyle 4" />
                    </div>
                </section>

                <section id="sec-cta" className="h-screen flex flex-col items-center justify-center px-10 text-center">
                    <div className="bg-gradient-to-t from-blue-900/40 to-black/60 backdrop-blur-xl p-10 rounded-3xl border border-blue-500/30 max-w-2xl w-full">
                        <h2 className="text-4xl font-bold mb-4">Ready to Upgrade?</h2>
                        <p className="text-gray-300 mb-6">Get the Aura Pro X today for $299.</p>
                        <Link
                            to="/shop"
                            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        >
                            Explore Collection & Buy
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

function Stat({ value, label, color }) {
    return (
        <div>
            <h3 className={`text-4xl md:text-5xl font-bold ${color}`}>{value}</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-2">{label}</p>
        </div>
    );
}