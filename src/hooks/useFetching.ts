import {useState} from "react";
import axios from "axios";


type callbackType = (...args: any) => void

export const useFetching = (callback: callbackType) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.detail)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {fetching, isLoading, error, setError}
}

