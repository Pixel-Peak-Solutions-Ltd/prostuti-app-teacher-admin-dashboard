import { Avatar, Box, Button, Card, Divider, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


const Profile = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: '100vh', borderRadius: '25px', p: 3 }}>
                {/* top profile title and button section */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant='h3'>Profile</Typography>
                    <Button variant='contained' sx={{ width: '120px', height: '38px', borderRadius: '8px', fontSize: '14px' }}>Save</Button>
                </Box>
                {/* profile picture and teacher name */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                    <Avatar alt="teacher-photo" src="" sx={{ width: "130px", height: "130px" }} />
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 0.5 }}>
                        <Typography variant="h3">Md. Ashrafuzzaman</Typography>
                        <Typography variant="h6" sx={{ fontWeight: "650" }}>TID01001</Typography>
                    </Box>
                </Box>
                {/* profile information section */}
                <Box component="section" sx={{ mt: 3, flexGrow: 1, }}>
                    <Typography variant="h5" sx={{ fontWeight: "600" }}>Generals</Typography>
                    <Grid container spacing={2} sx={{ mt: 3, }}>
                        <Grid size={6}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Email</Typography>
                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <Typography variant="subtitle1" color="grey.500">asrafuzzaman@gmail.com</Typography>
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Contact Number</Typography>
                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <Typography variant="subtitle1" color="grey.500">+88012345678</Typography>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Joined Date</Typography>
                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <Typography variant="subtitle1" color="grey.500">January 09, 2024</Typography>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Subject</Typography>
                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <Typography variant="subtitle1" color="grey.500">Physics</Typography>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Type</Typography>
                            <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <Typography variant="subtitle1" color="grey.500">Job</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 3 }} />
                </Box>
                {/* Activity section */}
                <Box component="section" sx={{ mt: 3, flexGrow: 1, }}>
                    <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>Activity</Typography>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                <AccessTimeOutlinedIcon fontSize="large" color="disabled" />
                                <Box component='div'>
                                    <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: '600' }}>Accepted flashcard</Typography>
                                    <Typography variant="subtitle1" color="grey.500" sx={{ fontSize: '14px', fontWeight: '500' }}>3 minutes ago</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default Profile;