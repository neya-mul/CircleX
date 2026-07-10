'use client'

import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const features = [
  { icon: "⚡", title: "Blazing Fast Speed", desc: "Built on edge architectures, delivering content updates and network feeds at sub-millisecond ranges." },
  { icon: "🛡️", title: "Strict Type-Safety", desc: "Zero runtime breaks. Fully backed by end-to-end schemas keeping client networks secure." },
  { icon: "🤝", title: "Open Ecosystem", desc: "Share, fork, and adapt tech logs. Give back to the open source developer communities efficiently." },
  { icon: "📊", title: "Advanced Analytics", desc: "Track your post reach, reader engagement, and conversion metrics with a built-in premium dashboard." },
  { icon: "🎨", title: "Deep Customization", desc: "Tailor your profile and reading feed experience using our modular component architectures." },
  { icon: "🤖", title: "AI-Powered Insights", desc: "Get smart recommendations, auto-tagging, and content optimization tips driven by modern AI agents." }
];

export default function WhyCircleX() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
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
        }, 3000) // প্রতি ৩ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে
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
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Why CircleX?</h2>
        <p className="text-sm text-slate-400 mt-2">The ultimate knowledge ecosystem designed specifically for modern creators.</p>
      </div>

      <div ref={sliderRef} className="keen-slider cursor-grab active:cursor-grabbing">
        {features.map((item, index) => (
          <div key={index} className="keen-slider__slide bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-slate-700/50 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 font-bold text-lg">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}