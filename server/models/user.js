import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  oauthProvider: {
    type: String,
    required: true,
  },
  oauthID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sessions: {
    type: [String],
  },
  profilePic: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
