import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { ForgotPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your email {''}
                <span className=" text-fuchsia-500 font-bold">and reset your password</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail not valid",
                            },
                        })}
                    />

                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send Instructions'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal"
                >
                    Have an account? {''}
                    <span className=" text-fuchsia-500 font-bold">Log in</span>
                </Link>

                <Link 
                    to={'/auth/signup'}
                    className="text-center text-gray-300 font-normal"
                >
                    Don't have an account? {''}
                    <span className=" text-fuchsia-500 font-bold">Sign up</span>
                </Link>
            </nav>
        </>
    )
}
