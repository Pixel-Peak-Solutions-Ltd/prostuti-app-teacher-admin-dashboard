import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Divider,
    Badge,
    styled,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGetConversationQuery } from '../../../redux/features/conversation/conversationApi';

interface ChatHeaderProps {
    conversationId: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
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
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversationId }) => {
    const { data: conversation, isLoading } = useGetConversationQuery(conversationId);

    if (isLoading || !conversation) {
        return (
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    const otherUser = conversation.data?.otherUser;

    return (
        <>
            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#f5f5f5',
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            alt={otherUser?.name || 'User'}
                            src={otherUser?.profileImage?.path || ''}
                            sx={{ width: 40, height: 40, mr: 2 }}
                        />
                    </StyledBadge>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {otherUser?.name || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Online
                        </Typography>
                    </Box>
                </Box>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Divider />
        </>
    );
};

export default ChatHeader;