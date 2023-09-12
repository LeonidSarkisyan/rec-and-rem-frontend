import axios from "axios";
import {BASE_URL_API} from "./index";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

class AuthService {
    private url = 'account/'
    private urlProfile = 'profiles/'

    public async login(username: string, password: string) {
        const login = {
            email: username,
            password: password
        }

        return await axios.post(BASE_URL_API + this.url + 'login', login, {
            withCredentials: true
        })
    }

    public async register(username: string, password: string, firstName: string, secondName: string, profileName: string) {
        const user = {
            email: username,
            hashed_password: password
        }

        const profile = {
            first_name: firstName,
            second_name: secondName,
            username: profileName
        }

        await axios.post(BASE_URL_API + this.url + 'register/', user).then(async (value) => {
            await this.login(username, password).then(async (value) => {

            })
        })

        return await axios.post(BASE_URL_API + this.urlProfile, profile, {
            withCredentials: true
        })
    }

    public async get_user() {
        return await axios.get(BASE_URL_API + this.url + 'me', {
            withCredentials: true
        })
    }
}

const auth_service = new AuthService()

export default auth_service
