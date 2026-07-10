"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";

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
            router.push("/");
            router.refresh();
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
            className="w-full h-16 bg-[#06060e]/80 backdrop-blur-md border-b border-[#161624] sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between"
        >
            {/* লোগো */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5D3EBC] to-[#6366F1] flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    C
                </div>
                <span className="text-lg font-bold text-white tracking-tight">CircleX</span>
            </Link>

            {/* ডেস্কটপ মেনু লিংকস */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#0d0e1a] p-1 rounded-xl border border-gray-950">
                {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                                active
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
                <button
                    aria-label="Search"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Search size={18} />
                </button>

                {isLoggedIn && (
                    <button
                        aria-label="Notifications"
                        className="relative p-1.5 text-gray-400 hover:text-white bg-[#0d0e1a] border border-gray-900 rounded-lg"
                    >
                        <Bell size={16} />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#5D3EBC] rounded-full"></span>
                    </button>
                )}

                {isPending ? (
                    // সেশন লোড হওয়ার সময় স্কেলিটন
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
                                        // ইমেজ লোড ফেইল করলে ফলব্যাক ইনিশিয়াল দেখায়
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
                    <Link
                        href="/login"
                        className="bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                        Login
                    </Link>
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
                                    className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                                        active
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
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="bg-[#5D3EBC] text-white text-sm font-bold text-center py-2.5 rounded-xl"
                            >
                                Login
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}