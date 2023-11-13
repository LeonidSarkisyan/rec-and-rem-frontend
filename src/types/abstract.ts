export interface Abstract {
    id: number
    title: string
    is_open: boolean
    url_open: string
    is_deleted: boolean
}

export interface AbstractUpdateBody {
    id?: number
    is_deleted?: boolean
    is_open?: boolean
    title?: string
    unique_url?: string
}