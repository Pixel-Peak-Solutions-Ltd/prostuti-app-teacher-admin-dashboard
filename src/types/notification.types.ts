export interface INotificationRecipient {
    _id: string;
    role: string;
    registeredId: string;
}

export interface INotificationSender {
    _id: string;
    role: string;
    registeredId: string;
}

export interface INotificationMetaData {
    requestedBy: string;
    requestedAt: string;
    [key: string]: any; // To allow for additional metadata fields
}

export interface INotification {
    _id: string;
    recipient: INotificationRecipient;
    sender: INotificationSender;
    type: 'EditRequest' | 'CourseApproved' | 'General';
    title: string;
    message: string;
    resourceType: 'Course' | 'Assignment' | 'RecodedClass' | 'Resource' | 'Test';
    resourceId: string;
    isRead: boolean;
    metaData?: INotificationMetaData;
    createdAt: string;
    updatedAt: string;
}

export interface INotificationResponse {
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        count: number;
    };
    data: INotification[] | INotification;
}

export interface IUnreadCountResponse {
    success: boolean;
    message: string;
    data: {
        count: number;
    };
}

export interface INotificationFilter {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isRead?: boolean;
    type?: string;
    resourceType?: string;
    searchTerm?: string;
}

export interface IEditRequestPayload {
    resourceType: 'Course' | 'Assignment' | 'RecodedClass' | 'Resource' | 'Test';
    resourceId: string;
    title: string;
    message: string;
}

export interface IEditRequest {
    _id: string;
    recipient: INotificationRecipient;
    sender: INotificationSender;
    type: 'EditRequest';
    title: string;
    message: string;
    resourceType: 'Course' | 'Assignment' | 'RecodedClass' | 'Resource' | 'Test';
    resourceId: string;
    isRead: boolean;
    metaData: INotificationMetaData;
    createdAt: string;
    updatedAt: string;
}

export interface IEditRequestResponse {
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        count: number;
    };
    data: IEditRequest[] | IEditRequest;
}