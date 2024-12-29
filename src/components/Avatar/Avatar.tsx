'use client'
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps{
    userId: string,
    isLarge?: boolean,
    hasBorder?: boolean
}

const Avatar:React.FC<AvatarProps> = ({
    userId, 
    isLarge,
    hasBorder
}) =>{
    const router = useRouter();
    const {data: fetchedUser } = useUser(userId); 

    const onClick = useCallback((event:React.MouseEvent<HTMLButtonElement> ) =>{
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    },[router, userId])

    return <>
        <div className={`
                ${isLarge? 'h-32' : 'h-14'}
                ${isLarge? 'w-32' : 'w-14'}
                ${hasBorder? "border-4 border-black": ""}
                rounded-full
                hover:opacity-90
                transition
                cursor-pointer
                relative
        `}>
            <Image 
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                src={fetchedUser?.profileImage || '/images/placeholder.png'}
            />
        </div>
    </>
} 

export default Avatar;