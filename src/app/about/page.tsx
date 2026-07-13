"use client";

import React from 'react';
import { Shield, Cpu, Zap, Sparkles, Orbit, RefreshCw, Activity } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Cross-Chain Speed", value: "< 2.4s" },
    { label: "Aggregated Liquidity", value: "$1.8B+" },
    { label: "Global Active Edge Nodes", value: "4,200+" },
  ];

  const pillars = [
    {
      icon: <Orbit size={24} className="text-cyan-400" />,
      title: "Omnichain Infrastructure",
      desc: "CircleX abstracts away network fragmentation. Instantly bridge assets and trigger logic across 15+ EVM and non-EVM layers in a single unified interface."
    },
    {
      icon: <RefreshCw size={24} className="text-blue-400" />,
      title: "Smart Order Routing (SOR)",
      desc: "Our proprietary algorithm dynamically splits and routes orders across multiple decentralized exchanges (DEXs) to guarantee absolute minimum slippage and zero MEV-bot frontrunning."
    },
    {
      icon: <Shield size={24} className="text-indigo-400" />,
      title: "Non-Custodial Sovereignty",
      desc: "Your keys, your protocol controls. Built on smart contract vaults that have been rigorously audited by top-tier cryptographic security firms."
    }
  ];

  return (
    <section className="w-full bg-[#05060b] text-gray-300 py-24 px-6 md:px-16 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* 🌌 Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#5D3EBC]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* 🚀 Left Content Block (6 Columns) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400">
              <Sparkles size={14} className="animate-pulse" />
              <span>The Next Evolution of DeFi</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
              Unifying Liquidity via{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                CircleX Core
              </span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl">
            CircleX is a next-generation decentralized liquidity hub and omnichain execution layer. Engineered to eliminate the complexities of fragmented Web3 finance, CircleX empowers traders and protocols with ultra-low latency execution, gas-optimized routing, and absolute capital efficiency.
          </p>

          {/* Pillars List */}
          <div className="space-y-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="flex gap-4 p-4 bg-[#0d0e1a]/40 border border-gray-800/40 rounded-2xl hover:border-gray-700/60 transition-colors">
                <div className="p-3 bg-[#05060b] border border-gray-800/80 rounded-xl h-max shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-100">{pillar.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 Right Visualization / Data Block (6 Columns) */}
        <div className="lg:col-span-6 relative flex flex-col justify-center items-center">
          {/* Cyberpunk Decorative Card Mesh */}
          <div className="w-full max-w-md p-8 bg-[#0d0e1a] border-2 border-[#161624] rounded-3xl relative overflow-hidden shadow-2xl shadow-black/80">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent blur-xl" />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-2 w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                <Activity size={16} className="text-cyan-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white">CircleX Live Network</h3>
              
              <div className="divide-y divide-gray-800/60 space-y-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} flex justify-between items-center`}>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.label}</span>
                    <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fake Live Status */}
              <div className="pt-2 flex items-center gap-2 justify-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                  Cross-Chain Settlement Active
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}