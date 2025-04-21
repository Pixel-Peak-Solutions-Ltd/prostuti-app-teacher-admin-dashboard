import { Button, Snackbar, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from "../Materials/Create Test";
import { useDeleteLessonFromDBMutation, useUpdateLessonMutation } from "../../../../redux/features/course/courseApi";
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface TLesson {
    _id: string;
    number: string;
    name: string;
    course_id: string;
    createdAt: Date;
    updatedAt: Date;
}

const LessonEditForm = ({ lessonDataFromDB, refetchLessons }: { lessonDataFromDB: TLesson[]; refetchLessons: () => void; }) => {
    // Track which lesson is currently being deleted
    const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);
    const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
    const [editingValues, setEditingValues] = useState<Record<string, { number: string; name: string; }>>({});
    const [fieldErrors, setFieldErrors] = useState<Record<string, { number?: string; name?: string; }>>({});
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error'; }>({
        open: false,
        message: '',
        severity: 'success'
    });
    // delete call
    const [deleteLessonFromDB] = useDeleteLessonFromDBMutation();
    // update call
    const [updateLesson] = useUpdateLessonMutation();

    const handleEditClick = (lesson: TLesson) => {
        setEditingLessonId(lesson._id);
        setEditingValues(prev => ({
            ...prev,
            [lesson._id]: { number: lesson.number, name: lesson.name }
        }));
        setFieldErrors(prev => ({ ...prev, [lesson._id]: {} }));
    };

    // update form input change

    const handleInputChange = (lessonId: string, field: 'number' | 'name', value: string) => {
        setEditingValues(prev => ({
            ...prev,
            [lessonId]: { ...prev[lessonId], [field]: value }
        }));
        setFieldErrors(prev => ({
            ...prev,
            [lessonId]: { ...prev[lessonId], [field]: '' }
        }));
    };

    // update function
    const handleUpdate = async (lessonId: string) => {
        const { number, name } = editingValues[lessonId] || { number: '', name: '' };
        const errors: { number?: string; name?: string; } = {};
        if (!number.trim()) errors.number = 'Lesson number is required';
        if (!name.trim()) errors.name = 'Lesson name is required';

        if (errors.number || errors.name) {
            setFieldErrors(prev => ({ ...prev, [lessonId]: errors }));
            setSnackbar({ open: true, message: 'Please fix validation errors', severity: 'error' });
            return;
        }

        try {
            await updateLesson({ lessonId, data: { number, name } }).unwrap();
            setSnackbar({ open: true, message: 'Lesson updated successfully', severity: 'success' });
            setEditingLessonId(null);
            refetchLessons();
        } catch (err: any) {
            console.error('Failed to update lesson:', err);
            const msg = err?.data?.errorSources
                ? err.data.errorSources.map((es: any) => es.message).join(', ')
                : 'Failed to update lesson';
            setSnackbar({ open: true, message: msg, severity: 'error' });
        }
    };
    // delete function
    const handleLessonDelete = async (lessonId: string) => {
        if (!window.confirm('Are you sure you want to delete this lesson?')) return;
        try {
            setDeletingLessonId(lessonId); // Set the lesson ID being deleted
            await deleteLessonFromDB({ lessonId }).unwrap();
            setSnackbar({ open: true, message: 'Lesson deleted successfully', severity: 'success' });// Await the deletion
            // Explicitly refetching after successful deletion
            refetchLessons();
            // clearing the deleting state when done
            setDeletingLessonId(null);
        } catch (error) {
            console.error('Failed to delete lesson:', error);
            setSnackbar({ open: true, message: 'Failed to delete lesson', severity: 'error' });
            setDeletingLessonId(null);
        } finally {
            setDeletingLessonId(null);
        }
    };

    // snackbar close
    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };
    return (
        <>
            {
                lessonDataFromDB?.map((lesson: TLesson) => {
                    const isEditing = editingLessonId === lesson._id;
                    const values = editingValues[lesson._id] || { number: lesson.number, name: lesson.name };
                    const errors = fieldErrors[lesson._id] || {};
                    return (
                        <Grid container spacing={4} key={lesson._id}>
                            <Grid size={3}>
                                <CustomLabel fieldName={`Lesson Number*`} />
                                <CustomTextField
                                    autoFocus={isEditing}
                                    name={`number`}
                                    value={values.number}
                                    helperText={errors.number}
                                    error={Boolean(errors.number)}
                                    // disabled={editingLessonId === lesson._id ? false : true}
                                    disabled={!isEditing}
                                    handleInput={(e) => isEditing && handleInputChange(lesson._id, 'number', e.target.value)}
                                />
                            </Grid>
                            <Grid size={7}>
                                <CustomLabel fieldName={`Lesson Name*`} />
                                <CustomTextField
                                    // autoFocus={editingLessonId === lesson._id ? true : false}
                                    autoFocus={isEditing}
                                    name={`name`}
                                    value={values.name}
                                    helperText={errors.name}
                                    error={Boolean(errors.name)}
                                    // disabled={editingLessonId === lesson._id ? false : true}
                                    disabled={!isEditing}
                                    handleInput={(e) => isEditing && handleInputChange(lesson._id, 'name', e.target.value)}
                                />
                            </Grid>
                            <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                {!isEditing ? (
                                    <IconButton onClick={() => handleEditClick(lesson)}>
                                        <BorderColorIcon />
                                    </IconButton>
                                ) : (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleUpdate(lesson._id)}
                                        sx={{ height: '40px', minHeight: '40px', width: '100%', borderRadius: '8px' }}
                                    >
                                        Update
                                    </Button>
                                )}
                            </Grid>
                            <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                <Button
                                    onClick={() => {
                                        console.log('lessonId', lesson._id);
                                        handleLessonDelete(lesson._id);
                                    }}
                                    disabled={deletingLessonId === lesson._id}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        height: '40px', minHeight: '40px', width: '100%', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46",
                                        '&:hover': {
                                            backgroundColor: '#e91e63',
                                            color: '#FFF',
                                            border: 'none'
                                        }
                                    }}>
                                    {deletingLessonId === lesson._id ? 'Deleting' : <DeleteOutlinedIcon />}
                                </Button>
                            </Grid>

                        </Grid>
                    );

                })
            }
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LessonEditForm;