import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { ConfirmToken, NewPassword } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/services/AuthApi";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
    const navigate = useNavigate()

    const initialValues: NewPassword = {
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPassword) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >
                        New Password
                    </label>

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "New Password is required",
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters and include one symbol or number.'
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
                        Confirm New Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Please confirm your password",
                            validate: value => value === password || 'Passwords do not match'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Reset Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
