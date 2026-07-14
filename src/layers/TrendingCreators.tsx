'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform, animate, wrap } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const creators = [
  { id: 1, name: 'Alex Parker', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', category: 'Next.js Expert', followers: '12.5k' },
  { id: 2, name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', category: 'UI/UX Lead', followers: '9.2k' },
  { id: 3, name: 'Daniel Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', category: 'AI Researcher', followers: '15k' },
  { id: 4, name: 'Sophia Martinez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', category: 'Web3 Dev', followers: '7.8k' },
  { id: 5, name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', category: 'DevOps Architect', followers: '11.1k' },
  { id: 6, name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', category: 'CyberSec Analyst', followers: '19.4k' },
  { id: 7, name: 'Ryan Giggs', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', category: 'Rust Core Dev', followers: '22.3k' },
  { id: 8, name: 'Clara Oswald', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', category: 'Cloud Engineer', followers: '8.9k' },
]

const CARD_WIDTH = 260 // px — fixed width keeps the marquee math predictable
const CARD_GAP = 20 // px

function CreatorCard({ creator }: { creator: (typeof creators)[number] }) {
  return (
    <div
      className="shrink-0 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-lg shadow-xl hover:border-slate-700/40 hover:bg-slate-900/80 transition-colors duration-300"
      style={{ width: CARD_WIDTH, marginRight: CARD_GAP }}
    >
      <div className="flex items-center space-x-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          width={64}
          height={64}
          draggable={false}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-800 pointer-events-none"
        />
        <div>
          <h3 className="text-base font-semibold text-white">{creator.name}</h3>
          <p className="text-xs text-blue-400 mt-0.5">{creator.category}</p>
          {/* <p className="text-xs text-slate-500 mt-1">{creator.followers} followers</p> */}
        </div>
      </div>
    </div>
  )
}

export default function TrendingCreators() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // baseX is in percent-of-track units; drag directly mutates it, the animation
  // frame loop drifts it continuously, and `wrap` makes the loop seamless.
  const baseX = useMotionValue(0)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const dragState = useRef({ dragging: false, startClientX: 0, startBaseX: 0 })

  // ধারাবাহিক drift — এটাই আসল "স্মুথনেস": প্রতি ফ্রেমে ছোট্ট, স্থির গতিতে সরে,
  // কোনো ধাপে ধাপে snap/jump নেই
  useAnimationFrame((_t, delta) => {
    if (isPaused || dragState.current.dragging) return
    const percentPerSecond = 1.6 // ছোট = ধীর, মসৃণ ড্রিফট
    baseX.set(baseX.get() - percentPerSecond * (delta / 1000))
  })

  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current = { dragging: true, startClientX: e.clientX, startBaseX: baseX.get() }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return
    const trackWidth = trackRef.current?.offsetWidth || 1
    const deltaPercent = ((e.clientX - dragState.current.startClientX) / trackWidth) * 100
    baseX.set(dragState.current.startBaseX + deltaPercent)
  }

  const endDrag = () => {
    dragState.current.dragging = false
  }

  const nudge = (direction: 1 | -1) => {
    const trackWidth = trackRef.current?.offsetWidth || 1
    const cardPercent = ((CARD_WIDTH + CARD_GAP) / trackWidth) * 100
    animate(baseX, baseX.get() - direction * cardPercent, {
      type: 'spring',
      stiffness: 260,
      damping: 32,
    })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white tracking-wide">Trending Creators</h2>
        <button className="text-sm font-medium text-blue-400 hover:text-blue-300">View All</button>
      </div>

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* এজ ফেড — দুই পাশে হালকা করে মিলিয়ে যায়, একটা পালিশড ফিনিশ দেয় */}
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x, willChange: 'transform' }}
            className="flex cursor-grab active:cursor-grabbing select-none touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {/* কন্টেন্ট দুইবার রেন্ডার করা হয়েছে যাতে -50% থেকে 0% wrap টা নিখুঁতভাবে seamless হয় */}
            {[...creators, ...creators].map((creator, i) => (
              <CreatorCard key={`${creator.id}-${i}`} creator={creator} />
            ))}
          </motion.div>
        </div>

        {/* ⬅️➡️ ম্যানুয়াল নাজ — hover করলে দেখা যাবে */}
        <button
          aria-label="Previous"
          onClick={() => nudge(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next"
          onClick={() => nudge(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}