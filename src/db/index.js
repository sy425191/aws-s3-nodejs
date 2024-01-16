import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URI)
        console.log('Database is connected HOST: ', connectionInstance.connection.host)

    } catch (error) {
        console.error("Mongoose Connection Failed, Error: ", error)
        throw error
    }
}

export default connectDatabase;