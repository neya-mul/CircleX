"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import logo from '../../public/Images/logo.png'

type NavLink = { name: string; href: string };

const LOGGED_OUT_LINKS: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Trending", href: "/trending" },
];

const LOGGED_IN_LINKS: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Add Post", href: "/add-post" },
    { name: "Manage Posts", href: "/manage-posts" },
    { name: "Analytics", href: "/analytics" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const isLoggedIn = !isPending && !!session?.user;
    const navLinks = isLoggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

    const handleLogout = async () => {
        if (signingOut) return;
        setSigningOut(true);
        try {
            await authClient.signOut();
            router.push("/login");
            router.refresh();
            window.location.reload()
        } catch (err) {
            console.error("Sign out failed:", err);
        } finally {
            setSigningOut(false);
            setMenuOpen(false);
            setIsOpen(false);
        }
    };

    const userName = session?.user?.name || "User";
    const userImage = session?.user?.image;
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-16 bg-[#06060e]/80  backdrop-blur-md border-b border-[#161624] sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between"
        >
            {/* লোগো */}
           <Link href="/" className="flex items-center gap-2 shrink-0 group relative p-1">
    {/* 🌌 ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো (লোগোর পেছনের হালকা নিয়ন আভা) */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/5 to-indigo-600/20 blur-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

    {/* 🎨 মাস্কড লোগো কন্টেইনার */}
    <div 
        className="h-9 w-36 relative bg-gradient-to-r from-blue-600 via-indigo-400 via-cyan-400 to-blue-600 animate-gradient-flow transform group-hover:scale-[1.03] transition-all duration-300"
        style={{
            // 💡 লোগোর শেপ অনুযায়ী নিখুঁত মাস্কিং
            maskImage: `url(${logo.src || logo})`,
            WebkitMaskImage: `url(${logo.src || logo})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'left center',
            WebkitMaskPosition: 'left center',
            // ⚡ সাইবারপাঙ্ক ভাইব ড্যাশবোর্ড শ্যাডো
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 20px rgba(34, 211, 238, 0.2))'
        }}
    >
        {/* ✨ হোভার করলে লোগোর ভেতর দিয়ে সাদা আলোর লেজার তরঙ্গ চলে যাবে */}
        <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-laser-shine" />
    </div>
</Link>
            {/* ডেস্কটপ মেনু লিংকস */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#0d0e1a] p-1 rounded-xl border border-gray-950">
                {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${active
                                ? "bg-[#1d1b3c] text-[#7c7fff]"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            {/* রাইট অ্যাকশন বাটন (ডেস্কটপ) */}
            <div className="hidden md:flex items-center gap-4">
                {isPending ? (
                    // সেশন লোড হওয়ার সময় স্কেলিতন
                    <div className="flex items-center gap-2 bg-[#0d0e1a] border border-gray-900 pr-3 pl-1.5 py-1 rounded-xl animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-gray-800" />
                        <div className="w-16 h-3 rounded bg-gray-800" />
                    </div>
                ) : isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 bg-[#0d0e1a] border border-gray-900 pr-3 pl-1.5 py-1 rounded-xl hover:border-[#5D3EBC]/50 transition-colors"
                        >
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={userName}
                                    className="w-6 h-6 rounded-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-[#5D3EBC]/30 flex items-center justify-center text-[10px] font-bold text-[#9295ff]">
                                    {userInitial}
                                </div>
                            )}
                            <span className="text-xs font-bold text-gray-300 max-w-[120px] truncate">
                                {userName}
                            </span>
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-40 bg-[#0b0c16] border border-[#161624] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden"
                                >
                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2.5 text-xs text-gray-300 hover:bg-[#161624] hover:text-white transition-colors"
                                    >
                                        <UserIcon size={14} /> Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        disabled={signingOut}
                                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-rose-400 hover:bg-[#161624] hover:text-rose-300 transition-colors disabled:opacity-50"
                                    >
                                        <LogOut size={14} /> {signingOut ? "Signing out..." : "Logout"}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    // লগআউট অবস্থায় ডেডিকেটেড লগইন এবং রেজিস্টার লিংক
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors px-2 py-1"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(93,62,188,0.2)]"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* মোবাইল মেনু টগল */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="md:hidden text-gray-400 hover:text-white"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* মোবাইল ড্রপডাউন */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-0 w-full bg-[#06060e] border-b border-[#161624] p-4 flex flex-col gap-1 md:hidden"
                    >
                        {navLinks.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm py-2 px-3 rounded-lg transition-colors ${active
                                        ? "bg-[#1d1b3c] text-[#7c7fff]"
                                        : "text-gray-400 hover:text-white hover:bg-[#0d0e1a]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="h-px bg-[#161624] my-2" />

                        {isPending ? (
                            <div className="h-9 rounded-lg bg-[#0d0e1a] animate-pulse" />
                        ) : isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300">
                                    {userImage ? (
                                        <img
                                            src={userImage}
                                            alt={userName}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-[#5D3EBC]/30 flex items-center justify-center text-[10px] font-bold text-[#9295ff]">
                                            {userInitial}
                                        </div>
                                    )}
                                    {userName}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    disabled={signingOut}
                                    className="flex items-center gap-2 text-sm text-rose-400 py-2 px-3 rounded-lg hover:bg-[#0d0e1a] disabled:opacity-50"
                                >
                                    <LogOut size={14} /> {signingOut ? "Signing out..." : "Logout"}
                                </button>
                            </>
                        ) : (
                            // মোবাইল ড্রপডাউনে লগইন এবং রেজিস্টার বাটন
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="border border-gray-800 text-gray-300 text-sm font-semibold text-center py-2 rounded-xl hover:bg-[#0d0e1a]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#5D3EBC] text-white text-sm font-bold text-center py-2 rounded-xl shadow-[0_0_15px_rgba(93,62,188,0.1)]"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}