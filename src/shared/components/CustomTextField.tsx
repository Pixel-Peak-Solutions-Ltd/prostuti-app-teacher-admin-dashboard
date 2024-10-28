import { TextField } from "@mui/material";

const CustomTextField = ({ defaultValue, name, placeholder, handleInput }: { defaultValue: string; name: string; value?: string; placeholder: string; handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => {
    return (
        <TextField
            name={name}
            onChange={handleInput}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type="text"
            size="small"
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