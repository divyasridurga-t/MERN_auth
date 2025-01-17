import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('connected to database')
    })
    await mongoose.connect(`mongodb+srv://sridivya8143:12345678@mernauth.db6uc.mongodb.net/mernAuth`);
}

export default connectDB;