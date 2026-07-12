'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { FaHeart } from 'react-icons/fa'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function AnalyticsPage() {
    const { data: session } = useSession()
    const user = session?.user

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.email) return
        fetch(`${process.env.NEXT_PUBLIC_URL}/user-analytics?email=${user.email}`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(() => setLoading(false))
    }, [user?.email])

    if (loading) return <div className="p-12 text-center text-blue-500 animate-pulse bg-slate-950 min-h-screen">Loading Analytics...</div>

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 pt-20">
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Engagement Analytics</h1>
                    <p className="text-xs text-slate-400">Track your post performance and category distribution.</p>
                </div>

                {/* 💳 স্ট্যাটস কার্ডস */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
                        <span className="text-xs font-semibold uppercase text-slate-500 block">Total Posts</span>
                        <span className="text-3xl font-bold text-white mt-2 block">{data?.totalPosts || 0}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
                        <span className="text-xs font-semibold uppercase text-slate-500 block">Total Likes Received</span>
                        <span className="text-3xl font-bold flex items-center text-rose-500 mt-2 "> <FaHeart /> {data?.totalLikes || 0}</span>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
                        <span className="text-xs font-semibold uppercase text-slate-500 block">Avg. Engagement</span>
                        <span className="text-3xl font-bold text-blue-400 mt-2 block">
                            {data?.totalPosts ? (data.totalLikes / data.totalPosts).toFixed(1) : 0} <span className="text-xs text-slate-500">likes/post</span>
                        </span>
                    </div>
                </div>

                {/* 📊 গ্রাফ সেকশন */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl h-80">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4">Category Distribution</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={data?.categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    // 🆕 লেবেলে শুধুমাত্র সংখ্যা না দেখিয়ে নাম দেখানোর জন্য নিচের কোডটি ব্যবহার করুন:
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {data?.categoryData?.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <ResponsiveContainer width="100%" height="90%">
                                    <PieChart>
                                        <Pie
                                            data={data?.categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={60}
                                        >
                                            {data?.categoryData?.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />

                                        {/* 🆕 এই লাইনটি যোগ করুন যাতে নিচে ক্যাটাগরির নামগুলো কালার কোডসহ দেখায় */}
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value) => <span className="text-xs font-medium text-slate-400">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl h-80">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4">Post vs Category Count</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={data?.categoryData}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}