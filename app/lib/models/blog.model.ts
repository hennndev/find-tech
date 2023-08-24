import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'


const blogSchema = new Schema({
  blogTitle: {
    type: String,
    required: true
  },
  blogAuthor: {
    type: String,
    required: true
  },
  blogCategories: [
    {
      category: {
        type: String,
        required: true
      }
    }
  ],
  blogImage: {
    imageId: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    }
  },
  blogDescriptions: [
    {
      descriptionTitle: {
        type: String,
        required: true
      },
      descriptionContent: {
        type: String,
        required: true
      }
    }
  ],
  blogComments: [
    {
      comment: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
      createdAt: {
        type: Date,
        required: true
      } 
    }
  ]
}, {timestamps: true})

export const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema)

