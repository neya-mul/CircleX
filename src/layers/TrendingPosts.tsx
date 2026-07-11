"use client";

import { useEffect, useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, Flame, CheckCircle, Code } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getAllPosts } from "@/lib/allData/all-posts";
import PostCard from "@/components/PostCard";

export default function TrendingGrid() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await getAllPosts({ limit: 8 }) // ট্রেন্ডিং সেকশনে শুধু ৮টা পোস্টই দরকার
      setPosts(data?.posts || []) // ✅ .posts এক্সট্র্যাক্ট করা হলো, ফেইল হলে খালি অ্যারে
    }
    getData()
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="container mx-auto py-6">
      {/* সেকশন হেডার */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#5D3EBC]/10 border border-[#5D3EBC]/30 text-[#7c7fff]">
            <Flame size={18} className="animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Trending Feed</h2>
        </div>
        <span className="text-xs font-semibold text-[#7c7fff] hover:underline cursor-pointer">View All</span>
      </div>

      {/* গ্রিড লেআউট */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {
          posts.slice(0, 8).map((post: any, ind: number) => (
            <PostCard key={post._id || ind} post={post} />
          ))
        }
      </motion.div>
    </section>
  );
}