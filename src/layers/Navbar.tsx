"use client";

import { useState } from "react";
import { Bell, Search, Menu, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle true/false to test
  const [isOpen, setIsOpen] = useState(false);

  // ৫টি রুট (Logged In) বনাম ৩টি রুট (Logged Out)
  const navLinks = isLoggedIn
    ? [
        { name: "Home", href: "#" },
        { name: "Explore", href: "#" },
        { name: "Add Post", href: "#" },
        { name: "Manage Posts", href: "#" },
        { name: "Analytics", href: "#" },
      ]
    : [
        { name: "Home", href: "#" },
        { name: "Explore", href: "#" },
        { name: "Trending", href: "#" },
      ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-16 bg-[#06060e]/80 backdrop-blur-md border-b border-[#161624] sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between"
    >
      {/* লোগো */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5D3EBC] to-[#6366F1] flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          C
        </div>
        <span className="text-lg font-bold text-white tracking-tight">CircleX</span>
      </div>

      {/* ডেস্কটপ মেনু লিংকস */}
      <div className="hidden md:flex items-center gap-1.5 bg-[#0d0e1a] p-1 rounded-xl border border-gray-950">
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              index === 0 ? "bg-[#1d1b3c] text-[#7c7fff]" : "text-gray-400 hover:text-white"
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* রাইট অ্যাকশন বাটন */}
      <div className="hidden md:flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Search size={18} />
        </button>
        <button className="relative p-1.5 text-gray-400 hover:text-white bg-[#0d0e1a] border border-gray-900 rounded-lg">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#5D3EBC] rounded-full"></span>
        </button>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-2 bg-[#0d0e1a] border border-gray-900 pr-3 pl-1.5 py-1 rounded-xl">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-bold text-gray-300">Alex Parker</span>
          </div>
        ) : (
          <button className="bg-[#5D3EBC] text-white text-xs font-bold px-4 py-2 rounded-xl">Login</button>
        )}
      </div>

      {/* মোবাইল মেনু টগল */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* মোবাইল ড্রপডাউন */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full bg-[#06060e] border-b border-[#161624] p-4 flex flex-col gap-3 md:hidden"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-white py-1">{link.name}</a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}