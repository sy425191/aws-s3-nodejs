import { Bucket } from "../models/buckets.model.js";

const GenerateHash = async (bucketName) => {
  const random =
    Math.random().toString(36).substring(2, 8) +
    "-" +
    Math.random().toString(36).substring(2, 8) +
    "-" +
    Math.random().toString(36).substring(2, 8) +
    "-" +
    Math.random().toString(36).substring(2, 8);
  // check if hash exists
  if (
    await Bucket.findOne({
      bucketName: bucketName,
      "objects.objectHash": random,
    })
  ) {
    return GenerateHash(bucketName);
  }
  return random;
};

export default GenerateHash;
