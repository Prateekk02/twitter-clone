'use client'
import { useRouter } from "next/navigation"
import { BsTwitterX } from "react-icons/bs"

export default function SidebarLogo(){
    const router = useRouter();
    return <>
         <button onClick={() => router.push('/')} className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition ">
            <BsTwitterX size={28} color="white" />
         </button>
    </>
} 