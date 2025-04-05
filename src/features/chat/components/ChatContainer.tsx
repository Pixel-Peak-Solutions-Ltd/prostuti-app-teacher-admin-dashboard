import React, { useState } from 'react';
import { Box, Paper, Divider, Typography } from '@mui/material';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ChatHeader from './ChatHeader';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    height: 'calc(100vh - 120px)',
    maxWidth: 1200,
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
}));

const ConversationPanel = styled(Box)(({ theme }) => ({
    width: 320,
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
}));

const MessagePanel = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

const MessageListContainer = styled(Box)({
    flexGrow: 1,
    overflow: 'auto',
});

const ChatContainer: React.FC = () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    const handleSelectConversation = (conversationId: string) => {
        setSelectedConversationId(conversationId);
    };

    return (
        <StyledPaper>
            <ConversationPanel>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" fontWeight="bold">
                        Messages
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                    <ConversationList
                        onSelectConversation={handleSelectConversation}
                        selectedConversationId={selectedConversationId}
                    />
                </Box>
            </ConversationPanel>

            <MessagePanel>
                {selectedConversationId ? (
                    <>
                        <ChatHeader conversationId={selectedConversationId} />
                        <MessageListContainer>
                            <MessageList conversationId={selectedConversationId} />
                        </MessageListContainer>
                        <MessageComposer conversationId={selectedConversationId} />
                    </>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            bgcolor: '#f5f5f5',
                        }}
                    >
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Select a conversation
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Choose a contact from the list to start chatting
                        </Typography>
                    </Box>
                )}
            </MessagePanel>
        </StyledPaper>
    );
};

export default ChatContainer;