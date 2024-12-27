import { DefaultSession } from "next-auth"; 

declare module "next-auth"{
    interface Session{
        user:{
            name: string,
            username: string,
            email: string
        } & DefaultSession["user"]
    }
}
