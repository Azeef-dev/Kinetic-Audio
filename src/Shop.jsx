import React from 'react';

const products = [
    { id: 1, name: "Aura Pro X - Midnight Blue", price: "$299", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" },
    { id: 2, name: "Aura Studio - Matte Black", price: "$349", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80" },
    { id: 3, name: "Aura Lite - Neon Edition", price: "$199", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80" },
    { id: 4, name: "Aura Gaming - RGB Pro", price: "$249", img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80" },
];

export default function Shop() {
    return (
        <div className="min-h-screen pt-28 px-10 md:px-24 pb-20 bg-[#0a0a0a]">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Choose Your <span className="text-blue-500">Style</span></h1>
                <p className="text-gray-400">Har headphone ek masterpiece hai. Apna color select karein.</p>
            </div>

            {/* Product Grid with Pictures */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500 transition-all duration-300">
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
                                <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lifestyle Gallery Section */}
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