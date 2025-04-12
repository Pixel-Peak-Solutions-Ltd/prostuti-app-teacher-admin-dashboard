import { Link, useNavigate, useParams } from "react-router-dom";
import {
    useApproveCourseStatusMutation,
    useDeleteCourseMutation,
    useGetCoursePreviewQuery,
    // useApproveCourseStatusMutation,
    // useUpdateCoursePriceMutation
} from "../../../../redux/features/course/courseApi";
import Loader from "../../../../shared/components/Loader";
import { Box, Button, Card, Paper, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import test_icon from '../../../../assets/images/test-icon.png';
import assignment_icon from '../../../../assets/images/assignment-icon.png';
import resource_icon from '../../../../assets/images/resource-icon.png';
import video_icon from '../../../../assets/images/video-icon.png';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { materialsInPreview } from "../../../../utils/Constants";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { TUser } from "../../../../types/types";
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import CustomTextField from "../../../../shared/components/CustomTextField";
import EditRequestDialog from "../../../../shared/components/EditRequestDialouge";
import SuccessDialog from "../../../../shared/components/SuccessDialog";

const CoursePreview = () => {
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({ priceType: false, price: false });
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [fullText, setFullText] = useState<boolean>(false);
    const [priceType, setPriceType] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const { data: courseData, isLoading } = useGetCoursePreviewQuery({ courseId });
    const [deleteCourse, { isSuccess: courseDeleteSuccess, isLoading: courseDeleteLoader }] = useDeleteCourseMutation();
    const [approveCourseStatus, { isLoading: statusUpdateLoader }] = useApproveCourseStatusMutation();
    // const [updateCoursePrice, { isLoading: priceUpdateLoader }] = useUpdateCoursePriceMutation();

    // prefilling the price type and price fields with the course data
    useEffect(() => {
        if (courseData?.data?.priceType) {
            setPriceType(courseData.data.priceType);
        }
        if (courseData?.data?.price) {
            setPrice(courseData.data.price.toString());
        }
    }, [courseData]);


    // Get user role from Redux store
    const user = useAppSelector((state: RootState) => state.auth.user as TUser);
    const isAdmin = user.role === "admin";

    // Price type options
    const priceTypeOptions = ["Free", "Paid", "Subscription"];

    if (isLoading || courseDeleteLoader) {
        return <Loader />;
    }

    const isPriceEditable = !courseData?.data?.priceType;


    console.log('course data', courseData.data);

    // Handle price type change
    const handlePriceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceType(e.target.value);
    };

    // Handle price change
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    // Handle add coupon
    const handleAddCoupon = () => {
        // Navigate to coupon creation page or open modal
        console.log("Add coupon clicked");
    };

    const handleCourseDelete = async () => {
        try {
            await deleteCourse({ courseId });
        } catch (err) {
            console.log(err);
        }
    };

    // const handleCourseApprove = async (status: boolean) => {
    //     try {
    //         await approveCourseStatus({
    //             courseId,
    //             status
    //         });
    //         // Navigate back to admin course list after approval/decline
    //         navigate('/admin/courses');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const handleCourseApprove = async () => {
        const errors = {
            priceType: !priceType.trim(),
            price: priceType === "Paid" && (!price || isNaN(Number(price)) || Number(price) <= 0),
        };

        setFormErrors(errors);

        if (errors.priceType || errors.price) return;

        const payload = {
            priceType,
            price: Number(price),
        };

        try {
            await approveCourseStatus({ courseId, data: payload }).unwrap();
            setSuccessDialogOpen(true);
        } catch (err) {
            console.error("Course approval failed:", err);
        }
    };



    const { name, details, lessons } = courseData.data;

    console.log('course data:', courseData.data);

    if (courseDeleteSuccess) {
        navigate('/teacher/my-course');
    }

    return (
        <Box sx={{ borderRadius: '10px', p: 3 }}>
            <Paper variant="outlined" sx={{ borderRadius: '10px', p: 3 }}>
                {/* top title and action button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    {/* back button and title */}
                    <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                        <Link to={isAdmin ? `/admin/course-management` : `/teacher/my-course`}>
                            <Button variant='outlined' sx={{ width: '36px', height: '36px', minWidth: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                                <ArrowBackIcon fontSize='small' />
                            </Button>
                        </Link>
                        <Typography variant='h3'>{name}</Typography>
                    </Box>

                    {/* action buttons based on role */}
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }} >
                        {(isAdmin && !courseData?.data.price) ? (
                            // Admin buttons - Decline and Accept
                            <>
                                <Button
                                    // onClick={() => handleCourseApprove(false)}
                                    variant='outlined'
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}>
                                    Decline
                                </Button>
                                <Button
                                    onClick={handleCourseApprove}
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}
                                    disabled={statusUpdateLoader}
                                >
                                    {statusUpdateLoader ? "Approving..." : "Accept"}
                                </Button>

                            </>
                        ) : (
                            // Teacher button - Delete
                            <></>
                            // <Button
                            //     onClick={handleCourseDelete}
                            //     variant='outlined'
                            //     sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}>
                            //     <DeleteOutlinedIcon fontSize='small' />
                            //     Delete
                            // </Button>
                        )}
                    </Box>
                </Box>

                {/* course details section */}
                <Box component="section" sx={{ my: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "600", my: 3 }}>Course Description</Typography>
                    <Box sx={{ border: "1px solid #E4E4E7", borderRadius: 2, p: 2 }}>
                        <Typography variant="subtitle1" color="grey.500">{fullText ? details : details.slice(0, 200)} ...</Typography>
                        {
                            fullText ?
                                (<Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => setFullText(false)}>See Less</Button>)
                                : (<Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => setFullText(true)}>See More</Button>)
                        }
                    </Box>
                </Box>

                {/* Price section - only visible for admin */}
                {isAdmin && (
                    <Box component="section" sx={{ my: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: "600", mb: 2 }}>Price</Typography>

                        <Grid container spacing={2}>
                            {/* Price Type Dropdown */}
                            <Grid size={6}>
                                <Typography variant="subtitle1">Price Type</Typography>
                                <CustomAutoComplete
                                    options={priceTypeOptions}
                                    name="priceType"
                                    value={courseData?.data.priceType || priceType}
                                    handleInput={handlePriceTypeChange}
                                    placeholder="Select price type"
                                    error={formErrors.priceType}
                                    disabled={!isPriceEditable}

                                />
                            </Grid>

                            {/* Price Input */}
                            <Grid size={6}>
                                <Typography variant="subtitle1">Price</Typography>
                                <CustomTextField
                                    name="price"
                                    value={courseData?.data.price || price}
                                    handleInput={handlePriceChange}
                                    placeholder="999"
                                    type="number"
                                    error={formErrors.price}
                                    disabled={!isPriceEditable}
                                />
                            </Grid>
                        </Grid>

                        {/* Add Coupon Button */}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={handleAddCoupon}
                                sx={{ px: 0 }}
                            >
                                + Add Coupon
                            </Button>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" sx={{ fontWeight: "600", mb: 2 }}>Course Description</Typography>
                    </Box>
                )}

                {/* material type list section */}
                <Box>
                    <Grid container sx={{ rowGap: 3 }}>
                        {materialsInPreview.map((item, index) => (
                            <Grid size={3} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                                <Link to={`/${isAdmin ? 'admin' : 'teacher'}/${item.name.split(' ').join('-').toLowerCase()}-list`}
                                    style={{ textDecoration: 'none', color: '#3F3F46' }}>
                                    <Box>
                                        <Paper variant="outlined" sx={{ width: '305px', height: '169px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, alignItems: 'center', py: 1, borderRadius: 4 }}>
                                            <img src={item.logo} style={{ width: '80px', height: '80px' }} />
                                            <Typography variant="h5" sx={{
                                                '&:hover': {
                                                    color: '#2970FF',
                                                }
                                            }}>
                                                {item.name}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* lessons section*/}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "20px", mt: 3 }}>Course Modules</Typography>
                    <Paper variant="outlined" sx={{ mt: 3, p: 3.5, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: "600" }}>Lessons</Typography>
                        <Grid container spacing={2} sx={{ mt: 3, }}>
                            {lessons.map((lesson) => (
                                <Grid size={12}>
                                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "600", mb: 2 }}>{lesson.number}: {lesson?.name}</Typography>
                                    {/* record classes */}
                                    {
                                        lesson?.recodedClasses.length > 0 && (
                                            <Box>
                                                {lesson?.recodedClasses.map((recordClass, index) => (
                                                    <Link to={`/${isAdmin ? 'admin' : 'teacher'}/record-update/${recordClass?._id}`} style={{ textDecoration: "none" }}>
                                                        <Card variant="outlined"
                                                            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                            <Box sx={{ width: "3%" }}>
                                                                <img src={video_icon} style={{ width: "24px", height: "24px" }} />
                                                            </Box>
                                                            <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Record Class {index + 1}</Typography>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{recordClass?.recodeClassName}</Typography>
                                                                </Box>
                                                                <Box sx={{ justifySelf: 'flex-end' }}>
                                                                    <ArrowOutwardIcon color="primary" />
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Link>
                                                ))}
                                            </Box>)
                                    }
                                    {/* assignments */}
                                    {
                                        lesson?.assignments.length > 0 && (
                                            <Box>
                                                {lesson?.assignments.map((assignment, index) => (
                                                    <Link to={`/${isAdmin ? 'admin' : 'teacher'}/assignment-update/${assignment?._id}`} style={{ textDecoration: "none" }}>
                                                        <Card variant="outlined"
                                                            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                            <Box sx={{ width: "3%" }}>
                                                                <img src={assignment_icon} style={{ width: "24px", height: "24px" }} />
                                                            </Box>
                                                            <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Assignment {index + 1}</Typography>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{assignment?.assignmentNo}</Typography>
                                                                </Box>
                                                                <Box sx={{ justifySelf: 'flex-end' }}>
                                                                    <ArrowOutwardIcon color="primary" />
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Link>
                                                ))}
                                            </Box>)
                                    }

                                    {/* resources */}
                                    {
                                        lesson?.resources.length > 0 && (
                                            <Box>
                                                {lesson?.resources.map((resource, index) => (
                                                    <Link to={`/${isAdmin ? 'admin' : 'teacher'}/resource-update/${resource?._id}`} style={{ textDecoration: "none" }}>
                                                        <Card variant="outlined"
                                                            sx={{ display: "flex", alignItems: "center", gap: 2, my: 1, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                            <Box sx={{
                                                                width: "3%"
                                                            }}>
                                                                <img src={resource_icon} style={{ width: "24px", height: "24px" }} />
                                                            </Box>
                                                            <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Resource {index + 1}</Typography>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{resource?.name}</Typography>
                                                                </Box>
                                                                <Box sx={{ justifySelf: 'flex-end' }}>
                                                                    <ArrowOutwardIcon color="primary" />
                                                                </Box>
                                                            </Box>

                                                        </Card>
                                                    </Link>
                                                ))}
                                            </Box>)
                                    }
                                    {/* tests */}
                                    {
                                        lesson?.tests && lesson?.tests.length > 0 && (
                                            <Box>
                                                {lesson?.tests.map((test, index) => (
                                                    <Link to={`/${isAdmin ? 'admin' : 'teacher'}/test-update/${test?._id}`} style={{ textDecoration: "none" }}>
                                                        <Card variant="outlined"
                                                            sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.8, px: 1.5, py: 0.8, borderRadius: 2 }}>
                                                            <Box sx={{
                                                                width: "3%"
                                                            }}>
                                                                <img src={test_icon} style={{ width: "24px", height: "24px" }} />
                                                            </Box>
                                                            <Box sx={{ width: "97%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "600" }} color="#475467">Test {index + 1}</Typography>
                                                                    <Typography variant="subtitle1" sx={{ fontSize: "14px", fontWeight: "500" }} color="#475467">{test?.name}</Typography>
                                                                </Box>
                                                                <Box sx={{ justifySelf: 'flex-end' }}>
                                                                    <ArrowOutwardIcon color="primary" />
                                                                </Box>
                                                            </Box>
                                                        </Card>
                                                    </Link>
                                                ))}
                                            </Box>)
                                    }
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Box>
            </Paper>
            <SuccessDialog
                open={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                message="Course Approved"
            />

        </Box>
    );
};

export default CoursePreview;