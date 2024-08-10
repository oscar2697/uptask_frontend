import { useForm } from "react-hook-form";
import { UserRegisterForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: UserRegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues })
    
    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        },
    })

    const password = watch('password');
    const handleRegister = (formData: UserRegisterForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Sign Up</h1>
            <p className="text-2xl font-light text-white mt-5">
                It’s quick and easy {''}
                <span className=" text-fuchsia-500 font-bold"> create an accout</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
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
                            required: "An email address is necessary to sign up",
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
                        Name
                    </label>

                    <input
                        type="name"
                        placeholder="Full Name"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "What's Your Name?",
                        })}
                    />

                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                            required: "Please create a password.",
                            minLength: {
                                value: 8,
                                message: 'Enter a combination of at least 8 letters'
                            }
                        })}
                    />

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >
                        Retype Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Retype Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repeat Your Password",
                            validate: value => value === password || 'The Password does not match'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign Up'
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
                    to='/auth/reset'
                    className="text-center text-gray-300 font-normal"
                >
                    Forgotten your password?
                </Link>
            </nav>
        </>
    )
}
