import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // async authorize(credentials, req) {
      //   const { username, password } = credentials as any;
      //   const hashedPassword = await bcrypt.hash(password, 10);
      //   const user = await User.create({
      //     username,
      //     password: hashedPassword,
      //   });

      //   // Return the user object
      //   return user;
      // },

      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        // Retrieve the user from MongoDB based on the username
        const user = await User.findOne({ username });

        // If the user exists and the password matches, return the user object
        if (user && user.password === password) {
          return user;
        }

        // If the credentials are invalid, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // serverless function: only when get called, make a connection to the database
        await connectToDB();
        //check if the user  already exists
        const userExist = await User.findOne({
          email: profile.email,
        });
        //if not, create a new database

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
