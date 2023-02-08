import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },

  nickname: {
    required: false,
    type: String,
  },
});

export default userSchema;
