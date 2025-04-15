import { Box, Button, Paper, Typography, Snackbar, Alert } from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomStepper from "../../../../shared/components/CustomStepper";
import CourseDetails from "./CourseDetails";
import { createRef, RefObject, useState, useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";


export type FormComponentRef = {
    submitForm: () => void;
};

// Define valid paths as a const to get literal types
const FORM_PATHS = {
    COURSE_DETAILS: '/teacher/create-course',
    LESSONS: '/teacher/create-course/create-lessons',
    ADD_MATERIAL: '/teacher/create-course/add-course-material',
    PREVIEW: '/teacher/create-course/course-preview'
} as const;

// Create a type from the valid paths
type ValidPaths = typeof FORM_PATHS[keyof typeof FORM_PATHS];

export type OutletContextType = {
    setActiveSteps: React.Dispatch<React.SetStateAction<number>>;
    formRef: RefObject<FormComponentRef>;
    setShowContinueButton: React.Dispatch<React.SetStateAction<boolean>>;
    // other shared props goes here
};

const CreateCourse = () => {
    // state for handling the stepper
    const [activeSteps, setActiveSteps] = useState(0);
    // to determine it's the create course route
    const location = useLocation();
    const navigate = useNavigate();
    // State to control whether to show the continue button
    const [showContinueButton, setShowContinueButton] = useState(true);
    // State for error snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Get course_id from Redux store to verify it exists for later steps
    const course_id = useAppSelector(state => state.courseAndLessonId.id.course_id);

    // Log the course ID for debugging
    useEffect(() => {
        console.log("CreateCourse - Current course_id:", course_id);
    }, [course_id]);

    // Create a single ref that will be passed to both CourseDetails and outlet components
    const formRef = createRef<FormComponentRef>();

    // When navigating away to material pages, store the current step
    const storeCurrentStep = () => {
        sessionStorage.setItem('courseCreationStep', activeSteps.toString());
    };

    // Update stepper based on current route
    useEffect(() => {
        if (location.pathname === FORM_PATHS.COURSE_DETAILS) {
            setActiveSteps(0);
        } else if (location.pathname === FORM_PATHS.LESSONS) {
            setActiveSteps(1);
        } else if (location.pathname === FORM_PATHS.ADD_MATERIAL) {
            setActiveSteps(2);
        } else if (location.pathname === FORM_PATHS.PREVIEW) {
            setActiveSteps(3);
        }
    }, [location.pathname]);

    // When returning from material pages, restore the step
    useEffect(() => {
        const savedStep = sessionStorage.getItem('courseCreationStep');
        if (savedStep) {
            setActiveSteps(parseInt(savedStep));
            sessionStorage.removeItem('courseCreationStep');
        }
    }, []);

    const handleContinue = () => {
        console.log("Continue button clicked in path:", location.pathname);

        // Different handling based on current path
        if (location.pathname === FORM_PATHS.COURSE_DETAILS) {
            // For Course Details, we need the form submission
            if (formRef.current && typeof formRef.current.submitForm === 'function') {
                formRef.current.submitForm();
                // Navigation happens in the form submission handler
            }
        }
        else if (location.pathname === FORM_PATHS.ADD_MATERIAL) {
            // Verify we have a course_id before navigating to preview
            if (!course_id) {
                setSnackbarMessage("Course ID not found. Please go back and create a course first.");
                setSnackbarOpen(true);
                return;
            }

            // For Add Course Material, navigate directly to preview
            try {
                setActiveSteps(3);
                navigate(FORM_PATHS.PREVIEW);
            } catch (error) {
                console.error("Error navigating to preview:", error);
                setSnackbarMessage("Error navigating to preview. Please try again.");
                setSnackbarOpen(true);
            }
        }
        // We don't need to handle the Lessons route here as we're hiding the button there
    };

    const getPageTitle = () => {
        if (location.pathname === FORM_PATHS.COURSE_DETAILS) {
            return 'Create Course';
        } else if (location.pathname === FORM_PATHS.LESSONS) {
            return 'Create Lesson';
        } else if (location.pathname === FORM_PATHS.ADD_MATERIAL) {
            return 'Create Course';
        } else if (location.pathname === FORM_PATHS.PREVIEW) {
            return 'Course Preview';
        }
        return 'Create Course';
    };

    const getBackPath = () => {
        if (location.pathname === FORM_PATHS.COURSE_DETAILS) {
            return '/teacher/my-course';
        } else if (location.pathname === FORM_PATHS.LESSONS) {
            return FORM_PATHS.COURSE_DETAILS;
        } else if (location.pathname === FORM_PATHS.ADD_MATERIAL) {
            return FORM_PATHS.LESSONS;
        } else if (location.pathname === FORM_PATHS.PREVIEW) {
            return FORM_PATHS.ADD_MATERIAL;
        }
        return '/teacher/my-course';
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={getBackPath()}>
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    if (location.pathname !== FORM_PATHS.COURSE_DETAILS) {
                                        setActiveSteps(prev => Math.max(0, prev - 1));
                                    }
                                }}
                                sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                            >
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                        </Link>
                        <Typography variant='h3'>{getPageTitle()}</Typography>
                    </Box>

                    {/* continue button - conditionally shown */}
                    {showContinueButton && activeSteps < 3 && (
                        <Button
                            onClick={handleContinue}
                            variant='contained'
                            sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                            Continue <ChevronRightIcon />
                        </Button>
                    )}

                    {/* publish button for preview */}
                    {activeSteps === 3 && (
                        <Button
                            variant='contained'
                            sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                            Publish <ChevronRightIcon />
                        </Button>
                    )}
                </Box>
                {/* stepper component */}
                <Box component="section">
                    <Grid container spacing={2} sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                        <Grid size={8}>
                            <CustomStepper activeSteps={activeSteps} />
                        </Grid>
                        {/* course detail creation components */}
                        <Grid size={12}>
                            {location.pathname === FORM_PATHS.COURSE_DETAILS ?
                                <CourseDetails ref={formRef} setActiveSteps={setActiveSteps} /> :
                                <Outlet context={{ setActiveSteps, formRef, setShowContinueButton }} />
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Error Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateCourse;