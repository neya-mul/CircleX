'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from '@/lib/auth-client'

export default function PostCard({ post }: { post: any }) {
  const { data: session } = useSession()
  const user = session?.user;

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(post.likes || 0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  // 🔑 সেশন লোড হওয়ার পর (বা likedBy পরিবর্তন হলে) isLiked স্টেট সিঙ্ক করা
  // useState-এর initial value শুধু প্রথম রেন্ডারে কাজ করে, কিন্তু useSession()
  // সাধারণত অ্যাসিঙ্ক্রোনাসভাবে রেজলভ হয় — তাই useEffect দিয়ে সিঙ্ক করা প্রয়োজন
  useEffect(() => {
    if (user?.id && Array.isArray(post.likedBy)) {
      setIsLiked(post.likedBy.includes(user.id))
    }
  }, [user?.id, post.likedBy])

  // লাইক হ্যান্ডলার ফাংশন
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()

    // 🔒 সিকিউরিটি গার্ড: ইউজার লগইন না করে থাকলে লাইক দিতে পারবে না
    if (!user) {
      alert("Please log in to like this post!");
      return;
    }

    if (isLoading) return // ডাবল রিকোয়েস্ট লক করার জন্য

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)

    // অপটিমিস্টিক আপডেট
    const originalLikedState = isLiked
    const originalLikeCount = likeCount

    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    setIsLoading(true)

    try {
      // 🌐 নেটিভ fetch দিয়ে PATCH রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id // ব্যাকএন্ডের ট্র্যাকিংয়ের জন্য ইউজারের আইডি পাঠানো হলো
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const updatedData = await response.json()

      // ব্যাকএন্ড যদি কারেন্ট স্ট্যাটাস রিটার্ন করে, তার সাথে সিঙ্ক করা
      if (updatedData && typeof updatedData.isLikedNow !== 'undefined') {
        setIsLiked(updatedData.isLikedNow)
      }

      // 🔄 লাইক কাউন্টও সার্ভারের প্রকৃত ভ্যালুর সাথে সিঙ্ক করা হচ্ছে
      if (updatedData && typeof updatedData.currentLikes !== 'undefined') {
        setLikeCount(updatedData.currentLikes)
      }

    } catch (error) {
      console.error("Database update failed, rolling back:", error)
      // ❌ এরর হলে আগের ফ্রন্টএন্ড স্টেটে ফিরে যাবে
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col hover:border-slate-700/80 transition-colors duration-300 shadow-2xl backdrop-blur-sm"
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

        {/* পোস্টের মূল কন্টেন্ট */}
        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line mb-6 line-clamp-2 min-h-[40px]">
          {post.content}
        </p>

        {/* ৩. অ্যাকশন বাটন সেকশন */}
        <div className="border-t border-slate-800/60 pt-4 mt-auto flex items-center justify-between">

          {/* লাইক বাটন */}
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center space-x-2 transition-colors duration-200 group focus:outline-none ${
              isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-200 ${
                isAnimating ? 'scale-125' : 'group-hover:scale-110'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="text-xs font-medium">
              {likeCount > 0 ? `${likeCount} ` : ''}{likeCount === 1 ? 'Like' : 'Likes'}
            </span>
          </button>

          {/* Details বাটন */}
          <Link href={`/details/${post._id}`}>
            <button
              type="button"
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-blue-400 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 rounded-lg transition-all duration-200 active:scale-95 focus:outline-none"
            >
              Details
            </button>
          </Link>

        </div>

      </div>
    </motion.div>
  )
}