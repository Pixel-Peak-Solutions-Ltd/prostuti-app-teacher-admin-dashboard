import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchField = ({ placeholder, value, handleInput, defaultValue, name }: { placeholder?: string; value?: string; handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void; defaultValue?: string; name: string; }) => {
    return (
        <>
            <TextField
                name={name}
                value={value || ''}
                onChange={handleInput}
                id="outlined-start-adornment"
                defaultValue={defaultValue}
                size="small"
                fullWidth
                placeholder={placeholder}
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
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>,
                    },
                }}
            />
        </>
    );
};

export default SearchField;