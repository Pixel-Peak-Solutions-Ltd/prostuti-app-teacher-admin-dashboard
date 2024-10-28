import { TextField } from "@mui/material";

const CustomTextField = () => {
    return (
        <TextField
            name='email'
            // onChange={handleChange}
            placeholder="Enter your email"
            type="text"
            size="small"
            value="asrafuzzaman@gmail.com"
            sx={{
                mt: 0.8,
                "& .MuiOutlinedInput-root": {
                    color: "grey.500",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "8px",
                    }
                }
            }}
            fullWidth
        />
    );
};

export default CustomTextField;