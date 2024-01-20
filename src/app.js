import express from "express";
import cors from "cors";

import bucketRouter from "./routes/buckets.route.js";

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>AWS S3 Server</h1>
    <h2>API</h2>
    <ul>
        <li><a href="/api/v1/s3/list">/api/v1/s3</a></li>
        <li><a href="/api/v1/s3/:bucketName">/api/v1/s3/:bucketName</a></li>
        <li><a href="/api/v1/s3/:bucketName/:objectKey">/api/v1/s3/:bucketName/:objectKey</a></li>
    </ul>
    `);
});

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
