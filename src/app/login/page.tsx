"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // ⚡ Better-Auth সাইন-ইন মেথড কল করা
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/", // সফল লগইন শেষে হোম পেজে রিডাইরেক্ট করবে
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌌 ব্যাকগ্রাউন্ড নিওন অরবিট গ্লো */}
      <div className="absolute w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[150px] -top-20 -right-20 pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#5D3EBC]/10 rounded-full blur-[130px] -bottom-20 -left-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#0b0c16]/80 backdrop-blur-md border border-[#161624] p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-10"
      >
        {/* হেডার */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#12112a] border border-[#5D3EBC]/30 px-3 py-1 rounded-full text-[10px] font-bold text-[#9295ff] tracking-wider uppercase mb-2">
            <Sparkles size={10} className="animate-pulse" /> Welcome Back
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Sync into Circle<span className="text-[#6366F1]">X</span></h2>
          <p className="text-xs text-gray-400 font-light">Enter your credentials to access the tech node</p>
        </div>

        {/* এরর মেসেজ ডিসপ্লে */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ✉️ ইমেইল ইনপুট */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="email" 
                required
                placeholder="alex@circlex.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#06060e] border border-[#161624] focus:border-[#5D3EBC] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors"
              />
            </div>
          </div>

          {/* 🔒 পাসওয়ার্ড ইনপুট */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#7c7fff] hover:underline font-medium">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#06060e] border border-[#161624] focus:border-[#5D3EBC] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors"
              />
            </div>
          </div>

          {/* ⚡ সাবমিট বাটন */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(93,62,188,0.35)] disabled:opacity-50 disabled:cursor-not-allowed pt-0.5"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authorizing Node...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>

        {/* ফুটার ফুটনোট */}
        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          New to the grid?{" "}
          <Link href="/register" className="text-[#7c7fff] hover:underline font-bold">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}