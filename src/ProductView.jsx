import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RotateCw } from 'lucide-react';
import HeadphoneViewer from './HeadphoneViewer';

const COLORS = [
    { key: 'midnight-blue', name: 'Midnight Blue', hex: '#1e3a8a', price: '$299' },
    { key: 'matte-black', name: 'Matte Black', hex: '#161616', price: '$349' },
    { key: 'neon', name: 'Neon Edition', hex: '#a3e635', price: '$199' },
    { key: 'rgb-pro', name: 'RGB Pro', hex: '#ec4899', price: '$249' },
];

export default function ProductView() {
    const { colorKey } = useParams();
    const initial = COLORS.find((c) => c.key === colorKey) || COLORS[0];
    const [active, setActive] = useState(initial);

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-16 px-6 md:px-16">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="h-[420px] md:h-[560px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent overflow-hidden relative">
                    <HeadphoneViewer color={active.hex} />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-400 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                        <RotateCw className="w-3.5 h-3.5" /> Drag to rotate
                    </div>
                </div>

                <div>
                    <h2 className="text-blue-500 tracking-[0.3em] text-xs font-semibold uppercase mb-3">Aura Pro X</h2>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{active.name}</h1>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Interact karein — ghumaein, zoom karein, aur apna pasandeeda color select karein. Har detail aerospace-grade aluminum aur custom 50mm drivers ke sath design hui hai.
                    </p>

                    <div className="flex gap-3 mb-8">
                        {COLORS.map((c) => (
                            <button
                                key={c.key}
                                type="button"
                                onClick={() => setActive(c)}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${active.key === c.key ? 'border-blue-500 scale-110' : 'border-white/20'}`}
                                style={{ backgroundColor: c.hex }}
                                aria-label={c.name}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-blue-400">{active.price}</span>
                        <button type="button" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}