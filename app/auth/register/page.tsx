"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to register the user with the provided credentials
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Registration successful, handle the successful registration flow
        router.push("/");
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.log("Error registering user:", error);
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default RegisterPage;
