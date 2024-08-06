import api from "@/lib/axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegisterForm } from "@/types";
import { isAxiosError } from "axios";

export async function createAccount(formData: UserRegisterForm) {
    try {
        const url =  '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url =  '/auth/confirm-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url =  '/auth/request-code'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}