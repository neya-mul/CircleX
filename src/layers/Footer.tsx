"use client";

import Link from "next/link";
import { Mail, ArrowUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../public/Images/logo.png';

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
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 group relative p-1">
            {/* 🌌 ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/5 to-indigo-600/20 blur-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

            {/* 🎨 মাস্কড লোগো কন্টেইনার */}
            <div
              className="h-9 w-36 relative bg-gradient-to-r from-blue-600 via-indigo-400 via-cyan-400 to-blue-600 animate-gradient-flow transform group-hover:scale-[1.03] transition-all duration-300"
              style={{
                maskImage: `url(${logo.src || logo})`,
                WebkitMaskImage: `url(${logo.src || logo})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'left center',
                WebkitMaskPosition: 'left center',
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.2))'
              }}
            >
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-laser-shine" />
            </div>
          </Link>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed font-light">
            The ultimate decentralized hub for creators, developers, and tech-enthusiasts to sync minds and push boundaries.
          </p>

          {/* সোশ্যাল হ্যান্ডেলসমূহ */}
          <div className="flex items-center gap-3 pt-2">
            <motion.a whileHover={{ y: -2, color: "#fff" }} href="https://github.com/neya-mul" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaGithub size={16} />
            </motion.a>
            {/* <motion.a whileHover={{ y: -2, color: "#1DA1F2" }} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaXTwitter size={16} />
            </motion.a> */}
            <motion.a whileHover={{ y: -2, color: "#0077B5" }} href="https://linkedin.com/in/neya-mul" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaLinkedinIn size={16} />
            </motion.a>
            <motion.a whileHover={{ y: -2, color: "#25D366" }} href="https://wa.me/8801874062550" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0d0e1a] border border-gray-950 rounded-xl text-gray-400 transition-colors">
              <FaWhatsapp size={16} />
            </motion.a>
          </div>
        </div>

        {/* 🔗 কলাম ২: প্ল্যাটফর্ম রুটস (অ্যাডজাস্টেড গ্রিড স্পেস) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Platform</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li><Link href="/" className="hover:text-[#7c7fff] transition-colors">Home Feed</Link></li>
            <li><Link href="/explore" className="hover:text-[#7c7fff] transition-colors">Explore</Link></li>
          </ul>
        </div>

        {/* 📞 কলাম ৩: কন্টাক্ট ইনফরমেশন (সরাসরি মেলিং ফাংশনসহ) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Contact Support</h4>
          <ul className="space-y-2.5 text-xs text-gray-400 font-light">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#6366F1]" />
              <a href="mailto:neyamulislam946@gmail.com" className="hover:text-white transition-colors">neyamulislam946@gmail.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt size={12} className="text-emerald-500" />
              <a href="tel:+8801874062550" className="hover:text-white transition-colors">+880 1874-062550</a>
            </li>
            <li className="flex gap-2.5 items-start">
              <FaMapMarkerAlt size={14} className="text-rose-500 mt-0.5 shrink-0" />
              <span>Munshiganj, Dhaka,<br />Bangladesh</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 🔒 বটম কপিরাইট, ক্রেডিট ও ব্যাক-টু-টপ বাটন */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-medium relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1">
            <span>&copy; {currentYear} CircleX Inc. All rights reserved.</span>
            <Sparkles size={10} className="text-[#5D3EBC]" />
          </div>
          {/* ✏️ ক্রিয়েটর ক্রেডিট এবং পোর্টফোলিও লিংক */}
          <span className="hidden sm:inline text-gray-700">|</span>
          <span>
            Created by{" "}
            <a 
              href="https://neyamulfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold hover:underline"
            >
              Neaymul Islam
            </a>
          </span>
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