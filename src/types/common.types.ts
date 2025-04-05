export interface TImage {
    diskType: string;
    path: string;
    originalName: string;
    modifiedName: string;
    fileId: string;
}

export interface IMeta {
    page: number;
    limit: number;
    total: number;
}

export interface IQueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    [key: string]: any;
}

export interface IApiResponse<T> {
    success: boolean;
    message: string;
    meta?: IMeta;
    data: T;
}