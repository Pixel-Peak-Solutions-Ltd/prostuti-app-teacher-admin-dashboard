import { Box } from "@mui/material";

const CourseCard = ({ course }: any) => {
    const { image: { path }, name } = course;
    return (
        <Box sx={{ width: '320px', height: '153px', display: "flex", flexDirection: "column", borderRadius: 8 }}>
            <img src={path} style={{ objectFit: "cover", borderRadius: 8 }} />
            <h4>{name}</h4>
        </Box>
    );
};

export default CourseCard;