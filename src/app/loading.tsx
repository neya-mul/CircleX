import PostCardSkeleton from "@/components/ Postcardskeleton";

export default function ExploreLoading() {
    return (
        <div className="mx-auto p-6 min-h-screen">
            {/* হেডার প্লেসহোল্ডার — আসল Explore পেজের হেডার লেআউটের সাথে মিলিয়ে */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-5 mb-8 gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-slate-800/60 rounded-md animate-pulse" />
                    <div className="h-4 w-64 bg-slate-800/40 rounded-md animate-pulse" />
                </div>
                <div className="h-9 w-40 bg-slate-800/60 rounded-lg animate-pulse" />
            </div>

            {/* পোস্ট গ্রিড প্লেসহোল্ডার — আসল গ্রিডের কলাম/গ্যাপ ক্লাসের সাথে হুবহু মিলিয়ে */}
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}