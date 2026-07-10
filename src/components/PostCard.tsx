'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function PostCard({ post }: { post: any }) {
  return (
    <motion.div 
      // কার্ডের ইন্ট্রো এবং হোভার অ্যানিমেশন
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col hover:border-slate-700/80 transition-colors duration-300 shadow-2xl backdrop-blur-sm"
    >
      
      {/* ১. পোস্ট ইমেজ সেকশন */}
      {post.contentImage && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img 
            src={post.contentImage} 
            alt={post.tag || "Post image"} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {post.tag && (
            <span className="absolute top-3 right-3 bg-slate-950/80 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm tracking-wide">
              {post.tag}
            </span>
          )}
        </div>
      )}

      {/* ২. কার্ড বডি কন্টেন্ট */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* ইউজারের প্রোফাইল ইনফো */}
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={post.avatar} 
            alt={post.authorName} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800"
          />
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{post.authorName}</h3>
            <span className="text-xs text-slate-500 font-medium capitalize">{post.category}</span>
          </div>
        </div>

        {/* পোস্টের মূল কন্টেন্ট (line-clamp-2 সহ) */}
        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line mb-6 line-clamp-2 min-h-[40px]">
          {post.content}
        </p>

        {/* ৩. অ্যাকশন বাটন সেকশন (Like এবং Details) */}
        <div className="border-t border-slate-800/60 pt-4 mt-auto flex items-center justify-between">
          
          {/* লাইক বাটন */}
          <button 
            className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors duration-200 group focus:outline-none"
            type="button"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8} 
              stroke="currentColor" 
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
              />
            </svg>
            <span className="text-xs font-medium">Like</span>
          </button>

          {/* নতুন Details বাটন */}
          <button
            type="button"
            className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-blue-400 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none"
          >
            Details
          </button>

        </div>

      </div>
    </motion.div>
  )
}