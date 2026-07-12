'use client'

import React, { useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaPen } from 'react-icons/fa'

export default function Profile() {
  const { data: session } = useSession()
  const user = session?.user

  // 🎛️ এডিট মোডাল ও ফর্ম স্টেটসমূহ
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [editName, setEditName] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  // 🚪 লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      toast.success("Logged out successfully! See you soon. 👋")
      // আপনার signOut লজিক এখানে হবে
    } catch (error) {
      toast.error("Failed to log out.")
    }
  }

  // 📝 মোডাল ওপেন করার সময় কারেন্ট নাম সেট করা
  const openEditModal = () => {
    setEditName(user?.name || '')
    setIsEditModalOpen(true)
  }

  // 💾 প্রোফাইল আপডেট সাবমিট হ্যান্ডলার
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editName.trim()) {
      toast.warn("Name cannot be empty!")
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          name: editName
        })
      })

      if (!response.ok) throw new Error('Failed to update profile')
      
      const result = await response.json()
      if (result.success) {
        toast.success("Profile updated successfully! 🎉")
        setIsEditModalOpen(false)
        
        // 🔄 সেশন ডাটা ইনস্ট্যান্ট রিফ্রেশ করার জন্য পেজ রিলোড বা auth সেশন রিলোড দিন
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
      toast.error("Could not update profile. Try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-400 text-sm space-y-4">
        <p>You need to be logged in to view your profile.</p>
        <button onClick={() => window.location.href = '/login'} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">Go to Login</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12 text-slate-200 relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center space-y-6"
      >
        {/* হেডার ও এডিট বাটন */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 text-left">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">My Profile</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage your account details.</p>
          </div>
          {/* ✏️ এডিট ডিটেইলস বাটন */}
          <button 
            onClick={openEditModal}
            className="text-xs font-medium flex items-center gap-2 text-amber-400 bg-amber-950/40 border border-amber-900/40 hover:bg-amber-900/40 px-3 py-1.5 rounded-lg transition"
          >
            <FaPen /> Edit Details
          </button>
        </div>

        {/* প্রোফাইল ডিসপ্লে */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/30 p-1 bg-slate-950">
            <img src={user?.image || 'https://api.dicebear.com/7.x/avataaars/svg'} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">{user?.name || 'Anonymous User'}</h3>
            <p className="text-xs text-slate-400 bg-slate-950 px-3 py-1 border border-slate-800 rounded-full inline-block">{user?.email}</p>
          </div>
        </div>

        <hr className="border-slate-800/60" />

        {/* স্ট্যাটাস সেকশন */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 text-left text-xs space-y-2">
          <div className="flex justify-between"><span className="text-slate-500">Account Status</span><span className="text-emerald-400 font-semibold uppercase">Active</span></div>
          {/* <div className="flex justify-between"><span className="text-slate-500">Role</span><span className="text-blue-400 font-semibold">Creator</span></div> */}
        </div>

        {/* লগআউট বাটন */}
        <div className="pt-2">
          <button onClick={handleLogout} className="w-full flex items-center justify-center py-3 px-4 font-semibold text-sm rounded-xl text-rose-400 bg-rose-950/30 border border-rose-900/30 hover:bg-rose-900/40 active:scale-[0.98] transition-all duration-200">
            🚪 Log Out from CircleX
          </button>
        </div>
      </motion.div>

      {/* 📥 এডিট প্রোফাইল মোডাল (পপ-আপ ফর্ম) */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-white">Edit Profile Details</h3>
              
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition duration-200" 
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)} 
                    className="px-4 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-900 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition"
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}