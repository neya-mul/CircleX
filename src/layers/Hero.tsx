"use client";

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
    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.68,
            behavior: "smooth",
        });
    };

    return (
        // শর্ত ১: Height limited to 60–70% of the screen (h-[65vh])
        <div className="w-full h-[65vh] bg-[#06060e] overflow-hidden flex items-center px-6 sm:px-16 border-b border-[#161624] relative">
            {/* 🔮 ব্যাকগ্রাউন্ডে মোশন রিং অ্যানিমেশন — subtle, tucked in the corner, not behind the card */}
            <motion.div
                className="absolute right-[-15%] top-[-15%] w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#5D3EBC]/15 pointer-events-none"
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: 360,
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
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
                        3,200 posts today
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]"
                        >
                            Your circle is <br />
                            <span className="bg-gradient-to-r from-[#6366F1] via-[#a78bfa] to-white bg-clip-text text-transparent">
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
                            className="group bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(93,62,188,0.4)] transition-all"
                        >
                            Join the Feed
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="w-7 h-7 rounded-full object-cover border-2 border-[#06060e]"
                                />
                            ))}
                            <div className="w-7 h-7 rounded-full bg-[#161624] border-2 border-[#06060e] flex items-center justify-center text-[8px] font-bold text-gray-400">
                                +12k
                            </div>
                        </div>
                        <span className="text-[11px] text-gray-500">
                            already posting this week
                        </span>
                    </motion.div>
                </div>

                {/* 📱 ডান পাশ: লাইভ ফিড প্রিভিউ কার্ড — সিগনেচার এলিমেন্ট */}
                <motion.div
                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className="hidden md:block relative w-full max-w-[280px] shrink-0"
                >
                    <div className="w-full bg-[#0b0c16]/90 backdrop-blur-md border border-[#161624] rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                Live on your feed
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                Live
                            </span>
                        </div>

                        {LIVE_POSTS.map((post, i) => (
                            <motion.div
                                key={post.handle}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                                className="bg-[#06060e] border border-[#161624] rounded-xl p-3 space-y-2"
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
                        className="absolute -top-3 -left-3 bg-[#5D3EBC] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(93,62,188,0.5)]"
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
        </div>
    );
}