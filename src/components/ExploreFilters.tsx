'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const CATEGORIES = ['all', 'technology', 'design', 'education', 'funny', 'motivation', 'lifestyle', 'others']

export default function ExploreFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')

  // 🔎 ডিবাউন্স করা সার্চ — প্রতিটা কিস্ট্রোকে রিকোয়েস্ট না পাঠিয়ে
  // ইউজার টাইপ করা থামানোর ৪০০ms পর সার্চ ট্রিগার হবে
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams({ search: searchInput, page: '1' })
    }, 400)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ category: e.target.value, page: '1' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center border-b border-gray-800 pb-5 mb-8 gap-4">

      {/* টাইটেল — বাম পাশে */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Explore Feed</h1>
        <p className="text-sm text-gray-400 mt-1">Discover trending updates across platforms</p>
      </div>

      {/* 🔍 সার্চ ইনপুট — মাঝখানে, বড় সাইজে */}
      <div className="relative w-full lg:max-w-md lg:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search posts, authors, tags..."
          className="bg-gray-800 text-white border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
        />
        {isPending && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-blue-400 animate-pulse">
            Searching…
          </span>
        )}
      </div>

      {/* ড্রপডাউন মেনু — ডান পাশে */}
      <div className="flex items-center gap-2 lg:justify-end">
        <label htmlFor="category" className="text-sm font-medium text-gray-400 whitespace-nowrap">
          Filter by:
        </label>
        <select
          id="category"
          defaultValue={searchParams.get('category') || 'all'}
          onChange={handleCategoryChange}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}