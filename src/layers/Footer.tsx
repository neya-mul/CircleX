"use client";

import Link from "next/link";
import {  Mail, Phone, MapPin, ArrowUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // উপরে স্ক্রোল করার ফাংশন
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#05060b] border-t border-[#161624] pt-12 pb-6 px-4 sm:px-8 relative overflow-hidden mt-12">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#5D3EBC]/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-900/60 relative z-10">
        
        {/* 🚀 কলাম ১: ব্র্যান্ড ইনফো */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5D3EBC] to-[#6366F1] flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              C
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Circle<span className="text-[#6366F1]">X</span></span>
          </div>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-light">
            The ultimate decentralized hub for creators, developers, and tech-enthusiasts to sync minds and push boundaries.
          </p>
          
          {/* সোশ্যাল হ্যান্ডেলসমূহ (Working External Links) */}
          <div className="flex items-center gap-3 pt-2">
            <motion.a whileHover={{ y: -2, color: "#fff" }} href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaGithub size={16} />

            </motion.a>
            <motion.a whileHover={{ y: -2, color: "#1DA1F2" }} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaXTwitter  size={16} />
            </motion.a>
            <motion.a whileHover={{ y: -2, color: "#0077B5" }} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaLinkedinIn size={16} />
            </motion.a>
          </div>
        </div>

        {/* 🔗 কলাম ২: প্ল্যাটফর্ম রুটস (Working Internal Links) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Platform</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li><Link href="/" className="hover:text-[#7c7fff] transition-colors">Home Feed</Link></li>
            <li><Link href="/explore" className="hover:text-[#7c7fff] transition-colors">Explore</Link></li>
            <li><Link href="/trending" className="hover:text-[#7c7fff] transition-colors">Trending</Link></li>
          </ul>
        </div>

        {/* 📑 কলাম ৩: লিগ্যাল লিংকস (Working Links) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Legal</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li><Link href="/privacy" className="hover:text-[#7c7fff] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#7c7fff] transition-colors">Terms of Use</Link></li>
            <li><Link href="/cookies" className="hover:text-[#7c7fff] transition-colors">Cookie Settings</Link></li>
          </ul>
        </div>

        {/* 📞 কলাম ৪: কন্টাক্ট ইনফরমেশন */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Contact Support</h4>
          <ul className="space-y-2.5 text-xs text-gray-400 font-light">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#6366F1]" />
              <a href="mailto:support@circlex.com" className="hover:text-white transition-colors">support@circlex.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-emerald-500" />
              <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-2.5 items-start">
              <MapPin size={14} className="text-rose-500 mt-0.5 shrink-0" />
              <span>Grid Node 7, Cyber Cluster,<br />Silicon Valley, CA</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 🔒 বটম কপিরাইট ও ব্যাক-টু-টপ বাটন */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-medium relative z-10">
        <div className="flex items-center gap-1">
          <span>&copy; {currentYear} CircleX Inc. All rights reserved.</span>
          <Sparkles size={10} className="text-[#5D3EBC]" />
        </div>
        
        {/* ব্যাক টু টপ অ্যাকশন বাটন */}
        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0e1a] border border-gray-900 rounded-xl text-gray-400 hover:text-white hover:border-[#5D3EBC]/50 transition-all text-[10px]"
        >
          <span>Back to Top</span>
          <ArrowUp size={12} />
        </motion.button>
      </div>
    </footer>
  );
}