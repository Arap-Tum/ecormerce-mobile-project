import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token", // Replace `token` with your actual token
    },
    body: JSON.stringify({
      order: {}, // adjust this depending on your backend
      items,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error("Error creating order");
  }

  return data;
}
