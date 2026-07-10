import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/allData/all-posts'
import React from 'react'

export default async function Explore() {
  const posts = await getAllPosts()

  // ডাটা সেফটি চেক (ডাটা না আসলে যেন ক্র্যাশ না করে)
  if (!posts || !Array.isArray(posts)) {
    return <div className="p-4 text-red-500 text-center">Failed to load posts.</div>
  }

  return (
    <div className=" mx-auto p-6 min-h-screen ">
      
      {/* হেডার এবং ক্যাটাগরি ফিল্টার ড্রপডাউন সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Explore Feed</h1>
          <p className="text-sm text-gray-400 mt-1">Discover trending updates across platforms</p>
        </div>

        {/* ড্রপডাউন মেনু (ফাংশনালিটি ছাড়া) */}
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-400">
            Filter by:
          </label>
          <select
            id="category"
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="education">Education</option>
            <option value="funny">Funny</option>
            <option value="motivation">Motivation</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      {/* পোস্ট গ্রিড লেআউট */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          posts.map((post: any, ind: number) => (
            <PostCard key={ind} post={post} />
          ))
        }
      </div>

    </div>
  )
}