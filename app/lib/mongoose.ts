import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  mongoose.set("strictQuery", true)
  
  if(!process.env.MONGODB_URI) return console.log("Can't connect to mongodb")
  if(isConnected) return console.log("Connect to mongodb")

  try {
    const MONGODB_URI = process.env.MONGODB_URI
    await mongoose.connect(MONGODB_URI)
    isConnected = true
    console.log("Connect to mongodb")
  } catch (error) {
    console.log("errors", error)
  }
}