'use client'
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../InputComponent/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";



const LoginModal = () =>{
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  
    const onSubmit = useCallback(async () =>{
        try{
            setLoading(true);
            
            await signIn('credentials',{
                email,
                password,
                redirect:false
            })

            loginModal.onClose();
            toast.success("Login Successful!")
            
            
            

        }catch(error){
            console.log(error);
            toast.error("Login failed!")
            
        }
        finally{
            setLoading(false);            
        }
    },[loginModal, email, password])
    
    const onToggle = useCallback(() => {
        if(loading){
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    },[loading, loginModal,registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
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
            <p className="cursor-default">Don&apos;t have an account?
                <button onClick={onToggle} className="text-white cursor-pointer  hover:animate-pulse transition pl-2">
                    Create an account
                </button>
            </p>
        </div>
    )
    
    return <>
        <Modal
            disabled={loading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose} 
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    </> 
}

export default LoginModal;