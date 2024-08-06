import api from "@/lib/axios";
import { ConfirmToken, UserRegisterForm } from "@/types";
import { isAxiosError } from "axios";

export async function createAccount(formatData: UserRegisterForm) {
    try {
        const url =  '/auth/create-account'
        const {data} = await api.post<string>(url, formatData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function confirmAccount(formatData: ConfirmToken) {
    try {
        const url =  '/auth/confirm-account'
        const {data} = await api.post<string>(url, formatData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}