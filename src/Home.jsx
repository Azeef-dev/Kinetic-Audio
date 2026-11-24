import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Headphone3D } from './Headphone3D';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="relative w-full">

            {/* FIXED 3D CANVAS IN BACKGROUND */}
            <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Headphone3D />
                </Canvas>
            </div>

            {/* SCROLLABLE HTML CONTENT */}
            <div className="scroll-container relative z-20">

                {/* SECTION 1: HERO (Center) */}
                <section className="h-screen flex flex-col items-center justify-between py-24 px-10 text-center">
                    <div className="mt-10">
                        <h2 className="text-blue-500 tracking-[0.3em] text-sm font-semibold uppercase">Next-Gen Audio</h2>
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            AURA PRO X
                        </h1>
                    </div>
                    <p className="max-w-md text-gray-400 text-sm md:text-base bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        Scroll down to experience the 3D sound revolution.
                    </p>
                </section>

                {/* SECTION 2: DESIGN (Content on Left, 3D Model moves Right) */}
                <section className="h-screen flex items-center px-10 md:px-24">
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

                {/* SECTION 3: SOUND QUALITY (Content on Right, 3D Model moves Left) */}
                <section className="h-screen flex items-center justify-end px-10 md:px-24">
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

                {/* SECTION 4: BUY NOW (Center) */}
                <section className="h-screen flex flex-col items-center justify-end pb-20 px-10 text-center">
                    <div className="bg-gradient-to-t from-blue-900/40 to-black/60 backdrop-blur-xl p-10 rounded-3xl border border-blue-500/30 max-w-2xl w-full">
                        <h2 className="text-4xl font-bold mb-4">Ready to Upgrade?</h2>
                        <p className="text-gray-300 mb-6">Get the Aura Pro X today for $299.</p>
                        <Link to="/shop" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            Explore Collection & Buy
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}