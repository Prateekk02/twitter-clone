'use client'
import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar/Avatar";



const FollowBar = () =>{
    const {data: users = []} = useUsers();

    if(users.length === 0){
        return <div className="text-gray-500 px-6">No users to follow at the moment.</div>;
    }
    return <>
        <div className="px-6 py-6  hidden lg:block">
            <div className="rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                {users.map((user:Record<string, any>) => (
                    <div key={user.id} className="flex flex-row gap-4">
                        <Avatar userId={user.id} />
                        <div className="flex flex-col">
                            <p className="text-white font-semibold text-sm cursor-default">{user.name}</p>
                            <p className="text-neutral-400 text-sm cursor-default ">@{user.username}</p>
                        </div>
                    </div>
                ))}

                </div>
            </div>    
        </div>      

    </>
}

export default FollowBar;