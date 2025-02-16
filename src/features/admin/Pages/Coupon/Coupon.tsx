import {
  Box,
  Button,
  Grid2,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CouponTabs from "./CouponTabs";
import SearchBar from "./SearchBar";
import CouponTable from "./CoupoonTable";
import AddCouponModal from "./AddCoupon";
import { useState } from "react";

const Coupon = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          <Typography variant="h3">Coupon Management</Typography>
          <div>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
        >
          Add New Coupon
        </Button>
        <AddCouponModal 
          open={open} 
          onClose={handleClose} 
        />
      </div>
        </Box>

        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Grid2 container spacing={2} sx={{ mt: 3 }}>
            
              <CouponTabs />
            
            
          </Grid2>
        </Box>
      </Paper>
      {/* nested children */}
    </Box>
  );
};

export default Coupon;
