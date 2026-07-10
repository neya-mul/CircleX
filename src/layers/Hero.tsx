"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const LIVE_POSTS = [
    {
        name: "Rafi Ahmed",
        handle: "@rafi.codes",
        snippet: "Shipped my first open-source library today 🚀",
        likes: 128,
        comments: 14,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    {
        name: "Meera Nair",
        handle: "@meera.designs",
        snippet: "New moodboard for the spring drop is live 🎨",
        likes: 94,
        comments: 8,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    },
];

const STACK_AVATARS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
];

export default function HeroBanner() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true,
        });
    };

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.68,
            behavior: "smooth",
        });
    };

    return (
        // শর্ত ১: Height limited to 60–70% of the screen (h-[65vh])
        <div
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
            className="w-full h-[65vh] bg-[#06060e] overflow-hidden flex items-center px-6 sm:px-16 border-b border-[#161624] relative"
        >
            {/* 📐 বেস ডট-গ্রিড টেক্সচার (সবসময় অতি হালকা দৃশ্যমান) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(circle, #6366F1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* ✨ সিগনেচার: কার্সার-রিঅ্যাকটিভ স্পটলাইট — গ্রিডকে জীবন্ত করে তোলে */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: spotlight.active ? 1 : 0,
                    background: `radial-gradient(320px circle at ${spotlight.x}% ${spotlight.y}%, rgba(99,102,241,0.14), transparent 70%)`,
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: spotlight.active ? 0.5 : 0,
                    backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    WebkitMaskImage: `radial-gradient(220px circle at ${spotlight.x}% ${spotlight.y}%, black, transparent 70%)`,
                    maskImage: `radial-gradient(220px circle at ${spotlight.x}% ${spotlight.y}%, black, transparent 70%)`,
                }}
            />

            {/* 🔮 অ্যাম্বিয়েন্ট গ্লো — quiet, tucked in the corner */}
            <motion.div
                className="absolute right-[-15%] top-[-15%] w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#5D3EBC]/15 pointer-events-none"
                animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute left-[15%] top-1/4 w-32 h-32 bg-[#6366F1]/10 blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
                {/* 📝 বাম পাশ: এনিমেটেড টাইপোগ্রাফি */}
                <div className="w-full md:max-w-lg space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-1.5 bg-[#12112a] border border-[#5D3EBC]/40 px-3 py-1 rounded-full text-[10px] font-bold text-[#9295ff] tracking-wider uppercase shadow-[0_0_15px_rgba(93,62,188,0.2)]"
                    >
                        <Sparkles size={10} />
                        <span className="tabular-nums">3,200</span> posts today
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]"
                        >
                            Your circle is <br />
                            <span
                                className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_6s_linear_infinite]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #6366F1, #a78bfa, #ffffff, #a78bfa, #6366F1)",
                                }}
                            >
                                already here.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed"
                        >
                            Post what you're making, see what your circle is up to, and jump into
                            conversations as they happen. No noise, just the people you actually follow.
                        </motion.p>
                    </div>

                    {/* শর্ত ২: Interactive CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4 pt-2"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(93,62,188,0.4)] transition-all"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                            <span className="relative">Join the Feed</span>
                            <ArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                            className="bg-transparent text-gray-300 text-xs font-bold px-5 py-3.5 rounded-xl border border-gray-800 transition-all"
                        >
                            See What's Trending
                        </motion.button>
                    </motion.div>

                    {/* সোশ্যাল প্রুফ: অ্যাভাটার স্ট্যাক */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.6 }}
                        className="flex items-center gap-3 pt-1"
                    >
                        <div className="flex -space-x-2.5">
                            {STACK_AVATARS.map((src, i) => (
                                <motion.img
                                    key={i}
                                    src={src}
                                    alt=""
                                    whileHover={{ y: -3, zIndex: 10 }}
                                    className="w-7 h-7 rounded-full object-cover border-2 border-[#06060e] relative"
                                />
                            ))}
                            <div className="w-7 h-7 rounded-full bg-[#161624] border-2 border-[#06060e] flex items-center justify-center text-[8px] font-bold text-gray-400">
                                +12k
                            </div>
                        </div>
                        <span className="text-[11px] text-gray-500">already posting this week</span>
                    </motion.div>
                </div>

                {/* 📱 ডান পাশ: লাইভ ফিড প্রিভিউ কার্ড — bobbing, glowing border */}
                <motion.div
                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                    animate={{
                        opacity: 1,
                        rotate: -2,
                        y: [0, -8, 0],
                    }}
                    transition={{
                        opacity: { delay: 0.4, duration: 0.7 },
                        y: { delay: 1, duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className="hidden md:block relative w-full max-w-[280px] shrink-0"
                >
                    {/* গ্রেডিয়েন্ট গ্লো বর্ডার */}
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#6366F1]/40 via-transparent to-[#5D3EBC]/40 blur-[2px] pointer-events-none" />

                    <div className="relative w-full bg-[#0b0c16]/95 backdrop-blur-md border border-[#161624] rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                Live on your feed
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                </span>
                                Live
                            </span>
                        </div>

                        {LIVE_POSTS.map((post, i) => (
                            <motion.div
                                key={post.handle}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                                whileHover={{ borderColor: "rgba(99,102,241,0.4)" }}
                                className="bg-[#06060e] border border-[#161624] rounded-xl p-3 space-y-2 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={post.avatar}
                                        alt={post.name}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <div className="leading-tight">
                                        <p className="text-[11px] font-bold text-gray-200">{post.name}</p>
                                        <p className="text-[9px] text-gray-500">{post.handle}</p>
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-400 leading-snug">{post.snippet}</p>
                                <div className="flex items-center gap-3 pt-0.5">
                                    <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                        <Heart size={11} /> {post.likes}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                        <MessageCircle size={11} /> {post.comments}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ছোট ফ্লোটিং ব্যাজ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        className="absolute -top-3 -left-3 bg-[#5D3EBC] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(93,62,188,0.5)] z-10"
                    >
                        🔥 Trending now
                    </motion.div>
                </motion.div>
            </div>

            {/* শর্ত ৩: Clear Visual Flow Button */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                    onClick={scrollToNextSection}
                    className="flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest text-gray-500 hover:text-[#6366F1] uppercase transition-colors group"
                >
                    <span>Explore Feed</span>
                    <ArrowDown size={12} className="animate-bounce text-gray-600 group-hover:text-[#6366F1]" />
                </button>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    to {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </div>
    );
}