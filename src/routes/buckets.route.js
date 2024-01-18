import { Router } from "express";
import {
  CreateBucket,
  ListBuckets,
  ListObjects,
  deleteObject,
  getObject,
  putObject,
} from "../controllers/bucket.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/list", ListBuckets); // this will list all the buckets, pagination is implemented

router.post("/create", CreateBucket); // for creating a new bucket

router.get("/:bucketName", ListObjects); // this will list all the objects in a bucket, pagination is implemented

router.post("/:bucketName", upload.single("file"), putObject); // this will upload the file

router.get("/:bucketName/:objectHash", getObject); // this will download the file

router.delete("/:bucketName/:objectHash", deleteObject); // this will delete the file

export default router;
