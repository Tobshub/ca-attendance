import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export default function mongoConnect(uri: string) {
  try {
    mongoose.connect(uri, { dbName: "workers" }, err => {
      if (err) {
        throw err;
      }
      console.log("$connected to cluster");
    });
  } catch (error) {
    console.error(error);
  }
}
