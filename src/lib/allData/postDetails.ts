import { getToken } from "../generateToken";

export const getPostDetails = async (id: string) => {
    const token = await getToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/all-posts/${id}`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log("Status:", res.status);

    const text = await res.text();
    console.log(text);

    return text ? JSON.parse(text) : null;
};