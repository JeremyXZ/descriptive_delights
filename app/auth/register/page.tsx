// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const RegisterPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make an API call to register the user with the provided credentials
//       const response = await fetch("/api/register", {
//         method: "POST",
//         body: JSON.stringify({ username, password }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         // Registration successful, handle the successful registration flow
//         router.push("/");
//       } else {
//         const data = await response.text();
//         setMessage(data);
//       }
//     } catch (error) {
//       console.log("Error registering user:", error);
//       setMessage("An error occurred during registration.");
//     }
//   };

//   return (
//     <>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <span>Username:</span>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <label>
//           <span>Password:</span>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Register</button>
//       </form>
//       {message && <div>{message}</div>}
//     </>
//   );
// };

// export default RegisterPage;
