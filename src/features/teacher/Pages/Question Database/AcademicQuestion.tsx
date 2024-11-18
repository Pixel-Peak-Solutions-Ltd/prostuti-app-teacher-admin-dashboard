import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";

const fieldName = ['Class', 'Division', 'Subject', 'Chapter', 'Question Type'];
const AcademicQuestion = () => {
    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                    <Link to='/teacher/question-database'>
                        <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                    </Link>
                    <Typography variant='h3'>Add Question</Typography>
                </Box>

                {/* filter and question database section */}
                <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    {/* filters */}
                    <Grid container spacing={2}>
                        {
                            fieldName.map((name, index) => (
                                <Grid size={2}>
                                    <CustomLabel fieldName={name} />
                                    <CustomAutoComplete
                                        key={index}
                                        options={[]}
                                        // handleInput={[]}
                                        name={name === 'Class' ? 'category' : name === 'Question Type' ? 'questionType' : name.toLowerCase()}
                                    />
                                </Grid>
                            ))
                        }
                        <Grid size={2} sx={{ alignSelf: 'flex-end' }}>
                            {/* <CustomLabel fieldName='' /> */}
                            <Button variant='contained' sx={{ width: '100%', height: '44px', borderRadius: '8px', fontSize: '14px' }}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                    {/* filters end */}
                    {/* MCQ question section */}
                    <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                        <Grid container spacing={2}>
                            {/* question title  */}
                            <Grid size={12}>
                                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">Question</Typography>
                                <Card variant="outlined" sx={{ mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                    <Typography variant="subtitle1" color="grey.500">What is accounting?</Typography>
                                </Card>
                            </Grid>
                            {/* options */}
                        </Grid>
                    </Paper>
                </Box>
            </Paper >
        </Box>

    );
};

export default AcademicQuestion;