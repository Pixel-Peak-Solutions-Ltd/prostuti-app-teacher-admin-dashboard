import React, { useState, useEffect } from 'react';
import { Box, Paper, Divider, Typography, Button, Tabs, Tab, IconButton } from '@mui/material';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ChatHeader from './ChatHeader';
import PendingRequests from './PendingRequests';
import MessageRequestModal from './MessageRequestModal';
import NotificationBadge from './NotificationBadge';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../../redux/hooks';
import { USER_ROLE } from '../../../constants/roles';
import { useSocket } from '../context/SocketContext';

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ flexGrow: 1, overflowY: 'auto' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChatContainer: React.FC = () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);
    const [isMessageRequestOpen, setIsMessageRequestOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const { hasPendingRequests } = useSocket();

    const isStudent = user?.role === USER_ROLE.student;
    const isTeacher = user?.role === USER_ROLE.teacher;

    const handleSelectConversation = (conversationId: string) => {
        setSelectedConversationId(conversationId);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenMessageRequest = () => {
        setIsMessageRequestOpen(true);
    };

    const handleCloseMessageRequest = () => {
        setIsMessageRequestOpen(false);
    };

    return (
        <StyledPaper>
            <ConversationPanel>
                <Box sx={{
                    p: 2,
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" fontWeight="bold">
                        Messages
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isStudent && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={handleOpenMessageRequest}
                            >
                                New
                            </Button>
                        )}
                        <NotificationBadge />
                    </Box>
                </Box>
                <Divider />

                {isTeacher && (
                    <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                aria-label="message tabs"
                                variant="fullWidth"
                            >
                                <Tab
                                    label="Conversations"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    label={hasPendingRequests ? "Requests (New)" : "Requests"}
                                    {...a11yProps(1)}
                                    sx={{
                                        color: hasPendingRequests ? 'primary.main' : 'inherit',
                                        fontWeight: hasPendingRequests ? 'bold' : 'normal'
                                    }}
                                />
                            </Tabs>
                        </Box>

                        <TabPanel value={tabValue} index={0}>
                            <ConversationList
                                onSelectConversation={handleSelectConversation}
                                selectedConversationId={selectedConversationId}
                            />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <PendingRequests />
                        </TabPanel>
                    </>
                )}

                {!isTeacher && (
                    <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                        <ConversationList
                            onSelectConversation={handleSelectConversation}
                            selectedConversationId={selectedConversationId}
                        />
                    </Box>
                )}
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
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        {isStudent ? (
                            <>
                                <Typography variant="h5" color="text.secondary" gutterBottom>
                                    Need help with your studies?
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    Send a message request and a teacher will respond to you.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenMessageRequest}
                                >
                                    Start New Request
                                </Button>
                            </>
                        ) : isTeacher && tabValue === 1 ? (
                            <>
                                <Typography variant="h5" color="text.secondary" gutterBottom>
                                    Message Requests
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    View and respond to student message requests
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" color="text.secondary" gutterBottom>
                                    Select a conversation
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Choose a contact from the list to start chatting
                                </Typography>
                            </>
                        )}
                    </Box>
                )}
            </MessagePanel>

            {/* Message Request Modal for Students */}
            {isStudent && (
                <MessageRequestModal
                    open={isMessageRequestOpen}
                    onClose={handleCloseMessageRequest}
                />
            )}
        </StyledPaper>
    );
};

export default ChatContainer;