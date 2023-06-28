import mongoose from 'mongoose'

const connectDB = async (url) => {
   // return mongoose.connect(url)
   try {
      const conn = await mongoose.connect(url);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
}
export default connectDB
