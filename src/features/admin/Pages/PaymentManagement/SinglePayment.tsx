import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Button, Chip, Grid, Grid2, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddCouponModal from "../Coupon/AddCoupon";
import AddIcon from '@mui/icons-material/Add';
import { useGetPaymentByIdQuery } from '../../../../redux/features/payment/paymentApi';
import Loader from '../../../../shared/components/Loader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SingleUserPaymentTable from './SingleUserPaymentTable';
const SinglePayment = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: paymentsData, isLoading, isError } = useGetPaymentByIdQuery(id);
  if (isLoading) {
    return <Loader />;
  }
  const SinglePayment=paymentsData?.data

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
          <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                    {/* <Link to='/teacher/question-database'> */}
                    <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                        onClick={() => navigate("/admin/payment-management")}
                    >
                        <ArrowBackIcon fontSize='small' />
                    </Button>
                    {/* </Link> */}
                    <Typography variant='h3'>Payment Management</Typography>
                </Box>
          <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              <AddIcon/>
              Add Coupon Offer
            </Button>
            <AddCouponModal open={open} onClose={handleClose} />
          </div>
        </Box>

           {/* User Info Section */}
           <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          
          mb: 3 
        }}>
          <Avatar 
            src="/path-to-user-image.jpg" 
            alt="User" 
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">{SinglePayment?.student_id.name}</Typography>
            <Typography variant="body2" color="textSecondary">{SinglePayment?.student_id.studentId}</Typography>
          </Box>
        </Box>

         {/* General Info Section */}
         <Box sx={{ mb: 3 }}>
      <Typography 
        variant="subtitle1" 
        fontWeight="bold" 
        sx={{ mb: 1, fontSize: '0.95rem' }}
      >
        Generals
      </Typography>
      
      <Box sx={{ 
        display:"flex",
        flexDirection:"column",
        maxWidth:"800px",
        borderRadius: 1,
        p: 0.5
      }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              py: 1, 
              px: 1,
              
            }}>
              <Typography variant="body2" color="textSecondary">Email</Typography>
              <Typography variant="body2">{SinglePayment?.student_id.email}</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              py: 1, 
              px: 1,
              
            }}>
              <Typography variant="body2" color="textSecondary">Contact Number</Typography>
              <Typography variant="body2">{SinglePayment?.student_id.phone}</Typography>
            </Box>
          </Grid>
          
          {SinglePayment?.paymentType === 'Subscription' && (<Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              py: 1, 
              px: 1,
              
            }}>
              <Typography variant="body2" color="textSecondary">Subscription Plan</Typography>
              <Typography variant="body2">2</Typography>
            </Box>
          </Grid>)}
          
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              py: 1, 
              px: 1,
              
            }}>
              <Typography variant="body2" color="textSecondary">Coupon</Typography>
              {SinglePayment?.isCouponAdded ? (
                <Chip 
                  label="Active" 
                  size="small" 
                  color="success"
                  icon={<CheckCircleIcon fontSize="small" />}
                  sx={{ 
                    height: 20, 
                    '& .MuiChip-label': { 
                      px: 1,
                      fontSize: '0.75rem'
                    }
                  }}
                />
              ) : (
                <Typography variant="body2">Inactive</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>

        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Grid2 container spacing={2} sx={{ mt: 3 }}>
            <SingleUserPaymentTable student_id={SinglePayment.student_id._id}/>
          </Grid2>
        </Box>
      </Paper>
      {/* nested children */}
    </Box>
  );
};

export default SinglePayment;
