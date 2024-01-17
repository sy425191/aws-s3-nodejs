import express from "express";
import cors from "cors";

import bucketRouter from "./routes/buckets.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/s3", bucketRouter);

export { app };
