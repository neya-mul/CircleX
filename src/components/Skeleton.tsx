/**
 * সবচেয়ে বেসিক বিল্ডিং ব্লক — যেকোনো shape/size এর placeholder বানাতে এটাই ব্যবহার হবে।
 * className দিয়ে width/height/rounded কন্ট্রোল করুন, যেমন:
 *   <Skeleton className="h-4 w-24" />          // এক লাইন টেক্সট
 *   <Skeleton className="w-10 h-10 rounded-full" /> // অ্যাভাটার
 */
export function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse bg-slate-800/60 rounded-md ${className}`} />;
}