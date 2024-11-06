import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { questionDatabase } from "../../../utils/Constants";
import { Link } from "react-router-dom";

const QuestionDatabase = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: '100vh', borderRadius: '25px', p: 3, }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant='h3'>Question Database</Typography>
                    <Button variant='contained' type='submit' sx={{ width: '180px', height: '48px', borderRadius: '8px', fontSize: '16px' }}>+ Add Question</Button>
                </Box>
                {/* question type selection section */}
                {/* profile information section */}
                <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                        {questionDatabase.map((item) => (
                            <Grid size={4} sx={{ alignSelf: 'center', justifySelf: 'center' }}>
                                <Paper elevation={6} sx={{ maxWidth: '100%', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                                    <img src={item.logo} style={{ width: '80px', height: '80px' }} />
                                    <Link to={`/teacher/${item.name.split(' ').join('-').toLowerCase()}`} style={{ textDecoration: 'none', color: '#3F3F46' }}>
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
            </Paper>
            {/* nested children */}
        </Box>
    );
};

export default QuestionDatabase;