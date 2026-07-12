"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Upload,
    Camera,
    Loader2,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    X,
} from "lucide-react";
import { uploadImageToImgBB } from "@/lib/uploadToIamgeBB";
import { authClient } from "@/lib/auth-client";

// ---- কনফিগ / কনস্ট্যান্ট ----
const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
};

type Status = {
    type: "" | "info" | "success" | "error";
    text: string;
};

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState<"" | "image" | "account">("");
    const [statusMsg, setStatusMsg] = useState<Status>({ type: "", text: "" });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    // যাতে unmount হওয়ার পরে setState কল না হয় (রেস কন্ডিশন প্রতিরোধ)
    const isMountedRef = useRef(true);
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // মেমরি লিক এড়াতে object URL রিভোক করা
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    // ---------- ভ্যালিডেশন হেল্পার ----------
    const validateImage = (file: File): string | null => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return "Only JPG, PNG, WEBP or GIF images are allowed.";
        }
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            return `Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`;
        }
        return null;
    };

    const validateForm = (): FieldErrors => {
        const errors: FieldErrors = {};

        const name = formData.name.trim();
        if (!name) errors.name = "Name is required.";
        else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
        else if (name.length > 60) errors.name = "Name is too long.";

        const email = formData.email.trim();
        if (!email) errors.email = "Email is required.";
        else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email address.";

        const password = formData.password;
        if (!password) errors.password = "Password is required.";
        else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
        else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            errors.password = "Password must include at least one letter and one number.";
        }

        return errors;
    };

    // ---------- ইমেজ সিলেক্ট হ্যান্ডলার ----------
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // ইনপুট রিসেট করুন যাতে একই ফাইল আবার সিলেক্ট করা যায়
        e.target.value = "";
        if (!file) return;

        const imageError = validateImage(file);
        if (imageError) {
            setFieldErrors((prev) => ({ ...prev, image: imageError }));
            setStatusMsg({ type: "error", text: imageError });
            return;
        }

        setFieldErrors((prev) => ({ ...prev, image: undefined }));
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        setFieldErrors((prev) => ({ ...prev, image: undefined }));
    };

    const handleFieldChange =
        (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
            // টাইপ করার সাথে সাথে সেই ফিল্ডের এরর সরিয়ে দিন
            if (fieldErrors[field]) {
                setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
            }
        };

    // ---------- ফর্ম সাবমিশন ----------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return; // ডাবল সাবমিট প্রতিরোধ

        setStatusMsg({ type: "", text: "" });

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setStatusMsg({ type: "error", text: "Please fix the highlighted fields." });
            return;
        }

        setLoading(true);

        try {
            let uploadedImageUrl = "";

            // ১. ইমেজ থাকলে প্রথমে ImgBB-তে আপলোড
            if (imageFile) {
                setLoadingStage("image");
                setStatusMsg({ type: "info", text: "Uploading avatar to cloud..." });
                try {
                    uploadedImageUrl = await uploadImageToImgBB(imageFile);
                } catch (imgErr: any) {
                    throw new Error(
                        imgErr?.message
                            ? `Avatar upload failed: ${imgErr.message}`
                            : "Avatar upload failed. You can try again or continue without a photo."
                    );
                }
            }

            // ২. অ্যাকাউন্ট তৈরি করা
            setLoadingStage("account");
            setStatusMsg({ type: "info", text: "Creating your account..." });

            const { data, error } = await authClient.signUp.email({
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                image: uploadedImageUrl,
                callbackURL: "/login",
            });

            // Better-Auth সাধারণত থ্রো না করে error অবজেক্ট রিটার্ন করে — এটা অবশ্যই চেক করতে হবে
            if (error) {
                throw new Error(mapAuthError(error));
            }

            if (!isMountedRef.current) return;

            setStatusMsg({ type: "success", text: "Account created successfully! Redirecting to login..." });

            // সফল হলে ফর্ম রিসেট করুন
            setFormData({ name: "", email: "", password: "" });
            clearImage();

            // ✅ রেজিস্ট্রেশন সফল হওয়ার পর লগইন পেজে রিডাইরেক্ট করা হচ্ছে
            setTimeout(() => {
                if (isMountedRef.current) router.push("/login");
            }, 1200);
        } catch (error: any) {
            if (!isMountedRef.current) return;

            const message = getErrorMessage(error);
            setStatusMsg({ type: "error", text: message });
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
                setLoadingStage("");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#06060e] flex items-center justify-center p-4 relative overflow-hidden">
            {/* 🌌 ব্যাকগ্রাউন্ড নিওন অরবিট গ্লো */}
            <div className="absolute w-[500px] h-[500px] bg-[#5D3EBC]/10 rounded-full blur-[150px] -top-20 -left-20 pointer-events-none"></div>
            <div className="absolute w-[400px] h-[400px] bg-[#6366F1]/5 rounded-full blur-[130px] -bottom-20 -right-20 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-[#0b0c16]/80 backdrop-blur-md border border-[#161624] p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-10"
            >
                {/* হেডার */}
                <div className="text-center space-y-2 mb-6">
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        Join Circle<span className="text-[#6366F1]">X</span>
                    </h2>
                    <p className="text-xs text-gray-400 font-light">
                        Create your decentralized identity to sync with the grid
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* 📸 ইমেজ আপলোড */}
                    <div className="flex flex-col items-center justify-center mb-2">
                        <div className="relative">
                            <label className="relative cursor-pointer group block">
                                <div
                                    className={`w-20 h-20 rounded-full border-2 border-dashed ${
                                        fieldErrors.image ? "border-rose-500" : "border-[#161624]"
                                    } group-hover:border-[#5D3EBC]/60 bg-[#06060e] flex items-center justify-center overflow-hidden transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload size={20} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 p-1.5 bg-[#5D3EBC] text-white rounded-full shadow-md scale-90 group-hover:scale-100 transition-transform">
                                    <Camera size={12} />
                                </div>
                                <input
                                    type="file"
                                    accept={ALLOWED_IMAGE_TYPES.join(",")}
                                    onChange={handleImageChange}
                                    disabled={loading}
                                    className="hidden"
                                />
                            </label>

                            {imagePreview && !loading && (
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    aria-label="Remove avatar"
                                    className="absolute -top-1 -left-1 p-1 bg-[#161624] hover:bg-rose-500/80 text-gray-300 hover:text-white rounded-full transition-colors"
                                >
                                    <X size={10} />
                                </button>
                            )}
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium mt-2 uppercase tracking-wider">
                            Upload Avatar (optional)
                        </span>
                        {fieldErrors.image && (
                            <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                                <AlertCircle size={12} /> {fieldErrors.image}
                            </p>
                        )}
                    </div>

                    {/* 👤 নেম */}
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Full Name
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Alex Parker"
                                value={formData.name}
                                onChange={handleFieldChange("name")}
                                disabled={loading}
                                aria-invalid={!!fieldErrors.name}
                                className={`w-full bg-[#06060e] border ${
                                    fieldErrors.name ? "border-rose-500" : "border-[#161624] focus:border-[#5D3EBC]"
                                } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50`}
                            />
                        </div>
                        {fieldErrors.name && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1">
                                <AlertCircle size={12} /> {fieldErrors.name}
                            </p>
                        )}
                    </div>

                    {/* ✉️ ইমেইল */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="email"
                                type="email"
                                placeholder="alex@circlex.com"
                                value={formData.email}
                                onChange={handleFieldChange("email")}
                                disabled={loading}
                                aria-invalid={!!fieldErrors.email}
                                className={`w-full bg-[#06060e] border ${
                                    fieldErrors.email ? "border-rose-500" : "border-[#161624] focus:border-[#5D3EBC]"
                                } rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50`}
                            />
                        </div>
                        {fieldErrors.email && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1">
                                <AlertCircle size={12} /> {fieldErrors.email}
                            </p>
                        )}
                    </div>

                    {/* 🔒 পাসওয়ার্ড */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleFieldChange("password")}
                                disabled={loading}
                                aria-invalid={!!fieldErrors.password}
                                className={`w-full bg-[#06060e] border ${
                                    fieldErrors.password ? "border-rose-500" : "border-[#161624] focus:border-[#5D3EBC]"
                                } rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1">
                                <AlertCircle size={12} /> {fieldErrors.password}
                            </p>
                        )}
                    </div>

                    {/* 🔔 স্ট্যাটাস মেসেজ */}
                    {statusMsg.text && (
                        <div
                            role="alert"
                            className={`p-3 rounded-xl text-xs font-medium text-center border flex items-center justify-center gap-2 ${
                                statusMsg.type === "success"
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                    : statusMsg.type === "info"
                                    ? "bg-[#5D3EBC]/10 border-[#5D3EBC]/20 text-[#9295ff]"
                                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            }`}
                        >
                            {statusMsg.type === "success" && <CheckCircle2 size={14} />}
                            {statusMsg.type === "error" && <AlertCircle size={14} />}
                            {statusMsg.type === "info" && <Loader2 size={14} className="animate-spin" />}
                            {statusMsg.text}
                        </div>
                    )}

                    {/* ⚡ সাবমিট বাটন */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.99 }}
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#5D3EBC] hover:bg-[#5D3EBC]/90 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(93,62,188,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                {loadingStage === "image" ? "Uploading Avatar..." : "Creating Account..."}
                            </>
                        ) : (
                            <>
                                Create Account
                                <ArrowRight size={14} />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

// ---------- এরর হেল্পার ফাংশন ----------

/** Better-Auth এর error অবজেক্ট থেকে ইউজার-বান্ধব মেসেজ তৈরি করে */
function mapAuthError(error: { message?: string; code?: string; status?: number } | any): string {
    const code = (error?.code || "").toString().toUpperCase();
    const status = error?.status;

    if (code.includes("USER_ALREADY_EXISTS") || status === 409) {
        return "An account with this email already exists. Try logging in instead.";
    }
    if (code.includes("INVALID_EMAIL")) {
        return "That email address looks invalid. Please double-check it.";
    }
    if (code.includes("WEAK_PASSWORD") || code.includes("INVALID_PASSWORD")) {
        return "Please choose a stronger password (8+ characters, letters and numbers).";
    }
    if (status === 429) {
        return "Too many attempts. Please wait a moment and try again.";
    }
    if (status && status >= 500) {
        return "Our server is having issues right now. Please try again shortly.";
    }
    return error?.message || "Registration failed. Please try again.";
}

/** যেকোনো থ্রোন এরর (নেটওয়ার্ক/আপলোড/অন্যান্য) থেকে সেফ মেসেজ বের করে */
function getErrorMessage(error: unknown): string {
    if (error instanceof TypeError && /fetch|network/i.test(error.message)) {
        return "Network error. Please check your connection and try again.";
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return "Something went wrong. Please try again.";
}