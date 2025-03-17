import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

const selectStyles = {
  mb: 2,
  borderRadius: "8px",
  "& .MuiOutlinedInput-input": {
    padding: "8.5px 12px", // Match TextField height
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
  },
  "& .MuiSelect-select": {
    color: "#747083",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#747083",
    opacity: 1,
  },
};

const SearchBarWithFilter = () => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  // Handle Search
  const handleSearch = () => {
    // Handle search logic here
    console.log(subject, category);

    setOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
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
              borderRadius: "10px",
            },
          }}
        />
        <IconButton
          aria-label="filter"
          onClick={() => setOpen(true)}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}>
          <TuneIcon />
          <Typography variant="body2" sx={{ color: "text.primary", ml: 1 }}>
            Filter
          </Typography>
        </IconButton>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 3,
          }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}>
            <Typography variant="h6" fontWeight={600}>
              Filter
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary" mb={4} mt={-2}>
            Please enter specific filters for this search.
          </Typography>

          <Typography variant="body2" fontWeight={500} mb={1}>
            Search by Subject
          </Typography>
          <Select
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            displayEmpty
            sx={selectStyles}>
            <MenuItem value="" disabled>
              Select Subject
            </MenuItem>
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
          </Select>

          <Typography variant="body2" fontWeight={500} mb={1}>
            Search by Category
          </Typography>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            sx={selectStyles}>
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="Primary">Primary</MenuItem>
            <MenuItem value="Secondary">Secondary</MenuItem>
          </Select>

          <Button
            onClick={handleSearch}
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: "10px", backgroundColor: "#2563EB" }}>
            Search
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SearchBarWithFilter;
