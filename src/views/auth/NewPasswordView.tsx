import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { ConfirmToken } from "@/types"
import { useState } from "react"

const NewPasswordView = () => {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter a new password {''}
                <span className=" text-fuchsia-500 font-bold">for your account.</span>
            </p>

            {
                !isValidToken ? 
                    <NewPasswordToken 
                        token={token} 
                        setToken={setToken} 
                        setIsValidToken={setIsValidToken} 
                    />

                    :
                    
                    <NewPasswordForm token={token} />
            }
        </>
    )
}

export default NewPasswordView
