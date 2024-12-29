import prisma from "@/lib/db";
import {  NextResponse } from "next/server";

const handler = async ({params} : {params: {userId: string}}) =>{
    try{

        const userId = params.userId;

        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID")  
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                id: userId
            }
        });

        if(!existingUser){
            throw new Error("User does not exists!")
        }

        const followersCount = await prisma.user.count({
            where:{
                followIds:{
                    has: userId
                }
            }
        });

        return NextResponse.json(
            {
                ...existingUser,
                followersCount
            },
            {
                status: 200
            }
        )
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: error}, {status: 400});
    }
}

export {handler as GET};