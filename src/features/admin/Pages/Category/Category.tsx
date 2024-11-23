import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", height: "100vh", borderRadius: "10px", p: 3 }}
      >
        {/* top title and button section */}
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h3">Category List</Typography>
          <Link to="/admin/add-category">
            <Button
              variant="contained"
              sx={{
                width: "179px",
                height: "48px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              + Add Category
            </Button>
          </Link>
        </Box>
        
        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Grid2 container spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
            {/* List of Category */}
          </Grid2>
        </Box>
      </Paper>
      {/* nested children */}a
    </Box>
  );
};

export default Category;
