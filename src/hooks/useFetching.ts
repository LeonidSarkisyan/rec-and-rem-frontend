import {useState} from "react";
import axios from "axios";


type callbackType = () => void

export const useFetching = (callback: callbackType) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
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

