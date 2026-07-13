interface GetAllPostsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export async function getAllPosts({
  search = '',
  category = 'all',
  page = 1,
  limit = 8,
  sortBy = 'newest',
}: GetAllPostsParams = {}) {
  try {
    const params = new URLSearchParams({
      search,
      category,
      page: String(page),
      limit: String(limit),
      sortBy,
    });

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/all-posts?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}