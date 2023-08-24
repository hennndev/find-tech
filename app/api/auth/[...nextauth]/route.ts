import NextAuth from 'next-auth/next'
import bcrypt from 'bcryptjs'
import { Awaitable, NextAuthOptions, User } from 'next-auth'
import { connectDB } from '@/app/lib/mongoose'
import { Users } from '@/app/lib/models/user.model'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials){
        const { email, password } = credentials as {
          email: string, password: string
        }
        await connectDB()
        const checkUser = await Users.findOne({email: email})
        if(checkUser) {
          const checkPassword = await bcrypt.compare(password, checkUser?.password)
          if(checkPassword) {
            return {
              name: checkUser.username,
              email: checkUser.email,
              role: checkUser.role,
              image: null
            }
          } else {
            throw new Error('Password incorrect!')
          }
        } else {
          throw new Error('User not exist!')
        }
      }
    })
  ],
  callbacks: {
    async signIn({account, profile}) {
      if(account?.provider === "google") {
        await connectDB()
        const checkUser = await Users.findOne({email: profile?.email})
        if(!checkUser) {
          await Users.create({
            username: profile?.name,
            email: profile?.email,
            role: "user",
            provider: account.provider
          })
        }
        return true
      } 
      return true
    },
    async jwt({token, user, account}: {token: any, user: any, account: any}) {
      if(user) {
        token.role = account?.provider === "google" ? "user" : user.role
      }
      return {...token, ...user}
    },
    async session({session, token}) {
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: "/login"
  }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }