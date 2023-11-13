import axios from "axios";
import {BASE_URL_API} from "./index";


export class ImageService {
    private urlImage = 'images'

    public upload_image(file: File) {
        let formData = new FormData();
        formData.append('file', file);

        return axios.post(
            BASE_URL_API + this.urlImage + '/',
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
        )
    }

    public async download_image(key: string) {
        const response = await fetch(BASE_URL_API + this.urlImage + '?' + `key=${key}`, {
                credentials: "include",
            }
        )
        const blob = await response.blob()
        return URL.createObjectURL(blob);
    }
}

const imageService = new ImageService()

export default imageService;