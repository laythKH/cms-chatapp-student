import mongoose from "mongoose"

const solutionSchema = new mongoose.Schema({
   content: {
      type: String,
      required: true,
      trim: true
   },
   dateSubmitted: {
      type: Date,
      default: Date.now
   },
   status: {
      type: String,
      enum: ['Pending', 'Approved'],
      default: 'Pending'
   },
   student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }
});

export default mongoose.model('Solution', solutionSchema)