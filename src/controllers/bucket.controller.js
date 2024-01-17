import { Bucket } from "../models/buckets.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import GenerateHash from "../utils/generateHash.js";
import fs from "fs";

const ListBuckets = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const buckets = await Bucket.find({ createdBy: _userId });
        // only give back the bucket names

        const bucketNames = buckets.map((bucket, idx) => ({id: bucket._id, bucket: bucket.bucketName}));

        res.status(200).json(bucketNames);
    } catch (err) {
        res.status(500).json(err);
    }
})

const CreateBucket = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const bucketName = req.body.bucketName.toLowerCase().trim();

        if (await Bucket.findOne({ createdBy: _userId, bucketName })) {
            return res.status(400).json({
                message: "Bucket already exists",
            });
        }

        const bucket = new Bucket({
            bucketName: bucketName,
            createdBy: _userId,
        });

        await bucket.save();

        res.status(200).json(bucket);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

const ListObjects = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const bucket = await Bucket.findOne({
            createdBy: _userId,
            bucketName: req.params.bucketName,
        });

        const objects = bucket.objects.map((object, idx) => ({
            id: object._id,
            fileName: object.fileName,
            fileHash: object.fileHash,
            dateUploaded: bucket._id.getTimestamp(),
        }));
        res.status(200).json(objects);
    } catch (err) {
        res.status(500).send(err);
    }
})

const putObject = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const tempHash = await GenerateHash();
        console.log('Hash of file uploaded', tempHash);

        const bucket = await Bucket.findOne({
            createdBy: _userId,
            bucketName: req.params.bucketName,
        });

        if (!bucket) {
            return res.status(404).json({
                message: "Bucket not found",
            });
        }

        const object = {
            fileHash: tempHash,
            filePath: req.file.path,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
        };

        bucket.objects.push(object);
        await bucket.save();
        res.status(200).json({
            message: "File uploaded successfully",
            fileHash: tempHash,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

const getObject = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const bucket = await Bucket.findOne({
            createdBy: _userId,
            bucketName: req.params.bucketName,
        });

        if (!bucket) {
            return res.status(404).json({
                message: "Bucket not found",
            });
        }

        const object = bucket.objects.find(
            (object) => object.fileHash === req.params.objectHash
        );

        if (!object) {
            return res.status(404).json({
                message: "Object not found",
            });
        }

        // we have to send the file as a response
        res.status(200).sendFile(object.filePath, {
            root: "./",
            headers: {
                "Content-Type": object.fileType,
                "Content-Disposition": "inline; filename=" + object.fileName + ";",
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

const deleteObject = asyncHandler(async (req, res) => {
    const _userId = "5f9d88b9c7b8d6b4c8b0b0b4";

    try {
        const bucket = await Bucket.findOne({
            createdBy: _userId,
            bucketName: req.params.bucketName,
        });
        if (!bucket) {
            return res.status(404).json({
                message: "Bucket not found",
            });
        }

        const object = bucket.objects.find(
            (object) => object.fileHash === req.params.objectHash
        );

        if (!object) {
            return res.status(404).json({
                message: "Object not found",
            });
        }

        // delete the file from the server
        fs.unlinkSync(object.filePath);


        bucket.objects = bucket.objects.filter(
            (object) => object.fileHash !== req.params.objectHash
        );
        await bucket.save();
        res.status(200).json({
            message: "File deleted successfully",
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

export {
    ListBuckets, CreateBucket, ListObjects, getObject, putObject, deleteObject
}