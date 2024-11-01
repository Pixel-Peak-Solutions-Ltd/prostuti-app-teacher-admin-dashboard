import { TextField } from "@mui/material";

const CustomTextField = ({ defaultValue, name, placeholder, handleInput, disabled }:
    { defaultValue: string; disabled?: boolean; name: string; value?: string; placeholder: string; handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; }
) => {
    return (
        <TextField
            disabled={disabled}
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