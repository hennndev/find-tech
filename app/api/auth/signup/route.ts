import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import { Users } from '@/app/lib/models/user.model'


export async function POST(request: Request, response: Response) {
  await connectDB()

  try {
    const { username, email, password } = await request.json()
    const checkEmail = await Users.findOne({email: email})
    if(checkEmail) {
      throw Error("Failed, email already used!")
    } else {
      const salt = await bcrypt.genSalt(10)
      const encryptPassword = await bcrypt.hash(password, salt)
      const newAccount = {
        username, 
        email, 
        password: encryptPassword,
        role: "user",
        provider: "credentials"
      }
      await Users.create(newAccount)
      return NextResponse.json({
        message: "Success, create account!"
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}