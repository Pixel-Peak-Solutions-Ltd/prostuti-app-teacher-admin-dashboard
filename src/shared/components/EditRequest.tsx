import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    Pagination,
    SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetMyEditRequestsQuery } from '../../redux/features/notificationApi';
import { formatDistanceToNow } from 'date-fns';

const EditRequests = () => {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        searchTerm: '',
        resourceType: '',
        sortBy: 'createdAt',
        sortOrder: 'desc' as 'asc' | 'desc'
    });

    const { data, isLoading, isFetching } = useGetMyEditRequestsQuery(filters);
    const editRequests = data?.data as any[];
    const totalPages = data?.meta ? Math.ceil(data.meta.count / filters.limit) : 0;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value, page: 1 }));
    };

    const handleResourceTypeChange = (e: SelectChangeEvent) => {
        setFilters(prev => ({ ...prev, resourceType: e.target.value, page: 1 }));
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const getResourceTypeLabel = (type: string) => {
        switch (type) {
            case 'Course':
                return 'Course';
            case 'Assignment':
                return 'Assignment';
            case 'RecodedClass':
                return 'Recorded Class';
            case 'Resource':
                return 'Resource';
            case 'Test':
                return 'Test';
            default:
                return type;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch (error) {
            return 'some time ago';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper variant="outlined" sx={{ width: '100%', borderRadius: '10px', p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h3">My Edit Requests</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        placeholder="Search by title or message"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                        <InputLabel id="resource-type-label">Resource Type</InputLabel>
                        <Select
                            labelId="resource-type-label"
                            id="resource-type"
                            value={filters.resourceType}
                            onChange={handleResourceTypeChange}
                            label="Resource Type"
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Course">Course</MenuItem>
                            <MenuItem value="Assignment">Assignment</MenuItem>
                            <MenuItem value="RecodedClass">Recorded Class</MenuItem>
                            <MenuItem value="Resource">Resource</MenuItem>
                            <MenuItem value="Test">Test</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {isLoading || isFetching ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : editRequests?.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No edit requests found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Your edit requests will appear here
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Resource Type</TableCell>
                                        <TableCell>Recipient</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {editRequests?.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {request.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 300 }}>
                                                    {request.message}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={getResourceTypeLabel(request.resourceType)}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {request.recipient.registeredId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {formatTime(request.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={request.isRead ? "Read" : "Unread"}
                                                    size="small"
                                                    color={request.isRead ? "success" : "warning"}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Pagination
                                    count={totalPages}
                                    page={filters.page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default EditRequests;