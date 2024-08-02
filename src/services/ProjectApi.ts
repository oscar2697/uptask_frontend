import api from "@/lib/axios";
import { dashboardSchema, ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProject() {
    try {
        const {data} = await api('/projects')
        const response = dashboardSchema.safeParse(data)
        
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}