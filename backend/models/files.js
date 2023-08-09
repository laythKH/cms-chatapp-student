import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   url: {
      type: String,
      required: true,
      trim: true
   },
   course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

export default mongoose.model('File', fileSchema)


