import React, { useEffect, useState } from 'react';
import {
    Box,
    List,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Divider,
    TextField,
    InputAdornment,
    Badge,
    styled,
    CircularProgress,
    ListItemButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { useGetConversationsQuery } from '../../../redux/features/conversation/conversationApi';
import { useSocket } from '../context/SocketContext';

interface ConversationListProps {
    onSelectConversation: (conversationId: string) => void;
    selectedConversationId: string | null;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 5,
        top: 5,
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    },
}));

const ConversationList: React.FC<ConversationListProps> = ({
    onSelectConversation,
    selectedConversationId,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: conversationsData, isLoading } = useGetConversationsQuery({
        page: "1",
        limit: "20"
    });
    const { socket } = useSocket();

    const conversations = conversationsData?.data || [];

    // Filter conversations based on search term
    const filteredConversations = conversations.filter(conversation =>
        conversation.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Listen for new messages
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data: any) => {
            // RTK Query will handle the cache updates
        };

        socket.on('receive_message', handleNewMessage);

        return () => {
            socket.off('receive_message', handleNewMessage);
        };
    }, [socket]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Box sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search conversations"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Divider />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => {
                        const otherUser = conversation.otherUser;
                        const isSelected = selectedConversationId === conversation._id;

                        return (
                            <React.Fragment key={conversation._id}>
                                <ListItemButton
                                    alignItems="flex-start"
                                    selected={isSelected}
                                    onClick={() => onSelectConversation(conversation._id)}
                                    sx={{
                                        backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt={otherUser.name}
                                                src={otherUser.profileImage?.path || ''}
                                            />
                                        </StyledBadge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    fontWeight={conversation.unreadCount > 0 ? 'bold' : 'regular'}
                                                >
                                                    {otherUser.name}
                                                </Typography>
                                                {conversation.lastMessageTime && (
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {format(new Date(conversation.lastMessageTime), 'h:mm a')}
                                                    </Typography>
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography
                                                    sx={{ display: 'inline', mr: 1 }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                    noWrap
                                                >
                                                    {conversation.lastMessageText || 'No messages yet'}
                                                </Typography>
                                                {conversation.unreadCount > 0 && (
                                                    <Badge
                                                        badgeContent={conversation.unreadCount}
                                                        color="primary"
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        );
                    })
                ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No conversations found
                        </Typography>
                    </Box>
                )}
            </List>
        </Box>
    );
};

export default ConversationList;