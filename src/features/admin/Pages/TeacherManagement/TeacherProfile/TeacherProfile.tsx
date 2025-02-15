import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router-dom";
import CustomLabel from "../../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { CourseCard } from "../../CourseManagement/Components/CourseCard";

const activities = [
  { detail: "Accepted Flashcard", time: "3 minutes ago" },
  { detail: "Accepted Flashcard", time: "3 minutes ago" },
  { detail: 'Edited a card in "World War" flashcard', time: "3 minutes ago" },
  { detail: 'Deleted a card in "World War" flashcard', time: "3 minutes ago" },
  { detail: "Accepted flashcard", time: "3 minutes ago" },
  { detail: "Accepted flashcard", time: "3 minutes ago" },
  { detail: 'Edited a card in "World War" flashcard', time: "3 minutes ago" },
  { detail: 'Deleted a card in "World War" flashcard', time: "3 minutes ago" },
];

const courses = [
  {
    id: 1,
    title: "BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি",
    image: "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  },
  {
    id: 2,
    title: "BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি",
    image: "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  },
  {
    id: 3,
    title: "BCS কোর্স ৪র্থ বর্ষ সমাপনী পরীক্ষা প্রস্তুতি",
    image: "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  },
];

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{ width: "100%", borderRadius: "25px", p: 3 }}>
        {/* ---------------------------Teacher Information */}
        <form encType="multipart/form-data">
          {/* top profile title and button section */}
          <Box
            component="section"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Box
              component="section"
              sx={{
                display: "flex",
                gap: "15px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              {/* <Link to='/teacher/question-database'> */}
              <Button
                variant="outlined"
                sx={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  borderColor: "grey.700",
                  color: "#3F3F46",
                }}
                onClick={() => {
                  navigate("/admin/teacher-management");
                }}>
                <ArrowBackIcon fontSize="small" />
              </Button>
              {/* </Link> */}
              <Typography variant="h3">Teacher Profile</Typography>
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "120px",
                height: "38px",
                borderRadius: "8px",
                fontSize: "14px",
              }}>
              Save
            </Button>
          </Box>

          {/* profile picture and teacher name */}
          <Box
            component="section"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 3,
              mt: 3,
            }}>
            {/* avatar section */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt="teacher-photo"
                src={""}
                sx={{ width: "130px", height: "130px" }}
              />
              {/* new image upload button */}
            </Box>
            {/* avatar section ends */}
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 0.5,
              }}>
              <Typography variant="h3">teacher@gmail.com</Typography>
              <Typography variant="h6" sx={{ fontWeight: "650" }}>
                {id}
              </Typography>
            </Box>
          </Box>
          {/* profile information section */}
          <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              Generals
            </Typography>
            {/* Row 1 */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={6}>
                <CustomLabel fieldName="Name" />
                <CustomTextField
                  value={""}
                  // defaultValue={name || ""}
                  name="name"
                  placeholder={"Teacher"}
                />
              </Grid>
              <Grid size={6}>
                <CustomLabel fieldName="Contact Number" />
                <CustomTextField
                  name="phone"
                  // defaultValue={phone || ""}
                  placeholder={"018745869547"}
                />
              </Grid>
              {/* date field */}
            </Grid>
            {/* Row 2 */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={6}>
                <CustomLabel fieldName="Joined Date" />
                <CustomTextField
                  value={""}
                  // defaultValue={name || ""}
                  name="joinedDate"
                  placeholder={"January 09, 2024"}
                />
              </Grid>
              <Grid size={6}>
                <CustomLabel fieldName="Subject" />
                <CustomTextField
                  name="subject"
                  // defaultValue={phone || ""}
                  placeholder={"Physic"}
                />
              </Grid>
              {/* date field */}
            </Grid>
            {/* Row 3 */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={6}>
                <CustomLabel fieldName="Type" />
                <CustomTextField
                  value={""}
                  // defaultValue={name || ""}
                  name="type"
                  placeholder={"Job"}
                />
              </Grid>
              <Grid size={6}>
                <CustomLabel fieldName="Assigned Work" />
                <CustomTextField name="assignedWork" />
              </Grid>
              {/* date field */}
            </Grid>
            <Divider sx={{ mt: 3 }} />
          </Box>
        </form>
        {/* ---------------------------Teacher Courses */}
        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>
            Courses
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={3}>
          {courses.map((course) => (
            <Box key={course.id}>
              <CourseCard course={course} />
            </Box>
          ))}
        </Box>
        {/* ---------------------------Teacher Activity */}
        <Box component="section" sx={{ mt: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>
            Activity
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              {activities.map((val) => (
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 0.8,
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                  }}>
                  <AccessTimeOutlinedIcon fontSize="large" color="disabled" />
                  <Box component="div">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "14px", fontWeight: "600" }}>
                      {val.detail}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="grey.500"
                      sx={{ fontSize: "14px", fontWeight: "500" }}>
                      {val.time}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
export default TeacherProfile;
