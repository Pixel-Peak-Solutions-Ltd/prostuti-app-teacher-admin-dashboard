import { Box, Grid2, Paper, Typography } from "@mui/material";
import PaymentTable from "./PaymentTable";
const PaymentManagement = () => {
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
          <Typography variant="h3">Payment Management</Typography>
          <div></div>
        </Box>

        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Grid2 container spacing={2} sx={{ mt: 3 }}>
            <PaymentTable/>
          </Grid2>
        </Box>
      </Paper>
      
    </Box>
  );
};

export default PaymentManagement;
