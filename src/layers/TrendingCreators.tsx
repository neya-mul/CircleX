'use client'

import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const creators = [
  { id: 1, name: 'Alex Parker', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', category: 'Next.js Expert', followers: '12.5k' },
  { id: 2, name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', category: 'UI/UX Lead', followers: '9.2k' },
  { id: 3, name: 'Daniel Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', category: 'AI Researcher', followers: '15k' },
  { id: 4, name: 'Sophia Martinez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', category: 'Web3 Dev', followers: '7.8k' },
  { id: 5, name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', category: 'DevOps Architect', followers: '11.1k' },
  { id: 6, name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', category: 'CyberSec Analyst', followers: '19.4k' },
  { id: 7, name: 'Ryan Giggs', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', category: 'Rust Core Dev', followers: '22.3k' },
  { id: 8, name: 'Clara Oswald', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', category: 'Cloud Engineer', followers: '8.9k' },
];

export default function TrendingCreators() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2.2, spacing: 16 } },
      "(min-width: 1024px)": { slides: { perView: 3.5, spacing: 20 } },
      "(min-width: 1280px)": { slides: { perView: 4, spacing: 24 } },
    },
  }, [
    // 🔄 Auto-play Plugin Logic
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      function clear() {
        clearTimeout(timeout)
      }
      function next() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 2500) // এটি ২.৫ সেকেন্ড পর পর অটো স্লাইড হবে
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clear()
        })
        slider.container.addEventListener("mouseleave", () => {
          mouseOver = false
          next()
        })
        next()
      })
      slider.on("animationEnded", next)
      slider.on("updated", next)
    },
  ])

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white tracking-wide">Trending Creators</h2>
        <button className="text-sm font-medium text-blue-400 hover:text-blue-300">View All</button>
      </div>

      <div ref={sliderRef} className="keen-slider cursor-grab active:cursor-grabbing">
        {creators.map((creator) => (
          <div 
            key={creator.id}
            className="keen-slider__slide bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-lg shadow-xl hover:border-slate-700/40 transition duration-300"
          >
            {/* বাটন ছাড়া শুধু প্রোফাইল কার্ড ডিজাইন */}
            <div className="flex items-center space-x-4">
              <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-800" />
              <div>
                <h3 className="text-base font-semibold text-white">{creator.name}</h3>
                <p className="text-xs text-blue-400 mt-0.5">{creator.category}</p>
                <p className="text-xs text-slate-500 mt-1">{creator.followers} followers</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}