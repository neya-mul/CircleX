'use server'
export const getAllPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-posts`)
    const allPosts = await res.json()
    return allPosts || null

}