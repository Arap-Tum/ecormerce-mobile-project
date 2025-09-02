const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password:string) {
    const res = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers : {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })

    const data = await res.json()

    if (!res.ok) {
        console.log(res)
        throw Error('Failed to log in ')
    }

    return data;
}

export async function signup(email: string, password: string) {
    console.log(`${API_URL}auth/register`)
  const res = await fetch(`${API_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // log the HTML/error
    console.error("Response error:", errorText);
    throw new Error("Failed to register");
  }

  const data = await res.json();
  return data;
}

