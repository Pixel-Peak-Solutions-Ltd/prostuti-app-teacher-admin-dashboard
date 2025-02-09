import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type TAprops = {
    defaultValue?: string;
    disabled?: boolean;
    name: string;
    value?: string | number;
    placeholder?: string;
    handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    handlePaste?: (e: React.ClipboardEvent) => void;
    type?: string; handleFileIconClick;
    fileInputRef: React.MutableRefObject<HTMLInputElement>;
    handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdornedTextField = (
    { defaultValue, name, value, placeholder, handleInput, disabled, multiline, rows, required, error, handlePaste, type, handleFileIconClick, fileInputRef, handleFileInput }: TAprops
) => {

    // const handleFileIconClick = (event: React.MouseEvent) => {
    //     const hiddenInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    //     hiddenInput?.click();
    // };
    // const [imageFiles, setImageFiles] = useState<File[]>([]);

    return (
        <OutlinedInput
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
            // helperText={helperText}
            multiline={multiline || false}
            onPaste={handlePaste}
            sx={{
                borderRadius: '8px',
                mt: 0.8,
                "& .MuiOutlinedInput-root": {
                    color: "grey.500",
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
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleFileIconClick}
                        edge="end"
                    >
                        <CropOriginalIcon />
                        <VisuallyHiddenInput
                            ref={fileInputRef}
                            type="file"
                            // onChange={(e) => {
                            //     setImageFile((prevState) => ({ ...prevState, imageFile: e.target.files[0] }));
                            //     console.log(e.target.files);
                            // }}
                            onChange={handleFileInput}
                            multiple
                        />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default AdornedTextField;