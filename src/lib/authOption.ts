import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/db';

const authOption =  NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email', type:'text'},
                password:{label:'password', type:'password'}
            },
            async authorize(credentials){
                try{
                    if(!credentials?.email || !credentials?.password){
                         
                        throw new Error('Invalid Credentials')

                    }
    
                    const user = await prisma.user.findUnique({
                        where:{
                            email: credentials.email
                        }
                    })
    
                    if(!user || !user.hashedPassword){
                        throw new Error('Invalid Credentials')
                    }
    
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword) ;
    
                    if(!isPasswordCorrect){
                        throw new Error('Invalid Password')
                    }

                    return user;
                }catch(error){
                    console.error(error)
                    throw new Error('Something went wrong')

                }                               
            }

        })
    ],
    
    
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:"jwt"
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ url, baseUrl }) {
          
          if (url.startsWith(baseUrl)) return url;
          if (url.startsWith('/')) return new URL(url, baseUrl).toString();
          return baseUrl;
        }
    }

})

export  default authOption;