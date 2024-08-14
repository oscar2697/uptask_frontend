import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/Profile.Api"
import { toast } from "react-toastify"

type ProfilePropsForm = {
    data: User
}

export default function ProfileForm({ data }: ProfilePropsForm) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    }) 

    const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Update your information here</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", {
                                required: "Username is required",
                            })}
                        />

                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            E-mail
                        </label>

                        <input
                            id="text"
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "The email address is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />

                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value='Save Changes'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}