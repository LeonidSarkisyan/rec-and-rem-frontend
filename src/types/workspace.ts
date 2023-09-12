export interface Workspace {
    id: number
    title: string
    description: string
    is_open: boolean
    url_open: string
}

export interface WorkspaceUpdateBody {
    id?: number
    title?: string
    description?: string
    is_open?: boolean
    unique_url?: string
}