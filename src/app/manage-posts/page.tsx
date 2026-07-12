'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { uploadImageToImgBB } from '@/lib/uploadToIamgeBB'
import { FaCamera, FaHeart, FaTrash } from 'react-icons/fa'

interface Post {
  _id: string
  title: string
  category: string
  content: string
  tag?: string
  contentImage?: string
  likes: number
}

export default function ManagePosts() {
  const { data: session } = useSession()
  const user = session?.user

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 🎛️ মোডাল স্টেটসমূহ
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // 📝 এডিট ফর্ম স্টেটসমূহ
  const [editTitle, setEditTitle] = useState<string>('')
  const [editContent, setEditContent] = useState<string>('')
  const [editCategory, setEditCategory] = useState<string>('Technology')
  const [editTag, setEditTag] = useState<string>('')
  const [editImage, setEditImage] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  // 🔄 ডাটা ফেচ করা
  const fetchUserPosts = async () => {
    if (!user?.email) return
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/my-posts?email=${user.email}`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load your posts.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserPosts()
  }, [user?.email])

  // 🗑️ ডিলিট মোডাল ট্রিগার
  const openDeleteModal = (post: Post) => {
    setSelectedPost(post)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedPost) return
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/delete-post/${selectedPost._id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      
      setPosts((prev) => prev.filter((p) => p._id !== selectedPost._id))
      toast.success(`Post deleted successfully! ${<FaTrash />}`)
    } catch (error) {
      console.error(error)
      toast.error("Could not delete the post.")
    } finally {
      setIsDeleteModalOpen(false)
      setSelectedPost(null)
    }
  }

  // 📝 এডিট মোডাল ট্রিগার
  const openEditModal = (post: Post) => {
    setSelectedPost(post)
    setEditTitle(post.title)
    setEditContent(post.content)
    setEditCategory(post.category)
    setEditTag(post.tag || '')
    setEditImage(post.contentImage || '')
    setIsEditModalOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    try {
      const uploadedUrl = await uploadImageToImgBB(file)
      if (uploadedUrl) {
        setEditImage(uploadedUrl)
        toast.success(`New image uploaded! ${<FaCamera />} `)
      }
    } catch (error) {
      toast.error("Image upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost) return
    if (!editTitle.trim() || !editContent.trim()) {
      toast.warn("Title and content cannot be empty!")
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/update-post/${selectedPost._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          category: editCategory,
          tag: editTag,
          contentImage: editImage
        })
      })

      if (!response.ok) throw new Error('Failed to update')
      
      toast.success("Post updated successfully! ")
      setIsEditModalOpen(false)
      fetchUserPosts() // রিফ্রেশ ডাটা
    } catch (error) {
      console.error(error)
      toast.error("Failed to update post.")
    } finally {
      setIsUpdating(false)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">Please log in first.</div>
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 pt-16 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* হেডার */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Manage Your Posts</h1>
            <p className="text-xs text-slate-400 mt-1">Total {posts.length} posts published.</p>
          </div>
          <Link href="/add-post">
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition">
              + Create New Post
            </button>
          </Link>
        </div>

        {/* টেবিল */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          {isLoading ? (
            <div className="p-12 text-center text-sm text-blue-400 animate-pulse font-medium">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="p-16 text-center text-slate-400 text-sm">No posts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="p-4 pl-6">Post Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Likes</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-900/20 transition duration-150">
                      <td className="p-4 pl-6 flex items-center space-x-4 max-w-md">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                          <img src={post.contentImage || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=150'} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate">
                          <span className="font-semibold text-slate-200 block truncate">{post.title || "Untitled Post"}</span>
                          <span className="text-xs text-slate-500 font-medium">{post.tag || '#general'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300">{post.category}</span>
                      </td>
                      <td className="p-4 text-slate-400"> <FaHeart /> {post.likes || 0}</td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button onClick={() => openEditModal(post)} className="text-xs font-medium text-amber-400 bg-amber-950/40 border border-amber-900/40 hover:bg-amber-900/40 px-3 py-1.5 rounded-lg transition">Edit</button>
                        <button onClick={() => openDeleteModal(post)} className="text-xs font-medium text-rose-400 bg-rose-950/40 border border-rose-900/40 hover:bg-rose-900/40 px-3 py-1.5 rounded-lg transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 📥 ১. ডিলিট কনফার্মেশন মোডাল */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Delete Post?</h3>
              <p className="text-sm text-slate-400 mb-6">Are you sure you want to delete <span className="text-slate-200 font-semibold">"{selectedPost?.title}"</span>? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-xl hover:bg-rose-500 transition">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📥 ২. এডিট পোস্ট মোডাল */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl my-8">
              <h3 className="text-lg font-bold text-white mb-4">Edit Post</h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Post Title</label>
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Category</label>
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none">
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Education">Education</option>
                      <option value="Funny">Funny</option>
                      <option value="Motivation">Motivation</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Tag</label>
                    <input type="text" value={editTag} onChange={(e) => setEditTag(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Content</label>
                  <textarea rows={4} value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Cover Image</label>
                  <div className="flex items-center space-x-4 border border-dashed border-slate-800 bg-slate-950/40 rounded-xl p-3">
                    {editImage && <img src={editImage} alt="Preview" className="w-16 h-12 object-cover rounded-lg border border-slate-800" />}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer" />
                  </div>
                  {isUploading && <p className="text-xs text-blue-400 mt-1 animate-pulse">Uploading to ImgBB...</p>}
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition">Cancel</button>
                  <button type="submit" disabled={isUpdating || isUploading} className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition">{isUpdating ? 'Updating...' : 'Save Changes'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}