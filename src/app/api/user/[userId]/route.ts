import prisma from "@/lib/db";
import { NextResponse } from "next/server";



const handler = async ({ params }: { params: Promise<{ userId: string }> }) => {
    const userId = (await params).userId; 

    
    try {
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!existingUser) {
            throw new Error("User does not exist!");
        }

        const followersCount = await prisma.user.count({
            where: {
                followIds: {
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
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
};

export { handler as GET };
