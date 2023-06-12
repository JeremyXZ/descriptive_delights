// import User from "@/models/user";
// import { connectToDB } from "@/utils/database";
// // import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";

// export const POST = async (request) => {
//   const { username, password } = await request.json();
//   console.log("register route request", { username, password });

//   try {
//     await connectToDB();

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("hashed password", hashedPassword);
//     const newUser = await User.create({
//       username,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     console.log("newUser", newUser);
//     //reponse contains only id and username without password because hashing may cause probelm for stringigying process
//     const myResponse = {
//       id: newUser._id,
//       username: newUser.username,
//     };

//     return new Response(JSON.stringify(myResponse), { status: 201 });
//   } catch (error) {
//     return new Response("Failed to create a new user", { status: 500 });
//   }
// };
