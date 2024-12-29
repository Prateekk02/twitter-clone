import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const handler = async () =>{
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt:'desc'
            }
        });

        return NextResponse.json(users, {status:200});
    }catch(error){
        console.error(error);
        return NextResponse.json({error: error}, {status: 400});
    }
};

export {handler as GET} 