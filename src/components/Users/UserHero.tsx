'use client'
import useUser from "@/hooks/useUser"
import Image from "next/image"
import {Avatar} from '@/components'

interface UserHeroProps{
    userId: string  
}

export const UserHero:React.FC<UserHeroProps> = ({userId}) =>{
    const {data:fetchedUser} = useUser(userId);
    

    return <>
        <div className="bg-neutral-700 h-44 relative ">
            {fetchedUser?.coverImage && (
                <Image
                    src={fetchedUser.coverImage}
                    fill
                    alt="Cover Image"
                    style={{objectFit: 'cover'}}
                />
            ) }
            <div className="absolute -bottom-16">
                <Avatar userId={userId} isLarge hasBorder/>
            </div>
        </div>
    </>
}