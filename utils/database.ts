import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongodbUri = process.env.MONGODB_URI || "";
  if (!mongodbUri) {
    console.log("MongoDB URI is not defined");
    return;
  }

  try {
    const options = {
      dbName: "descriptive_delights",
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    await mongoose.connect(mongodbUri, options);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
