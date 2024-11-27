import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomStepper from "../../../../shared/components/CustomStepper";
import CourseDetails from "./CourseDetails";
import { createRef, RefObject, useState } from "react";


export type FormComponentRef = {
    submitForm: () => void;
};

// Define valid paths as a const to get literal types
const FORM_PATHS = {
    COURSE_DETAILS: '/teacher/create-course',
    LESSONS: '/teacher/create-course/create-lessons',
} as const;

// Create a type from the valid paths
type ValidPaths = typeof FORM_PATHS[keyof typeof FORM_PATHS];


export type OutletContextType = {
    setActiveSteps: React.Dispatch<React.SetStateAction<number>>;
    formRef: RefObject<FormComponentRef>;
    // other shared props goes here
};

const CreateCourse = () => {
    // state for handling the stepper
    const [activeSteps, setActiveSteps] = useState(0);
    // to determine it's the create course route
    const location = useLocation();

    // Create a single ref that will be passed to both CourseDetails and outlet components
    const formRef = createRef<FormComponentRef>();

    // determining current form based on pathname

    const handleContinue = () => {
        if (formRef.current) {
            formRef.current.submitForm();
            // setActiveSteps((prevState) => prevState + 1);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={location.pathname === "/teacher/create-course" ? '/teacher/my-course' : "/teacher/create-course"}>
                            <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                        </Link>
                        <Typography variant='h3'>{location.pathname === FORM_PATHS.LESSONS ? 'Create Lessons' : 'Create Course'}</Typography>
                    </Box>
                    {/* continue button */}
                    {/* <Link to='/teacher/create-course/create-lessons'> */}
                    <Button
                        onClick={handleContinue}
                        variant='contained'
                        sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                        Continue <ChevronRightIcon />
                    </Button>
                    {/* </Link> */}
                </Box>
                {/* stepper component */}
                <Box component="section">
                    <Grid container spacing={2} sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                        <Grid size={8}>
                            <CustomStepper activeSteps={activeSteps} />
                        </Grid>
                        {/* course detail creation components */}
                        <Grid size={12}>
                            {location.pathname === FORM_PATHS.COURSE_DETAILS ? <CourseDetails ref={formRef} setActiveSteps={setActiveSteps} /> : <Outlet context={{ setActiveSteps, formRef }} />}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateCourse;