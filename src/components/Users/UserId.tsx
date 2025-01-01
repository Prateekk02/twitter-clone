'use client'
import { useParams } from "next/navigation"
import Header from "../HomeComponent/Header"
import useUser from "@/hooks/useUser";
import {UserProfileSkeleton} from "@/components";
import { UserHero } from "@/components";
import { UserBio } from "@/components";


export default function UserId() {
    const {userId} = useParams<{ userId:string }>(); 

    const {data: fetchedUser, isLoading} = useUser(userId)

    if(isLoading || !fetchedUser){
        return (<>
            <Header showBackArrow label="User Profile " /> 
            <UserProfileSkeleton />
        </>)
    }
    
    return <>
        <Header showBackArrow label="User Profile " /> 
        <UserHero userId={userId } />
        <UserBio userId={userId} />
    </>
}

