import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { baseApi } from '../../../redux/api/baseApi';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    hasPendingRequests: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    hasPendingRequests: false
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [hasPendingRequests, setHasPendingRequests] = useState<boolean>(false);
    const { token } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    // Function to handle new message requests
    const handleNewMessageRequest = useCallback((data: any) => {
        console.log('New message request received:', data);
        setHasPendingRequests(true);
        // Invalidate the pending requests query to trigger a refetch
        dispatch(
            baseApi.util.invalidateTags(['MessageRequests', 'Notifications', 'NotificationCount'])
        );
    }, [dispatch]);

    // Function to handle when a message request is processed (accepted/declined)
    const handleMessageRequestProcessed = useCallback((data: any) => {
        console.log('Message request processed:', data);
        // Invalidate the pending requests query to trigger a refetch
        dispatch(
            baseApi.util.invalidateTags(['MessageRequests', 'Conversations', 'Notifications', 'NotificationCount'])
        );
    }, [dispatch]);

    // Function to handle when a message request is accepted
    const handleMessageRequestAccepted = useCallback((data: any) => {
        console.log('Message request accepted:', data);
        // Invalidate relevant queries
        dispatch(
            baseApi.util.invalidateTags(['Conversations', 'Messages', 'Notifications', 'NotificationCount'])
        );
    }, [dispatch]);

    // Function to handle when all teachers decline a message request
    const handleMessageRequestAllDeclined = useCallback((data: any) => {
        console.log('All teachers declined the message request:', data);
        // Invalidate notifications
        dispatch(
            baseApi.util.invalidateTags(['Notifications', 'NotificationCount'])
        );
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        // Create socket connection
        const socketInstance = io('http://localhost:5000', {
            auth: {
                token,
            },
        });

        // Set up event listeners
        socketInstance.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socketInstance.on('authenticated', () => {
            console.log('Socket authenticated');
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        // Message request events
        socketInstance.on('new_message_request', handleNewMessageRequest);
        socketInstance.on('message_request_processed', handleMessageRequestProcessed);
        socketInstance.on('message_request_accepted', handleMessageRequestAccepted);
        socketInstance.on('message_request_all_declined', handleMessageRequestAllDeclined);

        // Save socket instance
        setSocket(socketInstance);

        // Clean up on unmount
        return () => {
            socketInstance.off('new_message_request', handleNewMessageRequest);
            socketInstance.off('message_request_processed', handleMessageRequestProcessed);
            socketInstance.off('message_request_accepted', handleMessageRequestAccepted);
            socketInstance.off('message_request_all_declined', handleMessageRequestAllDeclined);
            socketInstance.disconnect();
        };
    }, [token, handleNewMessageRequest, handleMessageRequestProcessed, handleMessageRequestAccepted, handleMessageRequestAllDeclined]);

    return (
        <SocketContext.Provider value={{ socket, isConnected, hasPendingRequests }}>
            {children}
        </SocketContext.Provider>
    );
};