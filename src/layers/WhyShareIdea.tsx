import Link from 'next/link'
import React from 'react'
import { FaGlobe, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa'

export default function WhyShareIdea() {
    const benefits = [
        {
            icon: <FaLightbulb className="text-amber-400 text-xl" />,
            title: "Bring Ideas to Life",
            description: "Don't let your thoughts sit idle. Share them with the world and watch them transform into real, impactful projects."
        },
        {
            icon: <FaUsers className="text-blue-400 text-xl" />,
            title: "Build Together",
            description: "Connect with like-minded developers, creators, and thinkers who can collaborate, give feedback, and improve your concepts."
        },
        {
            icon: <FaRocket className="text-emerald-400 text-xl" />,
            title: "Accelerate Innovation",
            description: "Open discussions spark faster solutions. Your unique perspective might be the missing piece to someone else's puzzle."
        },
        {
            icon: <FaGlobe className="text-purple-400 text-xl" />,
            title: "Global Recognition",
            description: "Establish your voice in the tech community. Showcase your expertise and build a strong professional network."
        }
    ]

    return (
        <section className=" text-slate-200 py-16 px-4 md:py-24 relative overflow-hidden">
            {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-12 relative z-10">

                {/* সেকশন হেডার */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                        Why Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Ideas</span>?
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                        Great things happen when thoughts escape the mind. Sharing your vision opens doors to collaboration, validation, and limitless growth.
                    </p>
                </div>

                {/* বেনিফিট গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-slate-700/60 hover:bg-slate-900/60 transition duration-300 group flex items-start gap-4"
                        >
                            {/* আইকন কন্টেইনার */}
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:scale-110 transition duration-300">
                                {benefit.icon}
                            </div>

                            {/* টেক্সট */}
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-white tracking-wide group-hover:text-blue-400 transition">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* কল টু অ্যাকশন বাটন */}
                <div className="text-center pt-4">
                    <Link href={'/add-post'}><button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition duration-150">
                        Write Your First Post
                    </button></Link>
                </div>

            </div>
        </section>
    )
}