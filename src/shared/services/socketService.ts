import { io, Socket } from 'socket.io-client';
import { store } from '../../redux/store';
import {
    addMessage,
    addPendingBroadcast,
    removePendingBroadcast,
    setTypingStatus
} from '../../redux/features/chat/chatSlice';
import { SocketEvents } from '../../types/chat.types';

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;
    private baseUrl = import.meta.env.VITE_BASE_URL; // Using the same URL as API calls

    private constructor() {
        // Private constructor to enforce singleton pattern
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public isConnected(): boolean {
        return this.socket !== null && this.socket.connected;
    }

    public connect(token: string): void {
        if (this.socket && this.socket.connected) {
            console.log('Socket already connected');
            return;
        }

        console.log('Connecting to socket server...');
        this.socket = io(this.baseUrl, {
            auth: { token },
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        this.setupEventListeners();
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    private setupEventListeners(): void {
        if (!this.socket) return;

        // Connection events
        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        this.socket.on('authenticated', (data) => {
            console.log('Socket authenticated', data);
        });

        this.socket.on('authentication_error', (error) => {
            console.error('Socket authentication error', error);
        });

        // Broadcast events
        this.socket.on('new_broadcast_available', (broadcastData) => {
            console.log('New broadcast available', broadcastData);
            store.dispatch(addPendingBroadcast(broadcastData));
        });

        this.socket.on('broadcast_accepted', (data) => {
            console.log('Broadcast accepted', data);
            store.dispatch(removePendingBroadcast(data.broadcast_id));
        });

        this.socket.on('broadcast_expired', (data) => {
            console.log('Broadcast expired', data);
            store.dispatch(removePendingBroadcast(data.broadcast_id));
        });

        // Chat events
        this.socket.on('receive_message', (messageData) => {
            console.log('Socket: Message received', messageData);
            if (messageData && messageData.conversation_id) {
                store.dispatch(addMessage({
                    conversationId: messageData.conversation_id,
                    message: messageData
                }));
            } else {
                console.error('Received message has invalid format:', messageData);
            }
        });

        this.socket.on('typing', (data) => {
            console.log('User typing', data);
            if (data && data.conversation_id) {
                store.dispatch(setTypingStatus({
                    conversationId: data.conversation_id,
                    isTyping: true
                }));
            }
        });


        this.socket.on('send_message', (data) => {
            console.log('Message send confirmation:', data);
            if (!data.success) {
                console.error('Failed to send message:', data);
            }
        });

        this.socket.on('stop_typing', (data) => {
            console.log('User stopped typing', data);
            if (data && data.conversation_id) {
                store.dispatch(setTypingStatus({
                    conversationId: data.conversation_id,
                    isTyping: false
                }));
            }
        });

        this.socket.on('error', (error) => {
            console.error('Socket error', error);
        });

        // Debug listener for all events
        this.socket.onAny((event, ...args) => {
            console.log(`Socket event received: ${event}`, args);
        });
    }

    // Socket emit methods
    public joinConversation(conversationId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('join_conversation', conversationId);
        }
    }

    public leaveConversation(conversationId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('leave_conversation', conversationId);
        }
    }

    public sendMessage(payload: { conversation_id: string; message: string; recipient_id: string; }): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('send_message', payload);
        }
    }

    public typing(conversationId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('typing', conversationId);
        }
    }

    public stopTyping(conversationId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('stop_typing', conversationId);
        }
    }

    public acceptBroadcast(broadcastId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('accept_broadcast', { broadcast_id: broadcastId });
        }
    }

    public declineBroadcast(broadcastId: string): void {
        if (this.socket && this.socket.connected) {
            this.socket.emit('decline_broadcast', { broadcast_id: broadcastId });
        }
    }
}

export default SocketService;