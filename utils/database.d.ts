import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
    }
  }
}

export declare function connectToDB(): Promise<void>;
