import {useCallback, useRef} from "react";


type callbackType = (...args: any) => void


export default function(callback: callbackType, delay: number) {
    const timer = useRef()

    const debouncedCallback = useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        // @ts-ignore
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    },[callback, delay])

    return debouncedCallback
}
