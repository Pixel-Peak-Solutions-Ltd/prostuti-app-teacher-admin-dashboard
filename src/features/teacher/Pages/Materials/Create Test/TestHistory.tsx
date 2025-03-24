import TestHistoryTable from "./TestHistoryTable";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Loader, useAppSelector, Link, ArrowBackIcon, useGetTestHistoryQuery } from '../Create Test';

const TestHistory = () => {
    const testId = useAppSelector((state) => state.test_id.id.test_id);
    console.log('selected test:', testId);
    //fetching data from the backend
    const { data, isLoading } = useGetTestHistoryQuery({ testId });

    if (isLoading) {
        <Loader />;
    }

    const testHistoryData = data?.data.data;
    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to='/teacher/test-list'>
                                <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                    <ArrowBackIcon fontSize='small' />
                                </Button>
                            </Link>
                            <Typography variant='h3'>Test History</Typography>
                        </Box>
                    </Box>
                    {isLoading && (<Loader />)}
                    <TestHistoryTable testHistoryData={testHistoryData} isLoading={isLoading} />
                </Paper>
            </Box>
        </>
    );
};

export default TestHistory;