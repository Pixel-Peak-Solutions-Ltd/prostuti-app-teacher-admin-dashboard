import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import emptybox from '../../../../assets/images/empty_box.png';
import { useAppSelector } from "../Materials/Create Test";
import { TUser } from "../../../../types/types";

const CourseCreationScreen = () => {
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    return (
        <Box component='section' sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                <Grid size={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* create course button and box section */}
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                        <img src={emptybox} style={{ width: '293px', height: '293px' }} />

                        {
                            user.role === "admin" ? (
                                <>
                                    <Typography variant="h6">No course to manage!</Typography>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6">You don't have any courses!</Typography>
                                </>
                            )
                        }

                        {
                            user.role === "teacher" && (
                                <>
                                    <Link to={`/teacher/create-course`} style={{ textDecoration: 'none', color: '#3F3F46' }}>
                                        <Button variant='contained' sx={{ width: '522px', height: '44px', borderRadius: '8px', fontSize: '16px' }}>
                                            + Create Course
                                        </Button>
                                    </Link>
                                </>
                            )
                        }

                    </Box>
                    {/* create course button and box section ends*/}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CourseCreationScreen;