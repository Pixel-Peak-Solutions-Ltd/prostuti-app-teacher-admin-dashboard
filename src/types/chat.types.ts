import { TImage } from "./common.types";

export interface IMessage {
    _id: string;
    senderId: string;
    conversationId: string;
    content: string;
    attachments?: TImage[];
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    sender?: {
        _id: string;
        name: string;
        profileImage?: TImage;
    };
}

export interface IConversation {
    _id: string;
    participants: IParticipant[];
    lastMessage?: string;
    lastMessageText?: string;
    lastMessageTime?: string;
    updatedAt: string;
    createdAt: string;
    otherUser: {
        _id: string;
        name: string;
        profileImage?: TImage;
    };
    unreadCount: number;
}

export interface IParticipant {
    userId: string;
    unreadCount: number;
    lastSeen?: string;
}