import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  quadrant: {
    type: [String],
    default: [],
    required: true
  },
  finalImage: {
    type: String,
    default: ""
  }
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
