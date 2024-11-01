import { Avatar, Box, Button, Card, Divider, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CustomTextField from "../../../shared/components/CustomTextField";
import CustomLabel from "../../../shared/components/CustomLabel";
import { useGetProfileQuery } from "../../../redux/features/auth/authApi";
import Loader from "../../../shared/components/Loader";
import { useUpdateTeacherMutation } from "../../../redux/features/teacher/teacherApi";


const Profile = () => {
    // to hide the default input field for file upload
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

    // below state stores the selected image url
    const [avatar, setAvatar] = useState('');
    //below state is for showing the upload button on hovering the avatar
    const [isHovering, setIsHovering] = useState(false);
    const [profileData, setProfileData] = useState({
        contactNumber: "",
        subject: "",
        jobType: ""
    });
    const [profileImg, setProfileImg] = useState<File | null>(null);
    // redux state
    const { data, isLoading } = useGetProfileQuery({});
    const [updateTeacher, { data: updateData, isSuccess, isError }] = useUpdateTeacherMutation();

    if (isLoading) {
        return <Loader />;
    }

    const { teacherId, email, joinedDate, jobType, subject, name } = data.data;
    // const teacherId = data?.data.teacherId;

    console.log('teacher id found:', teacherId);

    // form data handler
    //^ handling non file form data
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({ ...prevState, [name]: value }));
    };

    //^handling the avatar change
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAvatar(URL.createObjectURL(file));
            // Store the file separately for the form submission
            setProfileImg(file);
        }
    };

    //* handling the submitted form data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('from handleSubmit function', profileData);
        const teacherInfo = new FormData();
        // Append avatar if available
        if (profileImg) teacherInfo.append("avatar", profileImg);
        // Append profileData as a JSON string
        teacherInfo.append("profileData", JSON.stringify(profileData));

        // for (const [key, value] of Object.entries(profileData)) {
        //     formData.append(key, value);
        // }

        // Debugging: Check FormData entries
        // for (const [key, value] of teacherInfo.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        await updateTeacher({ teacherInfo, teacherId });
        // Check FormData content
        // console.log("all data together", formData);
        // console.log("FormData avatar:", formData.get("avatar"));
        // console.log("FormData entries:", Array.from(formData.entries()));
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: '100vh', borderRadius: '25px', p: 3 }}>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    {/* top profile title and button section */}
                    <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant='h3'>Profile</Typography>
                        <Button variant='contained' type='submit' sx={{ width: '120px', height: '38px', borderRadius: '8px', fontSize: '14px' }}>Save</Button>
                    </Box>
                    {/* profile picture and teacher name */}

                    <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                        {/* avatar section */}
                        <Box sx={{ position: 'relative' }}>
                            <Avatar alt="teacher-photo" src={avatar || ''} sx={{ width: "130px", height: "130px" }}
                                onMouseOver={() => setIsHovering(true)}
                                onMouseOut={() => setIsHovering(false)}
                            />
                            {/* new image upload button */}
                            {isHovering && (<Button component="label"
                                role={undefined}
                                size="small"
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{ position: 'absolute', top: "40%", left: '5px', color: "gray.700", borderRadius: "8px", cursor: "pointer" }}
                                onMouseOver={() => setIsHovering(true)}
                                onMouseOut={() => setIsHovering(false)}
                            >

                                Upload New
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleAvatarChange}
                                />
                            </Button>)

                            }
                        </Box>
                        {/* avatar section ends */}
                        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 0.5 }}>
                            <Typography variant="h3">{name}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: "650" }}>{teacherId}</Typography>
                        </Box>

                    </Box>
                    {/* profile information section */}
                    <Box component="section" sx={{ mt: 3, flexGrow: 1, }}>
                        <Typography variant="h5" sx={{ fontWeight: "600" }}>Generals</Typography>
                        <Grid container spacing={2} sx={{ mt: 3, }}>
                            <Grid size={6}>
                                <CustomLabel fieldName="Email" />
                                <CustomTextField
                                    disabled={true}
                                    defaultValue={email || ""}
                                    name="email"
                                    placeholder={email || ""}
                                    handleInput={handleInput}
                                />
                            </Grid>
                            <Grid size={6}>
                                <CustomLabel fieldName="Contact Number" />
                                <CustomTextField
                                    name="contactNumber"
                                    defaultValue=""
                                    placeholder="+88012345678"
                                    handleInput={handleInput}
                                />
                            </Grid>
                            {/* date field */}
                            <Grid size={4}>
                                <CustomLabel fieldName="Joined Date" />
                                <CustomTextField
                                    disabled={true}
                                    name="joinedDate"
                                    defaultValue={joinedDate || ""}
                                    placeholder={joinedDate || ""}
                                    handleInput={handleInput}
                                />
                            </Grid>
                            <Grid size={4}>
                                <CustomLabel fieldName="Subject" />
                                <CustomTextField
                                    defaultValue={subject || ''}
                                    name="subject"
                                    placeholder={subject || ''}
                                    handleInput={handleInput}
                                />
                            </Grid>
                            <Grid size={4}>
                                <CustomLabel fieldName="Type" />
                                <CustomTextField
                                    defaultValue={jobType || ""}
                                    name="jobType"
                                    placeholder={jobType || ""}
                                    handleInput={handleInput}
                                />
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 3 }} />
                    </Box>
                    {/* Activity section */}
                    <Box component="section" sx={{ mt: 3, flexGrow: 1, }}>
                        <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 }}>Activity</Typography>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                    <AccessTimeOutlinedIcon fontSize="large" color="disabled" />
                                    <Box component='div'>
                                        <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: '600' }}>Accepted flashcard</Typography>
                                        <Typography variant="subtitle1" color="grey.500" sx={{ fontSize: '14px', fontWeight: '500' }}>3 minutes ago</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Profile;