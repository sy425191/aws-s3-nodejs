import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    buckets: [
        {
        type: Schema.Types.ObjectId,
        ref: "Bucket"
        }
    ]
    });


export const User = mongoose.model("User", UserSchema);

