// setQuestion: React.Dispatch<React.SetStateAction<Record<string, string>>>
import { FormControl, MenuItem, TextField, } from "@mui/material";

const CustomAutoComplete = (
    { options, handleInput, name, required, value, disabled, placeholder, defaultValue }:
        { options: string[]; name: string; handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; value?: string; disabled?: boolean; placeholder?: string; defaultValue?: string },
) => {
    return (
        <FormControl fullWidth>
            <TextField
                name={name}
                value={value || ''}
                defaultValue={defaultValue}
                onChange={handleInput}
                placeholder={placeholder}
                size="small"
                select
                required={required}
                disabled={disabled}
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
                {/*a default empty option to allow clearing */}
                <MenuItem value="">
                    <em>Clear Selection</em>
                </MenuItem>
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