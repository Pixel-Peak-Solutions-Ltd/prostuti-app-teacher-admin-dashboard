import { Box, Paper, Typography } from "@mui/material";
import SearchBarWithFilter from "./SearchBarWithFilter";
import TeachersTable from "./TeachersTable";

const TeacherManagement = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", borderRadius: "10px", p: 3 }}>
        {/* top title and button section */}
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}>
          <Typography variant="h3">Teacher Management</Typography>
        </Box>

        {/* Search + Filter */}
        <SearchBarWithFilter />
        {/* Table */}
        <TeachersTable />
      </Paper>
    </Box>
  );
};

export default TeacherManagement;
