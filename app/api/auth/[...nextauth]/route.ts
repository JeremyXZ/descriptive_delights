import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
// import { type DefaultSession } from "next-auth";
import { Profile } from "next-auth";
import { ISession } from "@/components/Provider";

// export interface CustomSessionUser extends DefaultSession {
//   id: string;
// }

interface ExtendedProfile extends Profile {
  picture: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: ISession }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      // session.user.id = sessionUser._id.toString();
      if (sessionUser && session.user) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // serverless function: onley when get called, make a connection to the database
        await connectToDB();
        //check if the user  already exists
        const userExist = await User.findOne({
          email: profile?.email,
        });
        //if not, create a new database

        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: (profile as ExtendedProfile)?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(
          "Error checking if user exists: ",
          (error as Error).message
        );
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
