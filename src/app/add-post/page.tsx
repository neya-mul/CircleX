'use client'

import React, { useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { motion } from 'framer-motion'
import { uploadImageToImgBB } from '@/lib/uploadToIamgeBB'
import { toast } from 'react-toastify'
import { Camera } from 'lucide-react'
import { FaCamera } from 'react-icons/fa'
import { getToken } from '@/lib/generateToken'

export default function AddPost() {


    const { data: session } = useSession()
    const user = session?.user

    // টাইটেলের জন্য স্টেটসমূহ
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [tag, setTag] = useState<string>('')
    const [category, setCategory] = useState<string>('Technology')
    const [contentImage, setContentImage] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    // const [token, setToken] = useState<string>('')



    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const uploadedUrl = await uploadImageToImgBB(file)
            if (uploadedUrl) {
                setContentImage(uploadedUrl)
                toast.success(`Image uploaded successfully! `)
            }
        } catch (error) {
            console.error("Image upload failed:", error)
            toast.error("Failed to upload image. Try again.")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()


        const token = await getToken()
        // 📝 ভ্যালিডেশনে টোস্ট নোটিফিকেশন যুক্ত করা হলো
        if (!user) {
            toast.warn('Please log in first to create a post!')
            return
        }
        if (!title.trim()) {
            toast.warn('Post title cannot be empty!')
            return
        }
        if (!content.trim()) {
            toast.warn('Post content cannot be empty!')
            return
        }

        setIsSubmitting(true)

        const postData = {
            title,
            authorName: user?.name,
            authorEmail: user?.email, // 👈 এটি অবশ্যই যোগ করবেন যাতে ManagePosts ফিল্টার করতে পারে
            avatar: user?.image || 'https://api.dicebear.com/7.x/avataaars/svg',
            category,
            content,
            contentImage,
            tag: tag.startsWith('#') ? tag : tag ? `#${tag}` : '',
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/add-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            })

            if (!response.ok) throw new Error('Failed to create post')

            // 🎉 সাকসেস টোস্ট
            toast.success('Post created successfully! ')

            // ফর্ম রিসেট
            setTitle('')
            setContent('')
            setTag('')
            setContentImage('')
        } catch (error) {
            console.error(error)
            // ❌ এরর টোস্ট
            toast.error('Something went wrong. Could not save the post.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12 text-slate-200">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md"
            >
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-2">Create New Post</h2>
                <p className="text-xs text-slate-400 mb-6">Share your knowledge or tech insights with the CircleX community.</p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* নতুন পোস্ট টাইটেল ইনপুট ফিল্ড */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Post Title</label>
                        <input
                            type="text"
                            placeholder="Give your post a catchy title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition duration-200"
                        />
                    </div>

                    {/* ক্যাটাগরি এবং ট্যাগ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition duration-200"
                            >
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Education">Education</option>
                                <option value="Funny">Funny</option>
                                <option value="Motivation">Motivation</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Tag (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g., react, opensource"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition duration-200"
                            />
                        </div>
                    </div>

                    {/* পোস্ট কন্টেন্ট */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">What's on your mind?</label>
                        <textarea
                            rows={4}
                            placeholder="Write your content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition duration-200 resize-none"
                        />
                    </div>

                    {/* ইমেজ আপলোড */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Cover Image</label>
                        <div className="relative border border-dashed border-slate-800 bg-slate-950/40 rounded-xl p-4 flex flex-col items-center justify-center transition hover:border-slate-700/60">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                disabled={isUploading || isSubmitting}
                            />
                            {isUploading ? (
                                <p className="text-sm text-blue-400 font-medium animate-pulse">Uploading image to ImgBB...</p>
                            ) : contentImage ? (
                                <div className="w-full relative h-40 rounded-lg overflow-hidden border border-slate-800">
                                    <img src={contentImage} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setContentImage(''); }}
                                        className="absolute top-2 right-2 bg-rose-950/80 border border-rose-900 text-rose-400 p-1.5 rounded-md text-xs font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center space-y-1 flex items-center gap-2">
                                    <span className="text-xl"><Camera /></span>
                                    <p className="text-md font-medium text-slate-300">Click to upload image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading || !user}
                            className="w-full flex items-center justify-center py-3 px-4 font-semibold text-sm rounded-xl text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all duration-200"
                        >
                            {!user ? 'Please Login to Post' : isSubmitting ? 'Creating Post...' : 'Publish Post'}
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    )
}