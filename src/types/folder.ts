export interface Folder {
    id: number
    is_deleted: boolean
    is_open: boolean
    title: string
    url_open: string
    workspace_id: number
}

export interface FolderUpdateBody {
    id?: number
    is_deleted?: boolean
    is_open?: boolean
    title?: string
    unique_url?: string
    workspace_id?: number
}