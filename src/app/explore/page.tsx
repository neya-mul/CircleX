import PostCard from '@/components/PostCard'
import ExploreFilters from '@/components/ExploreFilters'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/allData/all-posts'
import React from 'react'

interface ExploreProps {
  searchParams: Promise<{ search?: string; category?: string; page?: string; sortBy?: string }>
}

export default async function Explore({ searchParams }: ExploreProps) {
  const { search = '', category = 'all', page = '1', sortBy = 'newest' } = await searchParams

  const data = await getAllPosts({
    search,
    category,
    page: Number(page) || 1,
    limit: 8,
    sortBy,
  })

  if (!data || !Array.isArray(data.posts)) {
    return <div className="p-4 text-red-500 text-center">Failed to load posts.</div>
  }

  const { posts, totalPages, currentPage } = data

  return (
    <div className="mx-auto p-6 min-h-screen">
      <ExploreFilters />

      {/* পোস্ট গ্রিড লেআউট */}
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No posts found matching your search.
        </div>
      ) : (
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post: any, ind: number) => (
            <PostCard key={post._id || ind} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
        category={category}
      />
    </div>
  )
}