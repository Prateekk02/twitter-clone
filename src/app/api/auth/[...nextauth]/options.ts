import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth'; 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/db';


const authOption:NextAuthOptions =  {
    
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
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
    pages:{
        signIn:'/',
        signOut:'/',
         
    },
    callbacks: {
        async signIn({ user }) {
            if (user) {
                console.log(`User ${user.email} signed in successfully`);
                return true; 
            }
            console.error('Sign-in failed: Invalid user or credentials');
            return false;
        },
        async redirect({ url, baseUrl }) {
            
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith('/')) return new URL(url, baseUrl).toString();
            return baseUrl;
        },
        async session({session, token}){
            if (token) {
                session.user = {
                  ...session.user,
                  id: token.id as string,
                  email: token.email || '',
                  name: token.name || '' 
                };
              }
              return session;
        },
        async jwt({token , user}){
            if(user){
                token.id = user.id?.toString() || ''
                token.email = user.email || ''
                token.name = user.name || ''
            }
            return token
        }
    }

} 

export  default authOption;