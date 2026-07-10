"use client";

import { ArrowDown, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.68,
      behavior: "smooth"
    });
  };

  return (
    // শর্ত ১: Height limited to 60–70% of the screen (h-[65vh])
    <div className="w-full h-[65vh] bg-[#06060e] overflow-hidden flex items-center px-6 sm:px-16 border-b border-[#161624] relative">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে মোশন রিং অ্যানিমেশন (No SVG, Pure Framer Glow) */}
      <motion.div 
        className="absolute right-[-10%] md:right-[5%] top-[10%] w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full border-2 border-[#5D3EBC]/20 shadow-[0_0_80px_rgba(93,62,188,0.25)] pointer-events-none"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: 360 
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      <div className="absolute left-[20%] top-1/4 w-32 h-32 bg-[#6366F1]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* 📝 বাম পাশ: এনিমেটেড টাইপোগ্রাফি */}
        <div className="md:col-span-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-[#12112a] border border-[#5D3EBC]/40 px-3 py-1 rounded-full text-[10px] font-bold text-[#9295ff] tracking-wider uppercase shadow-[0_0_15px_rgba(93,62,188,0.2)]"
          >
            <Sparkles size={10} className="animate-spin" />
            Version 1.0 Live
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]"
            >
              Discover. Connect. <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#a78bfa] to-white bg-clip-text text-transparent">
                Inspire.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed"
            >
              Share your story and connect with amazing people. Nexora brings the global community together into a single immersive tech space.
            </motion.p>
          </div>

          {/* শর্ত ২: Interactive CTA with Framer Motion Hovers */}
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
              Explore Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="bg-transparent text-gray-300 text-xs font-bold px-5 py-3.5 rounded-xl border border-gray-800 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
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