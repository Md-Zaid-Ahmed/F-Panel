import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
}

  if (isConnected) {
    return console.log("MongoDB is connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "FB_PANEL",
    });
    isConnected = true;
    console.log("mongodb is connected");
  } catch (err) {
    console.log(err);
  }
};
