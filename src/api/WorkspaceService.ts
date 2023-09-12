import axios from "axios";
import {BASE_URL_API} from "./index";
import {WorkspaceUpdateBody} from "../types/workspace";


class WorkspaceService {
    private url = 'workspace/'
    private urlOpening = 'opening/'

    public async get_all() {
        return await axios.get(BASE_URL_API + this.url, {
            withCredentials: true
        })
    }

    public async create(title: string, description: string) {
        const newWorkspace = {
            title,
            description
        }

        return await axios.post(BASE_URL_API + this.url, newWorkspace, {
            withCredentials: true
        })
    }

    public async get_unique_url(workspaceId: number) {
        return await axios.get(BASE_URL_API + this.url + this.urlOpening + 'show/' + workspaceId, {
            withCredentials: true
        })
    }

    public async update(workspaceId: number, workspaceUpdateBody: WorkspaceUpdateBody) {
        const newWorkspace: WorkspaceUpdateBody = {id: workspaceId}
        let isOpen = workspaceUpdateBody.is_open

        if (Object.hasOwn(workspaceUpdateBody, 'title') || Object.hasOwn(workspaceUpdateBody, 'description')) {
            delete workspaceUpdateBody.id
            delete workspaceUpdateBody.is_open
            newWorkspace.title = workspaceUpdateBody.title
            newWorkspace.description = workspaceUpdateBody.description
            const responseTitleDescription = await axios.patch(BASE_URL_API + this.url + workspaceId, workspaceUpdateBody, {
                withCredentials: true
            })
        }
        if (isOpen === false || isOpen === true) {
            const responseOpen = await axios.post(BASE_URL_API + this.url + this.urlOpening + workspaceId, null, {
                params: {
                    is_open: isOpen
                },
                withCredentials: true
            })
            newWorkspace.is_open = isOpen
            newWorkspace.unique_url = responseOpen.data.unique_url
        }
        return newWorkspace
    }
}

const workspaceService = new WorkspaceService()

export default workspaceService