import { useState } from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditRequestModal from './EditRequestModal';
import { useAppSelector } from '../../redux/hooks';
import { TUser } from '../../types/types';

interface EditRequestButtonProps {
    resourceType: 'Assignment' | 'RecordedClass' | 'Resource' | 'Notice' | 'Test' | 'Flashcard';
    resourceId?: string; // Add resourceId prop
}

const EditRequestButton = ({ resourceType, resourceId }: EditRequestButtonProps) => {
    const [open, setOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user as TUser);

    // Only render the button if the user is an admin
    if (user.role !== 'admin') {
        return null;
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                sx={{
                    borderRadius: '8px',
                    height: '48px',
                    display: 'flex',
                    gap: 1
                }}
            >
                <EditIcon fontSize="small" />
                Edit Request
            </Button>

            <EditRequestModal
                open={open}
                onClose={() => setOpen(false)}
                resourceType={resourceType}
                resourceId={resourceId} // Pass resourceId to the modal
            />
        </>
    );
};

export default EditRequestButton;