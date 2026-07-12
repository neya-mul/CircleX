interface GetAllPostsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function getAllPosts({
  
  search = '',
  category = 'all',
  page = 1,
  limit = 8,
}: GetAllPostsParams = {}) {

  // await new Promise((r) => setTimeout(r, 3000));
  try {
    const params = new URLSearchParams({
      search,
      category,
      page: String(page),
      limit: String(limit),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-posts?${params.toString()}`, {
      cache: 'no-store', // সবসময় লেটেস্ট ডাটা আনার জন্য
    });

    if (!res.ok) return null;

    return res.json(); // { posts, totalCount, totalPages, currentPage }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}