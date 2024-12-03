import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseApproved = () => {
  const [priceType, setPriceType] = useState('Subscription');
  const [price, setPrice] = useState('$349');

  const handlePriceTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceType(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 2,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {/* Back Button with Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/admin/course-management">
            <IconButton sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Introduction of Design System
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: '#d0d0d0',
              color: '#555',
              '&:hover': { borderColor: '#b0b0b0', backgroundColor: '#f9f9f9' },
            }}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1765c1' },
            }}
          >
            Accept
          </Button>
        </Box>
      </Box>

      {/* Price Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Price
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
          {/* Price Type */}
          <FormControl fullWidth>
            <InputLabel id="price-type-label">Price Type</InputLabel>
            <Select
              labelId="price-type-label"
              id="price-type"
              defaultValue="Subscription"
              sx={{ backgroundColor: '#fff' }}
            >
              <MenuItem value="Subscription">Subscription</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
            </Select>
          </FormControl>

          {/* Price */}
          <TextField
            label="Price"
            defaultValue="$349"
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
        </Box>

        {/* Course Details */}
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Course Details
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Course Title"
            defaultValue="Introduction to Design System"
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            defaultValue="This course will provide a detailed introduction to the design system..."
            fullWidth
            sx={{ backgroundColor: '#fff' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CourseApproved;
