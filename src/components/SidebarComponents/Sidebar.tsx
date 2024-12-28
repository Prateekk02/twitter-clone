'use client'
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

export default function Sidebar() {

    const {data: currentUser} = useCurrentUser(); 
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill,
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: FaUser,
            auth: true
        },
    ];

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">            
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">                    
                    <SidebarLogo />                    
                   
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                        />
                    ))}
                    {currentUser && (<SidebarItem onClick={() => signOut() } icon={BiLogOut} label="Logout" />)}
                    <SidebarTweetButton />
                </div>

            </div>

           
            
        </div>
    );
}
