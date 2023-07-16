import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   description: {
      type: String,
      trim: true,
      default: "Here the description"
   },
   assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Course', courseSchema)