import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const SearchBarWithFilter = () => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        variant="outlined"
        placeholder="Search for teacher..."
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px", // Rounded corners for the search bar
          },
        }}
      />
      <IconButton
        aria-label="filter"
        sx={{
          border: "1px solid #ccc", // Add a border to the filter button
          borderRadius: "10px", // Slightly rounded corners for the filter button
          padding: "15px", // Adjust padding for better spacing
          backgroundColor: "##E5E7EB", // Light background color
          "&:hover": {
            backgroundColor: "#e0e0e0", // Darker background on hover
          },
          display: "flex",
          alignItems: "center",
          gap: "8px", // Space between icon and text
        }}>
        <TuneIcon />
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          Filter
        </Typography>
      </IconButton>
    </Box>
  );
};

export default SearchBarWithFilter;
