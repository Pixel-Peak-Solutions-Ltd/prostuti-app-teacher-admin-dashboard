import React, { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditRequestDialog from './EditRequestDialouge';

interface RequestEditButtonProps {
    resourceId: string;
    resourceType?: 'Course' | 'Assignment' | 'RecodedClass' | 'Resource' | 'Test';
    variant?: 'button' | 'icon';
    size?: 'small' | 'medium' | 'large';
    tooltipText?: string;
    buttonText?: string;
}

const RequestEditButton: React.FC<RequestEditButtonProps> = ({
                                                                 resourceId,
                                                                 resourceType = 'Course',
                                                                 variant = 'button',
                                                                 size = 'medium',
                                                                 tooltipText = 'Request Edit',
                                                                 buttonText = 'Request Edit'
                                                             }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    if (variant === 'icon') {
        return (
            <>
                <Tooltip title={tooltipText}>
                    <IconButton
                        size={size}
                        onClick={handleOpenDialog}
                        color="primary"
                        aria-label="request edit"
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <EditRequestDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    resourceId={resourceId}
                    resourceType={resourceType}
                />
            </>
        );
    }

    return (
        <>
            <Button
                variant="outlined"
                size={size}
                onClick={handleOpenDialog}
                startIcon={<EditIcon />}
            >
                {buttonText}
            </Button>
            <EditRequestDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                resourceId={resourceId}
                resourceType={resourceType}
            />
        </>
    );
};

export default RequestEditButton;