import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import ChatContainer from '../components/ChatContainer';
import { SocketProvider } from '../context/SocketContext';

const Messages: React.FC = () => {
    return (
        <SocketProvider>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Messages
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Chat with students, teachers, and administrators
                    </Typography>
                </Box>
                <ChatContainer />
            </Container>
        </SocketProvider>
    );
};

export default Messages;