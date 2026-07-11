'use client'

import React from 'react'
import { Zap, ShieldCheck, GitFork, BarChart3, Palette, BrainCircuit, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Feature = {
  icon: LucideIcon
  title: string
  desc: string
  /** Give the first feature more visual weight in the grid */
  featured?: boolean
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Blazing Fast Speed',
    desc: 'Built on edge architectures, delivering content updates and network feeds at sub-millisecond ranges — your feed never feels like it is loading.',
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: 'Strict Type-Safety',
    desc: 'Zero runtime breaks. Fully backed by end-to-end schemas keeping client networks secure.',
  },
  {
    icon: GitFork,
    title: 'Open Ecosystem',
    desc: 'Share, fork, and adapt tech logs. Give back to the open source developer communities efficiently.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    desc: 'Track your post reach, reader engagement, and conversion metrics with a built-in premium dashboard.',
  },
  {
    icon: Palette,
    title: 'Deep Customization',
    desc: 'Tailor your profile and reading feed experience using our modular component architectures.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Insights',
    desc: 'Get smart recommendations, auto-tagging, and content optimization tips driven by modern AI agents.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className={`group relative overflow-hidden bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-xl hover:border-slate-700/60 hover:bg-slate-900/60 transition-colors duration-300 ${
        feature.featured
          ? 'md:col-span-2 p-8 flex flex-col justify-between'
          : 'p-6'
      }`}
    >
      {/* কার্ডের কোণে হালকা গ্লো — শুধু হোভারে দেখা যায় */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-2xl transition-colors duration-500" />

      <div className="relative">
        <div
          className={`rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 ${
            feature.featured ? 'w-14 h-14' : 'w-10 h-10'
          }`}
        >
          <Icon size={feature.featured ? 26 : 20} strokeWidth={2} />
        </div>
        <h3 className={`font-semibold text-white mb-2 ${feature.featured ? 'text-2xl' : 'text-lg'}`}>
          {feature.title}
        </h3>
        <p className={`text-slate-400 leading-relaxed ${feature.featured ? 'text-sm max-w-md' : 'text-sm'}`}>
          {feature.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyCircleX() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Why CircleX?</h2>
        <p className="text-sm text-slate-400 mt-2">
          The ultimate knowledge ecosystem designed specifically for modern creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </div>
  )
}