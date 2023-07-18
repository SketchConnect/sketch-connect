import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema({
  isPublic: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "ongoing", "completed", "cancelled"],
    required: true
  },
  players: {
    type: [String],
    default: [],
    required: true
  },
  quadrants: {
    type: [String],
    default: [],
    required: true
  },
  finalImage: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  }
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
