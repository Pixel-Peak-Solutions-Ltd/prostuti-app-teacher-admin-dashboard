import { Box, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { materials } from "../../../../utils/Constants";
import { OutletContextType } from "./CreateCourse";
import { useEffect } from "react";

const AddCourseMaterial = () => {
    const { setActiveSteps } = useOutletContext<OutletContextType>();
    const navigate = useNavigate();

    // Set the stepper to the correct position
    useEffect(() => {
        setActiveSteps(2);
    }, [setActiveSteps]);

    // Store the current step before navigating to a material page
    const handleMaterialClick = () => {
        sessionStorage.setItem('courseCreationStep', '2');
    };

    return (
        <Box component="section" sx={{ mt: 3 }}>
            <Grid container spacing={3} sx={{ mt: 3, justifyContent: 'center' }}>
                {materials.map((item, index) => (
                    <Grid size={5} key={index} sx={{ alignSelf: 'center', justifySelf: 'center' }}>
                        <Paper variant="outlined" sx={{ maxWidth: '100%', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                            <img src={item.logo} style={{ width: '80px', height: '80px' }} />
                            {/* link to the component with state preservation */}
                            <Link
                                to={`/teacher/${item.name.split(' ').join('-').toLowerCase()}`}
                                onClick={handleMaterialClick}
                                style={{ textDecoration: 'none', color: '#3F3F46' }}
                            >
                                <Typography variant="h5" sx={{
                                    '&:hover': {
                                        color: '#2970FF',
                                    }
                                }}>
                                    {item.name}
                                </Typography>
                            </Link>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AddCourseMaterial;