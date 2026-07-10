'use server'

export const getPostDetails = async (id: string) => {
    // ফিক্সড: ইউআরএল থেকে কোলন (:) বাদ দেওয়া হয়েছে
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-posts/${id}`, {
        cache: 'no-store' // রিয়েল-টাইম ডাটা নিশ্চিত করার জন্য
    })
    
    if (!res.ok) {
        return null;
    }

    const postDetails = await res.json()
    return postDetails || null
}