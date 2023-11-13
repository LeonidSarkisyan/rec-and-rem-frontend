import axios from "axios";
import {BASE_URL_API} from "./index";
import {WorkspaceUpdateBody} from "../types/workspace";
import {FolderUpdateBody} from "../types/folder";


class FolderService {
    private urlWorkspace = 'workspace/'
    private urlFolder = 'folder/'
    private urlOpening = 'opening/'

    public async get_all_by_workspace_id(workspaceId: number, querySearch?: string) {
        return  await axios.get((BASE_URL_API + this.urlWorkspace + workspaceId + '/' + this.urlFolder), {
            params: {
                query_search: querySearch
            },
            withCredentials: true
        })
    }

    public async create(title: string, workspaceId: number) {
        const folder = {title}
        return await axios.post(BASE_URL_API + this.urlWorkspace + workspaceId + '/' + this.urlFolder, folder, {
            withCredentials: true
        })
    }

    public async update(folderId: number, folderUpdateBody: FolderUpdateBody) {
        const newFolder: FolderUpdateBody = {id: folderId}
        let isOpen = folderUpdateBody.is_open

        if (Object.hasOwn(folderUpdateBody, 'title')) {
            delete folderUpdateBody.id
            delete folderUpdateBody.is_open
            newFolder.title = folderUpdateBody.title
            const responseTitleDescription = await axios.patch(
                BASE_URL_API + this.urlWorkspace + this.urlFolder + folderId, folderUpdateBody, {
                withCredentials: true
            })
        }
        if (isOpen === false || isOpen === true) {
            const responseOpen = await axios.post(
                BASE_URL_API + this.urlWorkspace + this.urlFolder + this.urlOpening + folderId, null, {
                params: {
                    is_open: isOpen
                },
                withCredentials: true
            })
            newFolder.is_open = isOpen
            newFolder.unique_url = responseOpen.data.unique_url
        }
        return newFolder
    }

    public async delete(folderId: number) {
        const response = await axios.delete(BASE_URL_API + this.urlWorkspace + this.urlFolder + folderId, {
            withCredentials: true
        })
        console.log(response)
    }

    public async get_unique_url(folderId: number) {
        return await axios.get(
            BASE_URL_API + this.urlWorkspace + this.urlFolder + this.urlOpening + 'show/' + folderId,
            {
            withCredentials: true
            }
        )
    }

    public async upload(url: string, workspaceId: number) {
        return await axios.get(BASE_URL_API + this.urlWorkspace + this.urlFolder + this.urlOpening + url, {
            params:  {
                copy: true,
                workspace_id: workspaceId
            },
            withCredentials: true
        })
    }
}

const folderService = new FolderService()

export default folderService