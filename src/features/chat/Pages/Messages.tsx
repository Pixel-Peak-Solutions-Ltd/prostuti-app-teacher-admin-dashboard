import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ChatContainer from '../components/ChatContainer';
import { SocketProvider } from '../context/SocketContext';
import { useAppSelector } from '../../../redux/hooks';
import { USER_ROLE } from '../../../constants/roles';

const Messages: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const isStudent = user?.role === USER_ROLE.student;
    const isTeacher = user?.role === USER_ROLE.teacher;

    let subtitle = "Chat with students, teachers, and administrators";

    if (isStudent) {
        subtitle = "Get help from teachers by sending a message request";
    } else if (isTeacher) {
        subtitle = "Respond to student requests and manage conversations";
    }

    return (
        <SocketProvider>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Messages
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
                <ChatContainer />
            </Container>
        </SocketProvider>
    );
};

export default Messages;