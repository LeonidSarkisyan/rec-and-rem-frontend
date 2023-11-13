import axios from "axios";
import {BASE_URL_API} from "./index";


export class AvatarService {
    private urlWorkspace = 'workspace/'

    public async upload_file(workspaceId: number, file: File) {
        let formData = new FormData();
        formData.append('file', file);

        return await axios.post(
            BASE_URL_API + this.urlWorkspace + workspaceId,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }
        )
    }

    public async download_file(workspaceId: number) {
        const response = await fetch(BASE_URL_API + this.urlWorkspace + workspaceId + '/avatar', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'image/jpeg',
            },
            credentials: "include"
        })
        const blob = await response.blob()
        return URL.createObjectURL(blob);
    }
}

const avatarService = new AvatarService()

export default avatarService