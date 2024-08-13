import { NoteFormData } from "@/types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

const AddNoteForm = () => {
    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId =  params.projectId!
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: '',
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
        reset()
    }

    return (
        <form 
            onSubmit={handleSubmit(handleAddNote)}
            className='space-y-3'
            noValidate
        >
            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor='content'>New Note</label>

                <input
                    id='content'
                    type='text'
                    placeholder='Enter your note'
                    className='w-full p-3 border border-gray-300'
                    {...register('content', {
                        required: 'Note is required',
                    })}
                />

                {errors.content && (
                    <ErrorMessage>{errors.content?.message} </ErrorMessage>
                )}
            </div>

            <input
                type='submit'
                value='Add Note'
                className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
            />
        </form>
    )
}

export default AddNoteForm
