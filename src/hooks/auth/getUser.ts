import auth_service from "../../api/AuthService";
import {isAxiosError} from "axios";
import {useState} from "react";


type callbackType = () => void


export const useCurrentUser = (callbackSuccess: callbackType, callbackError: callbackType) => {

    const getUser = async () =>  {
        try {
            await auth_service.get_user()
            await callbackSuccess()
        } catch (error) {
            if (isAxiosError(error)) {
                await callbackError()
            }
        }
    }

    return {getUser}
}

export default useCurrentUser;