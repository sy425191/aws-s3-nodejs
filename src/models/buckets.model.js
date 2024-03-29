import mongoose, { Schema } from "mongoose";

const BucketSchema = new Schema({
  bucketName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  objects: [
    {
      fileHash: {
        type: String,
        lowercase: true,
        trim: true,
      },
      fileName: {
        type: String,
        lowercase: true,
        trim: true,
      },
      fileType: {
        type: String,
        lowercase: true,
        trim: true,
      },
      fileSize: {
        type: Number,
        lowercase: true,
        trim: true,
      },
      filePath: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
  ],
});


export const Bucket = mongoose.model("Bucket", BucketSchema);
