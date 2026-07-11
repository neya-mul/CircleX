'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

export default function NotFound() {

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'hide-navbar-404'
    style.innerHTML = `
      nav {
        display: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.getElementById('hide-navbar-404')?.remove()
    }
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">

      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট — বাকি পেজগুলোর সাথে সামঞ্জস্যপূর্ণ */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* মেইন অ্যানিমেটেড কার্ড */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg bg-slate-900 bg-opacity-40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        <div className="p-10 md:p-14 flex flex-col items-center text-center">

          {/* আইকন — একটা ডিসকানেক্টেড নোড, "এই পোস্ট আর কানেক্টেড নেই" বোঝাতে */}
          <motion.div variants={itemVariants} className="mb-6 relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="w-20 h-20 text-slate-600 relative"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75a3 3 0 1 1 3.751 3.751m2.836 2.836A7.5 7.5 0 0 1 12 19.5c-4.142 0-7.5-3.358-7.5-7.5 0-1.516.45-2.928 1.223-4.107M4.5 4.5l15 15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0 1.03-.185 2.017-.524 2.93M17.303 6.197A7.475 7.475 0 0 1 19.5 12"
              />
            </svg>
          </motion.div>

          {/* ৪০৪ টাইপোগ্রাফি */}
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3"
          >
            404
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl font-bold text-white tracking-wide mb-2">
            This page went off the feed
          </motion.h2>

          <motion.p variants={itemVariants} className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8">
            The post or page you're looking for may have been removed, renamed, or never existed on CircleX.
          </motion.p>

          {/* অ্যাকশন বাটন */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href="/explore" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none shadow-lg shadow-blue-900/30"
              >
                Back to Explore
              </button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 bg-opacity-30 hover:bg-opacity-80 border border-slate-800 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none"
              >
                Go Home
              </button>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}