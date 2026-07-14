"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// 🧪 Demo credentials — make sure this account exists in your DB
const DEMO_CREDENTIALS = {
  email: "demo@circlex.com",
  password: "Demo@1234",
};

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // 🔐 Shared sign-in logic so both the form and the demo button use the same path
  const signIn = async (email: string, password: string) => {
    setErrorMsg("");
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      throw new Error(error.message || "Invalid email or password");
    }

    router.push("/");
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ Demo login — fills the form AND logs in immediately
  const handleDemoLogin = async () => {
    setFormData(DEMO_CREDENTIALS);
    setDemoLoading(true);
    try {
      await signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    } catch (err: any) {
      setErrorMsg(err.message || "Demo account is currently unavailable.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060e] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[150px] -top-20 -right-20 pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#5D3EBC]/10 rounded-full blur-[130px] -bottom-20 -left-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#0b0c16]/80 backdrop-blur-md border border-[#161624] p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-10"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#12112a] border border-[#5D3EBC]/30 px-3 py-1 rounded-full text-[10px] font-bold text-[#9295ff] tracking-wider uppercase mb-2">
            <Sparkles size={10} className="animate-pulse" /> Welcome Back
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Sync into Circle<span className="text-[#6366F1]">X</span></h2>
          <p className="text-xs text-gray-400 font-light">Enter your credentials to access the tech node</p>
        </div>

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

        {/* ⚡ Demo Login Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={handleDemoLogin}
          disabled={demoLoading || loading}
          className="w-full h-11 mb-5 bg-[#12112a] border border-[#5D3EBC]/40 hover:border-[#5D3EBC] text-[#9295ff] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {demoLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Logging into demo...
            </>
          ) : (
            <>
              <Zap size={14} />
              Try Demo Account
            </>
          )}
        </motion.button>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-[#161624]" />
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">or sign in manually</span>
          <div className="h-px flex-1 bg-[#161624]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#06060e] border border-[#161624] focus:border-[#5D3EBC] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

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