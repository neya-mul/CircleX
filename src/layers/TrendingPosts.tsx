"use client";

import { useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, Flame, CheckCircle, Code } from "lucide-react";
// ১. Variants টাইপটি এখানে এক্সপ্লিসিটলি ইম্পোর্ট করা হয়েছে
import { motion, Variants } from "framer-motion";

export default function TrendingGrid() {
  // স্ট্যাটিক ডাটা অ্যারে
  const staticPosts = [
    {
      id: 1,
      author: {
        name: "Alex Parker",
        username: "alexprkr",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        verified: true
      },
      time: "2h ago",
      tag: "Next.js 15",
      content: "Just migrated our entire production app to Next.js 15 and Tailwind v4. The build times dropped by nearly 35%! The new compiler feels like magic. Anyone else exploring the new core features?",
      hasCode: true,
      codeSnippet: "npm install tailwindcss@next @tailwindcss/postcss",
      likes: "1.2K",
      comments: 86,
      isLiked: true
    },
    {
      id: 2,
      author: {
        name: "Jessica Lee",
        username: "jess_dev",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        verified: true
      },
      time: "4h ago",
      tag: "UI/UX",
      content: "Dark mode isn't just about changing #FFF to #000. It's about depth, contrast, and proper saturation. Working on a new glass-morphism dashboard design system for CircleX. 🌌🔥",
      hasCode: false,
      likes: "942",
      comments: 42,
      isLiked: false
    },
    {
      id: 3,
      author: {
        name: "Daniel Kim",
        username: "dan_crypt",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        verified: false
      },
      time: "6h ago",
      tag: "AI & LLM",
      content: "Building local-first AI agents using Ollama and Llama 3. Running multi-agent orchestration entirely in the browser is now becoming a reality. The future of software is agentic.",
      hasCode: true,
      codeSnippet: "const agent = await createAgent({ model: 'llama3' });",
      likes: "2.4K",
      comments: 154,
      isLiked: false
    },
    {
      id: 4,
      author: {
        name: "Sophia Martinez",
        username: "sophia_codes",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        verified: true
      },
      time: "1d ago",
      tag: "Web3",
      content: "Solana state compression is crazy efficient. Just minted 10,000 NFTs for less than $10. If you are still sleeping on L1 scaling solutions, this is your sign to wake up.",
      hasCode: false,
      likes: "810",
      comments: 29,
      isLiked: false
    }
  ];

  // ২. টাইপস্ক্রিপ্ট এরর দূর করতে এখানে : Variants টাইপ অ্যাসাইন করা হলো
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  return (
    <section className="container mx-auto py-6">
      {/* সেকশন হেডার */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#5D3EBC]/10 border border-[#5D3EBC]/30 text-[#7c7fff]">
            <Flame size={18} className="animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Trending Feed</h2>
        </div>
        <span className="text-xs font-semibold text-[#7c7fff] hover:underline cursor-pointer">View All</span>
      </div>

      {/* গ্রিড লেআউট */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {staticPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="bg-[#0b0c16]/70 backdrop-blur-md border border-[#161624] hover:border-[#5D3EBC]/50 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          >
            <div>
              {/* ইউজার ইনফো বার */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-gray-800" />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#7c7fff] transition-colors">{post.author.name}</h4>
                      {post.author.verified && <CheckCircle size={14} className="text-[#6366F1] fill-[#6366F1]/10" />}
                    </div>
                    <p className="text-[11px] text-gray-500">@{post.author.username} • {post.time}</p>
                  </div>
                </div>
                
                {/* ক্যাটাগরি ট্যাগ */}
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#121324] text-gray-400 border border-gray-800">
                  {post.tag}
                </span>
              </div>

              {/* মেইন টেক্সট কন্টেন্ট */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 font-light">
                {post.content}
              </p>

              {/* কোড স্নিপেট ব্লক (যদি থাকে) */}
              {post.hasCode && (
                <div className="bg-[#05060b] border border-gray-900 rounded-xl p-3 mb-4 flex items-center gap-2.5 font-mono text-[11px] text-[#7c7fff] overflow-x-auto">
                  <Code size={14} className="text-gray-600 shrink-0" />
                  <span className="select-all">{post.codeSnippet}</span>
                </div>
              )}
            </div>

            {/* বটম অ্যাকশন প্যানেল */}
            <div className="flex items-center justify-between border-t border-gray-900/60 pt-3 mt-2 text-gray-500">
              <div className="flex items-center gap-5">
                {/* লাইক বাটন */}
                <button className={`flex items-center gap-1.5 text-xs font-medium hover:text-rose-500 transition-colors ${post.isLiked ? "text-rose-500" : ""}`}>
                  <Heart size={15} className={post.isLiked ? "fill-rose-500" : ""} />
                  <span>{post.likes}</span>
                </button>
                {/* কমেন্ট বাটন */}
                <button className="flex items-center gap-1.5 text-xs font-medium hover:text-[#6366F1] transition-colors">
                  <MessageSquare size={15} />
                  <span>{post.comments}</span>
                </button>
                {/* শেয়ার বাটন */}
                <button className="flex items-center gap-1.5 text-xs font-medium hover:text-emerald-500 transition-colors">
                  <Share2 size={15} />
                </button>
              </div>

              {/* সেভ বুকমার্ক */}
              <button className="hover:text-amber-500 transition-colors">
                <Bookmark size={15} />
              </button>
            </div>

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}