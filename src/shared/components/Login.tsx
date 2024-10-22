/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, InputLabel, TextField, Typography } from "@mui/material";
import ProstutiLogo from "../../assets/Dashboard-SVGs/ProstutiLogo";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { TUserInfo } from "../../types/types";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
    // state for data handling
    const [credential, setCredential] = useState<TUserInfo>({
        email: '',
        password: '',
        rememberMe: ''
    });

    // state for redux toolkit purposes

    const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();

    if (isLoading) {
        return (<>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </>);
    }

    //^ the below function only handles the change in the login form
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredential((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const userInfo = { ...credential };
        if (userInfo.rememberMe?.length === 0) {
            delete userInfo['rememberMe'];
        }
        // sending request to backend to log in the user
        try {
            await login(userInfo);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(data);

    return (

        <Box component='div'
            sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            {isLoading ?
                (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress /></Box>)
                :
                (
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
                                            e.target.checked ?
                                                setCredential({ ...credential, rememberMe: '30d' }) :
                                                setCredential({ ...credential, rememberMe: '' });
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
                )}

        </Box>
    );
};

export default Login;