import {ChangeEvent, useState} from "react";
import {setType} from "../types/base";

export default function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return [
        value, onChange
    ]
}