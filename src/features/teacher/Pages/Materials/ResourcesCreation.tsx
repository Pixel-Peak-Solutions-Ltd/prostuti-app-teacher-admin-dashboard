import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResourcesCreation = () => {
    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                    <Link to='/teacher/question-database'>
                        <Button variant='outlined' sx={{ width: '36px', minWidth: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                    </Link>
                    <Typography variant='h3'>Add Question</Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default ResourcesCreation;