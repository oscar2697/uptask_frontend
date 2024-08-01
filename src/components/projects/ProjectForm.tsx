import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage'

type ProjectFormProps = {
    register:UseFormRegister<{
        projectName: string;
        clientName: string;
        description: string;
    }> 

    errors:FieldErrors<{
        projectName: string;
        clientName: string;
        description: string;
    }>
}

export default function ProjectForm({errors, register} : ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Name Project
                </label>

                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Project Name"
                    {...register("projectName", {
                        required: "The Projoect Name is Required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Client Name
                </label>

                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Cliente Name"
                    {...register("clientName", {
                        required: "The Client Name is Required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>

                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Project Description"
                    {...register("description", {
                        required: "Description of the Project is Required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}