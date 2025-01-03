'use client'
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";


const SidebarTweetButton = () =>{
    const router = useRouter(); 
    const loginModal = useLoginModal();
    const handleClick = useCallback(()=>{
            loginModal.onOpen();      
         },[loginModal])
    return <>
        <button onClick={handleClick}>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14  p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                <FaFeather size={24} color="white"/>
            </div>
        </button>
        <button onClick={handleClick} className=" mt-6 hidden w-full  lg:block px-4 py-3  rounded-full bg-zinc-300 hover:bg-opacity-90 cursor-pointer transition">
            <p className="hidden lg:block text-center font-semibold text-black text-[20px] ">Post</p>
        </button>
    </>
}

export default SidebarTweetButton;