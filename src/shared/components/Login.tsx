/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Checkbox, FormControlLabel, InputLabel, TextField, Typography } from "@mui/material";
import ProstutiLogo from "../../assets/Dashboard-SVGs/ProstutiLogo";
import Grid from '@mui/material/Grid2';
import { useState } from "react";

const Login = () => {
    const [credential, setCredential] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredential((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(credential);
    };

    return (
        <Box component='div'
            sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{ width: '360px', height: '482px' }}>
                <Grid container spacing={1.5} sx={{ justifyContent: 'center', mb: '2rem' }}>
                    <Grid size={4} sx={{ alignSelf: 'center' }}><ProstutiLogo width="120px" height="80px" /></Grid>
                    <Grid size={12}><Typography variant="h3" align="center">Log in to your account</Typography></Grid>
                    <Grid size={12}><Typography variant="body2" align="center">Welcome back! Please enter your details</Typography></Grid>
                </Grid>
                {/* login form starts */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid size={12}>
                            <InputLabel sx={{ fontWeight: '600' }}>Email</InputLabel>
                            <TextField
                                name='email'
                                onChange={handleChange}
                                placeholder="Enter your email"
                                type="text"
                                size="small"
                                fullWidth
                                id="outlined-start-adornment"
                            />
                        </Grid>
                        <Grid size={12}>
                            <InputLabel sx={{ fontWeight: '600' }}>Password</InputLabel>
                            <TextField
                                name='password'
                                onChange={handleChange}
                                placeholder="Enter your password"
                                type="password"
                                size="small"
                                fullWidth
                                id="outlined-start-adornment"
                            />
                        </Grid>
                        <Grid size={7}>
                            <FormControlLabel
                                sx={{
                                    fontSize: '1rem',
                                    lineHeight: '20px',
                                    fontWeight: 600,
                                    color: '#344054'
                                }}
                                label="Remember for 30 days"
                                control={<Checkbox onChange={(e) => {
                                    setCredential({ ...credential, remember: e.target.checked });
                                }} />}
                            />
                        </Grid>
                        <Grid size={5}>
                            <Typography variant="body1" align="right" sx={{ color: '#4883FC' }}>Forgot Password</Typography>
                        </Grid>
                        <Grid size={12}>
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                size="medium"
                                sx={{ borderRadius: '8px' }}>
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Login;