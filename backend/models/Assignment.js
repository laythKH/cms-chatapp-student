import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   description: {
      type: String,
      required: true,
      trim: true
   },
   dueDate: {
      type: Date,
      required: true
   },
   course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

export default mongoose.model('Assignment', assignmentSchema);