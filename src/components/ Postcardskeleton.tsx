import { Skeleton } from "./Skeleton";

export default function PostCardSkeleton() {
    return (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm">
            {/* ১. পোস্ট ইমেজ প্লেসহোল্ডার — আসল কার্ডের h-48 এর সাথে ম্যাচ করে */}
            <Skeleton className="h-48 w-full rounded-none" />

            <div className="p-5 flex flex-col flex-grow">
                {/* ২. ইউজার প্রোফাইল ইনফো প্লেসহোল্ডার */}
                <div className="flex items-center space-x-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2.5 w-16" />
                    </div>
                </div>

                {/* ৩. কন্টেন্ট টেক্সট প্লেসহোল্ডার — আসল কার্ডের min-h-[40px] লাইন-ক্ল্যাম্পের সাথে মিলিয়ে */}
                <div className="space-y-2 mb-6 min-h-[40px]">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </div>

                {/* ৪. অ্যাকশন বার প্লেসহোল্ডার */}
                <div className="border-t border-slate-800/60 pt-4 mt-auto flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-7 w-16 rounded-lg" />
                </div>
            </div>
        </div>
    );
}