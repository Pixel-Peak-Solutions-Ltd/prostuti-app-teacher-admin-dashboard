import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <CircularProgress />
            </Box>
        </>
    );
};

export default Loader;