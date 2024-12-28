
import { getServerSession } from "next-auth/next";
import authOption from "@/app/api/auth/[...nextauth]/options";
import prisma from "./db";
import { Session } from "next-auth";


const serverAuth = async () => {
  const session = await getServerSession(authOption) as Session; 

  if (!session || !session?.user.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
