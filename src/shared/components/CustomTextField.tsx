import { TextField } from "@mui/material";

const CustomTextField = ({ defaultValue, name, value, placeholder, handleInput, disabled, multiline, rows, required, error, helperText, handlePaste, type }:
    { defaultValue?: string; disabled?: boolean; name: string; value?: string | number; placeholder?: string; handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void; multiline?: boolean; rows?: number; required?: boolean; error?: boolean; helperText?: string; handlePaste?: (e: React.ClipboardEvent) => void; type?: string }
) => {
    return (
        <TextField
            disabled={disabled}
            name={name}
            onChange={handleInput}
            value={value || ''}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type || 'text'}
            size="small"
            rows={rows}
            required={required}
            error={error}
            helperText={helperText}
            multiline={multiline || false}
            onPaste={handlePaste}
            sx={{
                mt: 0.8,
                "& .MuiOutlinedInput-root": {
                    color: "grey.500",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "8px",
                    },
                },
                '& .MuiInputBase-input.Mui-disabled': {

                    color: '#747083',
                    WebkitTextFillColor: '#747083',
                    opacity: 1,
                },
                '& .MuiInputBase-input::placeholder': {
                    color: '#747083',
                    opacity: 1,
                },
            }}
            fullWidth
        />
    );
};

export default CustomTextField;