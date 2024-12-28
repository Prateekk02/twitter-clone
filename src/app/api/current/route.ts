import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";


const handle =  async () => {
  try {
    const currentUser = await serverAuth();    
    return NextResponse.json({ currentUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 401 });
  }
}

export {handle as GET};
