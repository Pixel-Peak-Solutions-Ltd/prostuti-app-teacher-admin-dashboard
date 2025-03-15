import { Box, Grid, Paper } from "@mui/material";
import EngagementChart from "./EngagementChart";
import TopSellingCourses from "./TopSellingCourse.";
import CompletionRate from "./CompletionRate";

const AdminDashboard = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", minHeight: "100vh", borderRadius: "10px", p: 3 }}
      >
        <Box sx={{ margin: "0 auto", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <EngagementChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopSellingCourses />
            </Grid>
            <Grid item xs={12} md={12}>
              <CompletionRate />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
