import {useEffect, useState} from "react";

export function useValidFormData(values: string[]) {
    const [isValid, setIsValid] = useState<boolean>(true)

    useEffect(() => {
        setIsValid(true)
        for (const value of values) {
            if (value.length === 0) {
                setIsValid(false)
            }
        }
    }, [...values])

    return isValid
}