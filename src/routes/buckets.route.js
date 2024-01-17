import { Router } from "express";
import { CreateBucket, ListBuckets, ListObjects, deleteObject, getObject, putObject } from "../controllers/bucket.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router
    .route('/')
    .get(ListBuckets)
    .post(CreateBucket)

router
    .route('/:bucketName')
    .get(ListObjects)
    .post(upload.single("file"), putObject)

router
    .route('/:bucketName/:objectHash')
    .get(getObject)
    .delete(deleteObject)

export default router