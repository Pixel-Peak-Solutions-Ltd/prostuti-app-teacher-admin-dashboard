import React, { useState } from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Box,
    Button,
    Tooltip,
    IconButton,
    Chip,
    CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import {
    useAcceptRequestMutation,
    useDeclineRequestMutation
} from '../../../redux/features/message/messageRequestApi';

interface MessageRequestItemProps {
    request: any;
    onSelect?: () => void;
}

const MessageRequestItem: React.FC<MessageRequestItemProps> = ({ request, onSelect }) => {
    const [acceptRequest, { isLoading: isAccepting }] = useAcceptRequestMutation();
    const [declineRequest, { isLoading: isDeclining }] = useDeclineRequestMutation();
    const [expanded, setExpanded] = useState(false);

    const hasAttachments = request.attachments && request.attachments.length > 0;
    const student = request.studentId || {};
    const isLoading = isAccepting || isDeclining;

    const toggleExpand = () => {
        if (!isLoading) {
            setExpanded(!expanded);
            if (onSelect) onSelect();
        }
    };

    const handleAccept = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await acceptRequest(request._id).unwrap();
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleDecline = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await declineRequest(request._id).unwrap();
        } catch (error) {
            console.error('Error declining request:', error);
        }
    };

    // Format the timestamp
    const formattedTime = request.createdAt
        ? format(new Date(request.createdAt), 'h:mm a')
        : '';

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                transition: 'background-color 0.2s',
                py: 2,
            }}
            onClick={toggleExpand}
        >
            <ListItemAvatar>
                <Avatar
                    alt={student.name || 'Student'}
                    src={student.profileImage?.path || ''}
                />
            </ListItemAvatar>

            <ListItemText
                primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography component="span" variant="subtitle1" fontWeight="medium">
                            {student.name || 'Student'}
                        </Typography>
                        <Typography component="span" variant="caption" color="text.secondary">
                            {formattedTime}
                        </Typography>
                    </Box>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{
                                display: 'block',
                                mt: 0.5,
                                mb: hasAttachments ? 1 : 0,
                                overflow: expanded ? 'visible' : 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: expanded ? 'normal' : 'nowrap',
                                maxWidth: '100%',
                            }}
                        >
                            {request.initialMessage}
                        </Typography>

                        {hasAttachments && (
                            <Chip
                                size="small"
                                label={`${request.attachments.length} attachment${request.attachments.length > 1 ? 's' : ''}`}
                                sx={{ mt: 0.5 }}
                                icon={<Tooltip title="Has attachments"><Box component="span">📎</Box></Tooltip>}
                            />
                        )}

                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                            <Button
                                color="primary"
                                size="small"
                                variant="contained"
                                startIcon={isAccepting ? <CircularProgress size={16} /> : <CheckIcon />}
                                onClick={handleAccept}
                                disabled={isLoading}
                            >
                                {isAccepting ? 'Accepting...' : 'Accept'}
                            </Button>

                            <Button
                                color="error"
                                size="small"
                                variant="outlined"
                                startIcon={isDeclining ? <CircularProgress size={16} /> : <CloseIcon />}
                                onClick={handleDecline}
                                disabled={isLoading}
                            >
                                {isDeclining ? 'Declining...' : 'Decline'}
                            </Button>
                        </Box>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default MessageRequestItem;