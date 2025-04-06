import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Paper,
    Divider,
    Avatar,
    CircularProgress,
    Chip,
} from '@mui/material';
import { useGetPendingRequestsQuery } from '../../../redux/features/message/messageRequestApi';
import MessageRequestItem from '../../chat/components/MessageRequestItem';
import { format } from 'date-fns';

interface PendingRequestsProps {
    onSelectRequest?: (requestId: string) => void;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ onSelectRequest }) => {
    const { data, isLoading, error } = useGetPendingRequestsQuery({
        page: "1",
        limit: "10"
    });

    const pendingRequests = data?.data || [];
    const totalRequests = data?.meta?.total || 0;

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error">
                    Failed to load message requests
                </Typography>
            </Box>
        );
    }

    if (pendingRequests.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    No pending message requests
                </Typography>
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6">
                    Pending Message Requests
                    {totalRequests > 0 && (
                        <Chip
                            label={totalRequests}
                            color="primary"
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    )}
                </Typography>
            </Box>
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {pendingRequests.map((request) => (
                    <React.Fragment key={request._id}>
                        <MessageRequestItem
                            request={request}
                            onSelect={() => onSelectRequest && onSelectRequest(request._id)}
                        />
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default PendingRequests;