import { Box, Button, Paper, Typography } from '@mui/material';
import { TLoginError } from '../../types/types';

const Error = ({ err }: { err: TLoginError }) => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%', height: '25%', backgroundColor: 'rgba(232, 88, 129, 0.2)', color: 'rgba(232, 88, 129, 1)', gap: '1rem' }}
                    elevation={24}
                    square={false}
                >
                    <Box component="div">
                        <Typography variant="h3" align='center'>{err?.status} : {err?.data.message}</Typography>
                    </Box>
                    <Button variant='contained' size="small" onClick={reloadPage}>Try Again</Button>
                </Paper>
            </Box>
        </>
    );
};

export default Error;