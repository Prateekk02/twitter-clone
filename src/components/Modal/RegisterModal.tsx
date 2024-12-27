'use client'
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../InputComponent/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const RegisterModal = () =>{
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const onSubmit = useCallback(async () =>{
        try{
            setLoading(true);
            // TODO Register Logic.
            registerModal.onClose();

        }catch(error){
            console.log(error);
            
        }
        finally{
            setLoading(false);            
        }
    },[registerModal])
    
    const onToggle = useCallback(() => {
        if(loading){
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();

    },[loading, registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                onChange={e => setName(e.target.value)}
                value={name}
                disabled={loading}
            />
            <Input
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
                value={username}
                disabled={loading}
            />
            <Input 
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                disabled={loading}
            />
            <Input 
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                type="password"
                value={password}
                disabled={loading}            
            />
        </div>
    ) 

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p className="cursor-default">Already have an account?
                <button onClick={onToggle} className="text-white cursor-pointer  hover:animate-pulse transition pl-2">
                    Sign in
                </button>
            </p>
        </div>
    )
    
    return <>
        <Modal
            disabled={loading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose} 
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    </> 
}

export default RegisterModal;