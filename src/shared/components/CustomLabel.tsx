import { Typography } from "@mui/material";

const CustomLabel = ({ fieldName }: { fieldName: string }) => {
    return (
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500" }} color="grey.700">{fieldName}</Typography>
    );
};

export default CustomLabel;