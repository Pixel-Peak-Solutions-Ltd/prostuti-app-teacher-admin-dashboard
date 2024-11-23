import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import emptybox from '../../../../assets/images/empty_box.png';
import Grid from '@mui/material/Grid2';
const MyCourse = () => {
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: '100vh', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component='section' sx={{ mt: 3 }}>
                        <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                            <Grid size={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                                    <img src={emptybox} style={{ width: '293px', height: '293px' }} />
                                    <Typography variant="h6">You don't have any courses!</Typography>
                                    <Link to={`/teacher/create-course`} style={{ textDecoration: 'none', color: '#3F3F46' }}>
                                        <Button variant='contained' sx={{ width: '522px', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                                            + Create Course
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default MyCourse;