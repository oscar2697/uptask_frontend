import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: loginUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Welcome Back!</h1>
            <p className="text-2xl font-light text-white mt-5">
                We´re so excited {''}
                <span className=" text-fuchsia-500 font-bold">to see you again!</span>
            </p>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Please enter your email address",
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

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "A password is needed to log in",
                        })}
                    />

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Log in'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    to={'/auth/signup'}
                    className="text-center text-gray-300 font-normal"
                >
                    Don't have an account? {''}
                    <span className=" text-fuchsia-500 font-bold">Sign up</span>
                </Link>

                <Link
                    to='/auth/reset'
                    className="text-center text-gray-300 font-normal"
                >
                    Forgotten your password?
                </Link>
            </nav>
        </>
    )
}