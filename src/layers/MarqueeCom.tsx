'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const marqueeTags = [
  "Next.js 15", "React Server Components", "Tailwind v4", "Rust Language", 
  "Cybersecurity", "Web3 Scaling", "Solana", "AI Agents", "Database Indexing", 
  "Framer Motion", "Open Source Contribution", "SaaS Development", "GraphQL API", 
  "TypeScript 5", "Docker Containers", "Kubernetes", "Redis Caching", "Prisma ORM"
];

export default function TagMarquee() {
  return (
    <div className="w-full bg-slate-950/40 border-y border-slate-800/50 py-4 relative">
      <Marquee 
        speed={45} // স্পিড সামান্য বাড়ানো হয়েছে কন্টেন্ট বেশি থাকায়
        gradient={true} 
        gradientColor="#090d16" 
        gradientWidth={80}
        pauseOnHover={true}
      >
        {marqueeTags.map((tag, idx) => (
          <span 
            key={idx} 
            className="mx-4 text-sm font-semibold text-slate-400 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-full shadow-inner cursor-pointer hover:text-blue-400 hover:border-blue-900/50 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </Marquee>
    </div>
  )
}