// setQuestion: React.Dispatch<React.SetStateAction<Record<string, string>>>
import { FormControl, MenuItem, TextField, } from "@mui/material";

const CustomAutoComplete = (
    { options, handleInput, name, required, }:
        { options: string[]; name: string; handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; }
) => {
    return (
        <FormControl fullWidth>
            <TextField
                name={name}
                // value={age}
                onChange={handleInput}
                size="small"
                select
                required={required}
                sx={{
                    mt: 0.8,
                    "& .MuiOutlinedInput-root": {
                        color: "grey.500",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "8px",
                        }
                    }
                }}
            >
                {
                    options.map((itemName) => (
                        <MenuItem key={itemName} value={itemName}>
                            {itemName}
                        </MenuItem>
                    ))
                }
            </TextField>
        </FormControl>
    );
};

export default CustomAutoComplete;