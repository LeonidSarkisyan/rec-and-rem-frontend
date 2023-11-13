import React, {useEffect} from "react";

type callbackType = (...args: any) => void

function useClickOutside(callback: callbackType, ref: unknown) {
    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useClickOutside;

