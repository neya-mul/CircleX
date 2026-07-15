import React from 'react'
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa'

export default function BlogSection() {
  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      category: "Engineering",
      title: "Scaling Express.js Apps for Millions of Users",
      excerpt: "Learn the core patterns behind building highly scalable Node.js backends, optimizing connection pools, and caching strategy.",
      date: "Jul 12, 2026",
      readTime: "5 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80",
      category: "Security",
      title: "Demystifying JWT Security: Best Practices for 2026",
      excerpt: "A deep dive into secure token management, avoiding common traps like JWS errors, and building solid auth middleware.",
      date: "Jul 10, 2026",
      readTime: "8 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      category: "Productivity",
      title: "From Idea to Production: A Developer's Roadmap",
      excerpt: "How to effectively structuralize your rough tech thoughts into tangible, well-documented open-source products.",
      date: "Jul 05, 2026",
      readTime: "4 min read"
    }
  ]

  return (
    <section className=" text-slate-200 py-16 px-4 md:py-24 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড রিফ্লেকশন ইফেক্ট */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Latest from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">CircleX</span> Blog
            </h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Insights, deep dives, and tutorials written by developers, for developers. Stay ahead of the curve.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs md:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition shrink-0 group">
            View All Articles <FaArrowRight className="group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* ব্লগ কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article 
              key={index} 
              className="bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700/60 transition duration-300"
            >
              {/* ইমেজ এরিয়া */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-800">
                  {blog.category}
                </span>
              </div>

              {/* ব্লগ কন্টেন্ট */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* মেটা ইনফো */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock /> {blog.readTime}
                    </span>
                  </div>
                  
                  {/* টাইটেল এবং ডেসক্রিপশন */}
                  <h3 className="text-base font-bold text-white tracking-wide group-hover:text-emerald-400 transition duration-200">
                    <a href="#read">{blog.title}</a>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* রিড মোর বাটন */}
                {/* <div className="pt-2 border-t border-slate-800/60">
                  <a 
                    href="#read" 
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    Read Full Post <FaArrowRight className="text-[10px] text-slate-500 group-hover:text-white transition group-hover:translate-x-0.5" />
                  </a>
                </div> */}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}