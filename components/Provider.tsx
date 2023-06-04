"use client";
import { SessionProvider } from "next-auth/react";

// like context api's context provider, to provide session data and manage session state
//will be used in app/layout.tsx to provide global data
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
