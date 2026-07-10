/**
 * ImgBB-তে ইমেজ আপলোড করার জন্য গ্লোবাল ইউটিলিটি ফাংশন
 * @param file - আপলোড করার জন্য সিলেক্টেড ফাইল অবজেক্ট
 * @returns string - আপলোড হওয়া ইমেজের সরাসরি URL
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error("ImgBB API Key is missing. Please add it to your .env.local file.");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to ImgBB");
    }

    const data = await response.json();
    return data.data.url; // ImgBB ডিরেক্ট ইমেজ URL
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw error;
  }
}