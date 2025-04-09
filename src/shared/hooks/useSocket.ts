import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import SocketService from '../services/socketService';

export const useSocket = () => {
    const { token } = useAppSelector((state) => state.auth);
    const socketService = SocketService.getInstance();

    useEffect(() => {
        if (token) {
            // Initialize socket connection
            socketService.connect(token);

            // Cleanup on unmount
            return () => {
                socketService.disconnect();
            };
        }
    }, [token]);

    return socketService;
};

export default useSocket;