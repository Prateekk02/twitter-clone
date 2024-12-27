import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcrypt';


export async function POST(req: NextRequest){
    try{
        const {email, username, password, name } = await req.json();

        if(!email || !username || !password || !name){
            return NextResponse.json({error:"Missing required fields"}, {status:400});
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser){
            return NextResponse.json({error:"User already exists"}, {status: 409});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data:{
                email, 
                username,
                hashedPassword,
                name                
            }
        });

        return NextResponse.json({user}, {status:201})

    }catch(error){
        console.error(error);
        return NextResponse.json({error:"An error occurred "}, {status: 500}); 
    }
}