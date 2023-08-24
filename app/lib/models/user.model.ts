import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "user",
    required: true
  },
  provider: {
    type: String,
    enum: ["credentials", "google"],
  }
}, {timestamps: true})

export const Users = mongoose.models.Users || mongoose.model("Users", userSchema)