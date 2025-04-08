import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Tabs, Tab, Badge } from '@mui/material';
import { useGetPendingBroadcastsQuery, useGetActiveConversationsQuery, useGetUnreadMessageCountQuery } from '../../../../redux/features/chat/chatApi';
import BroadcastRequests from './BroadcastRequests';
import Conversations from './Conversation';
import ChatWindow from './ChatWindow';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setActiveConversation, setConversations, setPendingBroadcasts, setUnreadCounts } from '../../../../redux/features/chat/chatSlice';
import { useSocket } from '../../../../shared/hooks/useSocket';
import Loader from '../../../../shared/components/Loader';

const Messages = () => {
    // Tab state
    const [tabValue, setTabValue] = useState(0);
    const dispatch = useAppDispatch();
    const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);

    // Initialize socket and handle reconnection
    const socket = useSocket();
    const { token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Check socket connection every 30 seconds and reconnect if needed
        const intervalId = setInterval(() => {
            if (token) {
                console.log('Checking socket connection status...');
                // Reinitialize socket if needed
                socket.connect(token);
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, [socket, token]);

    // Fetch broadcast requests
    const {
        data: broadcastData,
        isLoading: broadcastsLoading
    } = useGetPendingBroadcastsQuery(undefined, {
        pollingInterval: 30000 // Poll every 30 seconds for new broadcasts
    });

    // Fetch active conversations
    const {
        data: conversationsData,
        isLoading: conversationsLoading
    } = useGetActiveConversationsQuery(undefined, {
        pollingInterval: 30000 // Poll every 30 seconds for new conversations
    });

    // Fetch unread message counts
    const {
        data: unreadData,
        isLoading: unreadLoading
    } = useGetUnreadMessageCountQuery(undefined, {
        pollingInterval: 30000 // Poll every 30 seconds for unread counts
    });

    // Handle tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Update the redux store when data changes
    useEffect(() => {
        if (broadcastData?.data) {
            dispatch(setPendingBroadcasts(broadcastData.data));
        }
    }, [broadcastData, dispatch]);

    useEffect(() => {
        if (conversationsData?.data) {
            dispatch(setConversations(conversationsData.data));
        }
    }, [conversationsData, dispatch]);

    useEffect(() => {
        if (unreadData?.data) {
            // Convert array of conversations with counts to a map of conversationId -> count
            const counts: Record<string, number> = {};
            unreadData.data.conversations.forEach(conv => {
                counts[conv._id] = conv.count;
            });
            dispatch(setUnreadCounts(counts));
        }
    }, [unreadData, dispatch]);

    // Count for badge displays
    const pendingBroadcastsCount = broadcastData?.data?.length || 0;
    const unreadMessagesCount = unreadData?.data?.total || 0;

    // Show loader while data is loading
    if (broadcastsLoading || conversationsLoading || unreadLoading) {
        return <Loader />;
    }

    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', gap: 2 }}>
            {/* Left sidebar with tabs for broadcasts and conversations */}
            <Paper
                variant="outlined"
                sx={{
                    width: '320px',
                    height: '100%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab
                        label={
                            <Badge badgeContent={pendingBroadcastsCount} color="primary">
                                <Typography>Requests</Typography>
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={unreadMessagesCount} color="primary">
                                <Typography>Conversations</Typography>
                            </Badge>
                        }
                    />
                </Tabs>

                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {tabValue === 0 ? (
                        <BroadcastRequests />
                    ) : (
                        <Conversations />
                    )}
                </Box>
            </Paper>

            {/* Right side chat window */}
            <Paper
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {activeConversationId ? (
                    <ChatWindow conversationId={activeConversationId} />
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        Select a conversation to start chatting
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default Messages;