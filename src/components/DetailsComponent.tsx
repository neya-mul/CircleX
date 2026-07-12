'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface PostProps {
  post: {
    _id: string;
    authorName: string;
    avatar: string;
    category: string;
    tag: string;
    content: string;
    contentImage?: string;
    likes?: number;
    likedBy?: string[];
  }
}

export default function DetailsComponent({ post }: PostProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user;

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(post.likes || 0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 🔑 সেশন লোড হওয়ার পর isLiked স্টেট সিঙ্ক করা (PostCard-এর মতোই)
  useEffect(() => {
    if (user?.id && Array.isArray(post.likedBy)) {
      setIsLiked(post.likedBy.includes(user.id))
    }
  }, [user?.id, post.likedBy])

  const handleLike = async () => {
    // 🔒 সিকিউরিটি গার্ড: ইউজার লগইন না করে থাকলে লাইক দিতে পারবে না
    if (!user) {
      toast.error("Please log in to like this post!");
      return;
    }

    if (isLoading) return

    // অপটিমিস্টিক আপডেট
    const originalLikedState = isLiked
    const originalLikeCount = likeCount

    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const updatedData = await response.json()

      if (updatedData && typeof updatedData.isLikedNow !== 'undefined') {
        setIsLiked(updatedData.isLikedNow)
      }

      if (updatedData && typeof updatedData.currentLikes !== 'undefined') {
        setLikeCount(updatedData.currentLikes)
      }

    } catch (error) {
      console.error("Database update failed, rolling back:", error)
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ টাইপস্ক্রিপ্ট এরর এড়াতে Variants টাইপ ডিফাইন করা হয়েছে
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

      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* মেইন অ্যানিমেটেড কার্ড */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl bg-slate-900 bg-opacity-40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        {/* ১. ইমেজ সেকশন */}
        {post.contentImage && (
          <motion.div variants={itemVariants} className="relative h-[300px] md:h-[420px] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
            <img
              src={post.contentImage}
              alt={post.tag || "Cover image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

            <span className="absolute bottom-6 left-6 md:left-10 bg-blue-600 bg-opacity-20 text-blue-400 border border-blue-500 border-opacity-30 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
              {post.category}
            </span>
          </motion.div>
        )}

        {/* ২. কন্টেন্ট বডি */}
        <div className="p-6 md:p-10">

          {/* অথর ইনফো */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.avatar}
                alt={post.authorName}
                className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-800 ring-opacity-50 shadow-inner"
              />
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">{post.authorName}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Published on CircleX Platform</p>
              </div>
            </div>

            {post.tag && (
              <div className="self-start md:self-center">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  #{post.tag.replace(/\s+/g, '')}
                </span>
              </div>
            )}
          </motion.div>

          {/* পোস্ট কন্টেন্ট */}
          <motion.article variants={itemVariants} className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-line font-light tracking-wide">
              {post.content}
            </p>
          </motion.article>

          {/* ৩. অ্যাকশন বাটন প্যানেল */}
          <motion.div variants={itemVariants} className="border-t border-slate-800 pt-6 mt-8 flex items-center justify-between">

            {/* লাইক বাটন — updated design */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              disabled={isLoading}
              className={`relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl border transition-all duration-300 group focus:outline-none overflow-hidden ${isLiked
                ? 'text-rose-300 border-rose-500/40 bg-gradient-to-br from-rose-500/20 to-pink-500/10 shadow-[0_0_20px_-5px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 border-slate-800 bg-slate-800/50 hover:border-rose-900/50 hover:bg-rose-950/20 hover:text-rose-400'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="button"
            >
              <motion.svg
                key={isLiked ? 'liked' : 'unliked'}
                initial={{ scale: 1 }}
                animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                xmlns="http://www.w3.org/2000/svg"
                fill={isLiked ? 'currentColor' : 'none'}
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
              </motion.svg>

              <AnimatePresence mode="popLayout">
                <motion.span
                  key={likeCount}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium"
                >
                  {likeCount > 0 ? `${likeCount} ` : ''}{likeCount === 1 ? 'Like' : 'Likes'}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* ব্যাক বাটন — now navigates back */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              type="button"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 bg-opacity-30 hover:bg-opacity-80 border border-slate-800 rounded-xl transition-all duration-200 focus:outline-none"
            >
              Back to Feed
            </motion.button>

          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}