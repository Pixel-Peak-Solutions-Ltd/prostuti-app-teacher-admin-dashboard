import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddCategoryForm from './AddCategoryForm';

const AddCategory = () => {

  return (
    <>
    <Box sx={{ width: '100%', height: '100vh' }}>
        <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
            {/* top title and button section */}
            <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                <Link to='/admin/category'>
                    <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                        <ArrowBackIcon fontSize='small' />
                    </Button>
                </Link>
                <Typography variant='h3'>Add Question</Typography>
            </Box>
            {/* dynamic form component*/}
            <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                <AddCategoryForm/>
            </Box>
        </Paper>
    </Box >
    {/* showing alert for what happened after submitting the request */}
    {/* <Alert
        openSnackbar={openSnackbar}
        autoHideDuration={5000}
        handleCloseSnackbar={handleCloseSnackbar}
        isSuccess={isSuccess}
    /> */}
</>
  )
}

export default AddCategory