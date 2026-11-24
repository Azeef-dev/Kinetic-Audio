import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stories = [
    {
        title: 'Aerospace-Grade Materials',
        text: 'CNC-milled aluminum aur recycled polymers se bana shell, wazan mein halka lekin durability mein uncompromising. Har joint hand-finished hai taake lifetime tak chale.',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    },
    {
        title: 'Studio-Grade Acoustics',
        text: '50mm custom-tuned drivers, triple-mic Active Noise Cancellation ke sath. Chahe flight ho ya coffee shop, sirf music rehta hai — baaki sab mute.',
        img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80',
    },
    {
        title: 'All-Day Battery',
        text: '40 hours ki playback aur 10-minute fast charge se 5 hours extra. USB-C fast charging aur wireless-ready case ke sath.',
        img: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=900&q=80',
    },
    {
        title: 'Comfort by Design',
        text: 'Memory-foam ear cushions aur adjustable headband jo ghanton ki listening ko bhi halka rakhta hai — bina kisi pressure point ke.',
        img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80',
    },
];

export default function Technology() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal-item').forEach((el) => {
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 60 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 82%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-16">
            <div className="text-center max-w-2xl mx-auto mb-20 reveal-item opacity-0">
                <h2 className="text-blue-500 tracking-[0.3em] text-xs font-semibold uppercase mb-3">The Craft</h2>
                <h1 className="text-4xl md:text-6xl font-bold">Engineered Down to the Micron</h1>
            </div>

            <div className="space-y-24 max-w-5xl mx-auto">
                {stories.map((s, i) => (
                    <div key={s.title} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center reveal-item opacity-0">
                        <img
                            src={s.img}
                            alt={s.title}
                            className={`rounded-3xl w-full h-72 md:h-96 object-cover border border-white/10 ${i % 2 ? 'md:order-2' : ''}`}
                        />
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{s.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{s.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}