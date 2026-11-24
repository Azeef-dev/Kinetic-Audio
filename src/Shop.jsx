import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const products = [
    { id: 1, key: 'midnight-blue', name: 'Aura Pro X - Midnight Blue', price: '$299', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80' },
    { id: 2, key: 'matte-black', name: 'Aura Studio - Matte Black', price: '$349', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80' },
    { id: 3, key: 'neon', name: 'Aura Lite - Neon Edition', price: '$199', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80' },
    { id: 4, key: 'rgb-pro', name: 'Aura Gaming - RGB Pro', price: '$249', img: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80' },
];

function TiltCard({ children }) {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateX = (py - 0.5) * -14;
        const rotateY = (px - 0.5) * 14;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    return (
        <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="transition-transform duration-300 ease-out will-change-transform">
            {children}
        </div>
    );
}

export default function Shop() {
    return (
        <div className="min-h-screen pt-28 px-10 md:px-24 pb-20 bg-[#0a0a0a]">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">
                    Choose Your <span className="text-blue-500">Style</span>
                </h1>
                <p className="text-gray-400">Har headphone ek masterpiece hai. Apna color select karein aur 3D mein dekhein.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <TiltCard key={item.id}>
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500 transition-all duration-300">
                            <div className="overflow-hidden h-64">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-2xl font-bold text-blue-400">{item.price}</span>
                                    <Link
                                        to={`/product/${item.key}`}
                                        className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors text-sm"
                                    >
                                        View in 3D
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                ))}
            </div>

            <div className="mt-24">
                <h2 className="text-3xl font-bold mb-8 text-center">In The Wild (Gallery)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80" className="w-full h-full object-cover rounded-2xl" alt="Lifestyle 1" />
                    <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" className="w-full h-full object-cover rounded-2xl md:col-span-2" alt="Lifestyle 2" />
                </div>
            </div>
        </div>
    );
}