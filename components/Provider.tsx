"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  image: string;
}

interface Session {
  user: User;
  expires: string;
}

interface ProviderProps {
  children: ReactNode;
  session: Session | undefined | null;
}

// like context api's context provider, to provide session data and manage session state
//will be used in app/layout.tsx to provide global data
const Provider = ({ children, session }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
