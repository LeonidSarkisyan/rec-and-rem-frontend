import axios from "axios";
import {BASE_URL_API} from "./index";

class AuthService {
    private url = 'account/'

    public async login(username: string, password: string) {
        const login = {
            email: username,
            password: password
        }

        return await axios.post(BASE_URL_API + this.url + 'login', login, {
            withCredentials: true
        })
    }
}

const auth_service = new AuthService()

export default auth_service
