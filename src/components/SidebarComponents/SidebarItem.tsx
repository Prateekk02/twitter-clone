'use client'
import { IconType } from "react-icons";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";


interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
    label,
    href,
    icon: Icon, 
    onClick }) => {
        
    const router = useRouter();    
    const handleClick = useCallback(() => {
        if(onClick){
            onClick();
        }

        if(href){
            router.push(href );
        }
    },[router,href, onClick]) 
    return <>
        
            <button onClick={handleClick} className="flex flex-row items-center ">
                <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden transition">
                    <Icon size={28} color="white"/>
                </div>
                <div className="relative hidden lg:flex  gap-4 p-4 rounded-full  hover:bg-slate-300  hover:bg-opacity-10 cursor-pointer items-center transition">
                    <Icon size={24} color="white"/>
                    <p className="hidden  lg:block text-white text-xl font-bold">
                    {label}
                    </p>
                </div>
            </button>
        
       
    </>
}

export default SidebarItem;