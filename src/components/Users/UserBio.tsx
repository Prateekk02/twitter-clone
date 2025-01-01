'use client'
import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import {format} from 'date-fns';
import {Button} from '@/components';

interface UserBioProps{
    userId: string
}

export const UserBio:React.FC<UserBioProps> = ({userId}) =>{
    const {data: currentUser} = useCurrentUser();
    const {data: fetchedUser} = useUser(userId)
    console.log("Feteched User: ",fetchedUser)

    const createdAt = useMemo(() =>{
        if(!fetchedUser?.createdAt){
            return null;
        }

        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');

    },[fetchedUser?.createdAt])

    return <>
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId? (
                    <Button secondary  label="Edit" onClick={() =>{}} />
                ) : (
                    <Button secondary  label="Follow" onClick={() =>{}}/>
                ) }
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">{fetchedUser?.name }</p>
                    <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
                </div>
            </div>
        </div>
    </>
}