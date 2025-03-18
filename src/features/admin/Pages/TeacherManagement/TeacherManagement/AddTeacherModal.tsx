import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { SelectChangeEvent } from "@mui/material/Select";

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

interface AddCouponModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddTeacherModal: React.FC<AddCouponModalProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
    assignedWork: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  //   Handle Form Submit
  const handleSubmit = () => {
    // Handle form submission here
    // console.log("Form submitted with data:", formData);
    // You can add validation here
    // After successful submission, close the modal
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
            Add Teacher
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={4} mt={-2}>
          Please enter teacher information
        </Typography>

        {/* Name */}
        <Typography variant="body2" fontWeight={500} mb={1}>
          Name
        </Typography>
        <CustomTextField
          name="name"
          value={formData.name}
          placeholder="Enter teacher name"
          handleInput={handleInputChange}
        />

        {/* Email */}
        <Typography variant="body2" fontWeight={500} mb={1} mt={2}>
          Email
        </Typography>
        <CustomTextField
          name="email"
          value={formData.email}
          placeholder="Enter teacher email"
          handleInput={handleInputChange}
          type="email"
        />

        {/* Password */}
        <Typography variant="body2" fontWeight={500} mb={1} mt={2}>
          Password
        </Typography>
        <CustomTextField
          name="password"
          value={formData.password}
          placeholder="Enter teacher password"
          handleInput={handleInputChange}
          type="email"
        />

        <Typography variant="body2" fontWeight={500} mb={1} mt={2}>
          Subject
        </Typography>
        <Select
          fullWidth
          value={formData.subject}
          onChange={(e) => handleSelectChange(e, "subject")}
          displayEmpty
          sx={selectStyles}>
          <MenuItem value="" disabled>
            Select Subject
          </MenuItem>
          <MenuItem value="Math">Math</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
        </Select>

        <Typography variant="body2" fontWeight={500} mb={1}>
          Assigned Work
        </Typography>
        <Select
          fullWidth
          value={formData.assignedWork}
          onChange={(e) => handleSelectChange(e, "assignedWork")}
          displayEmpty
          sx={selectStyles}>
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          <MenuItem value="Flashcard">Flashcard</MenuItem>
          <MenuItem value="Question">Question</MenuItem>
        </Select>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2, borderRadius: "10px", backgroundColor: "#2563EB" }}>
          Add Teacher
        </Button>
      </Box>
    </Modal>
  );
};
