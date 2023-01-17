import path from "path";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import apiRouter from "./server/apiRouter";
import mongoConnect from "./config/mongodb";

config(); /* load env variables */
mongoConnect(process.env.MONGO_URI ?? ""); /* connect to mongodb cluster */

const app = express();

app.use(express.json(), cors());

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const PORT = process.env.PORT ?? 9000;

app.listen(PORT, () => {
  console.log(`live (port: ${PORT})`);
});
