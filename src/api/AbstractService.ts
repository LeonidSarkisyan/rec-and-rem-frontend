import axios from "axios";
import {BASE_URL_API} from "./index";
import {FolderUpdateBody} from "../types/folder";
import {AbstractUpdateBody} from "../types/abstract";
import {Content} from "../types/content";


class AbstractService {
    private urlFolder = 'folder/'
    private urlAbstract = 'abstract/'
    private urlOpening = 'opening/'

    public async get_all_by_folder_id(folderId: number) {
        return  await axios.get((BASE_URL_API + this.urlFolder + folderId + '/' + this.urlAbstract), {
            withCredentials: true
        })
    }

    public async create(title: string, folderId: number) {
        const abstract = {title}
        return await axios.post(BASE_URL_API + this.urlFolder + folderId + '/' + this.urlAbstract, abstract, {
            withCredentials: true
        })
    }

    public async delete(abstractId: number) {
        return await axios.delete(BASE_URL_API + this.urlFolder + this.urlAbstract + abstractId, {
            withCredentials: true
        })
    }

    public async get_unique_url(abstractId: number) {
        return await axios.get(
            BASE_URL_API + this.urlFolder + this.urlAbstract + this.urlOpening + 'show/' + abstractId,
            {
                withCredentials: true
            }
        )
    }

    public async update(abstractId: number, abstractUpdateBody: AbstractUpdateBody) {
        const newAbstract: AbstractUpdateBody = {id: abstractId}
        let isOpen = abstractUpdateBody.is_open

        if (Object.hasOwn(abstractUpdateBody, 'title')) {
            delete abstractUpdateBody.id
            delete abstractUpdateBody.is_open
            newAbstract.title = abstractUpdateBody.title
            const responseTitleDescription = await axios.patch(
                BASE_URL_API + this.urlFolder + this.urlAbstract + abstractId, abstractUpdateBody, {
                    withCredentials: true
                })
        }
        if (isOpen === false || isOpen === true) {
            const responseOpen = await axios.post(
                BASE_URL_API + this.urlFolder + this.urlAbstract + this.urlOpening + abstractId, null, {
                    params: {
                        is_open: isOpen
                    },
                    withCredentials: true
                })
            newAbstract.is_open = isOpen
            newAbstract.unique_url = responseOpen.data.unique_url
        }
        return newAbstract
    }

    public async upload(url: string, folderId: number) {
        return await axios.get(BASE_URL_API + this.urlFolder + this.urlAbstract + this.urlOpening + url, {
            params:  {
                copy: true,
                folder_id: folderId
            },
            withCredentials: true
        })
    }

    public async get_content(abstract_id: number) {
        return await axios.get(BASE_URL_API + this.urlFolder + this.urlAbstract + abstract_id + '/content', {
            withCredentials: true
        })
    }

    public async set_content(abstract_id: number, content: string) {
        return await axios.post(BASE_URL_API + this.urlFolder + this.urlAbstract + abstract_id + '/content', {
            content: content
        }, {
            withCredentials: true
        })
    }
}

const abstractService = new AbstractService()

export default abstractService