import { Box, Button, Paper, Typography, SnackbarCloseReason } from "@mui/material";
import Alert from "../../../../../shared/components/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../../shared/components/CustomLabel";
import { useAppSelector } from "../../../../../redux/hooks";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import UploadIcon from '@mui/icons-material/Upload';
import { formatNotice } from "../../../../../utils/noticeFormation";
import Loader from "../../../../../shared/components/Loader";
import {
    useCreateNoticeMutation, useDeleteNoticeMutation, useGetNoticeByIdQuery,
    useUpdateNoticeMutation
} from "../../../../../redux/features/materials/materialsApi";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const NoticeCreation = () => {
    const navigate = useNavigate();
    const [numOfForms, setNumOfForms] = useState(1);
    const [notice, setNotice] = useState<Record<string, string>>({});
    const [updateNoticeData, setUpdateNoticeData] = useState<Record<string, string>>({
        notice: ""
    });
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    // checking if user coming form course preview page
    const { noticeId } = useParams();
    // checking whether there is a noticeId present. This means user is in editing mode
    const isEditing = !!noticeId;
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // redux api call
    const [createNotice, { data, error, isSuccess, isLoading: noticeCreationLoader }] = useCreateNoticeMutation();
    // api call to get existing record class data for update operation
    const {
        data: existingNoticeData,
        isLoading: existingNoticeFetching
    } = useGetNoticeByIdQuery({ noticeId }, { skip: !noticeId });
    // api call for updating notice
    const [updateNotice, {
        data: updatedData,
        error: updateError,
        isSuccess: updateSuccess,
        isLoading: updateNoticeLoader
    }] = useUpdateNoticeMutation();
    // delete notice api call
    const [deleteNotice, { isSuccess: deleteNoticeSuccess, isLoading: deleteNoticeLoader }] = useDeleteNoticeMutation();
    // const resourceCreationLoading = false;
    // fetching courseId from the local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);

    const noticeArray = formatNotice(notice);

    useEffect(() => {
        if (existingNoticeData && noticeId) {
            setUpdateNoticeData({
                notice: existingNoticeData.data.notice
            });
        }
    }, [existingNoticeData, noticeId]);

    if (noticeCreationLoader || deleteNoticeLoader || existingNoticeFetching) {
        return <Loader />;
    }

    console.log('success update confirmation:', updateSuccess);
    // question type selection

    const handleNoticeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (isEditing) {
            setUpdateNoticeData((prevState) => ({ ...prevState, [name]: value }));
        } else {
            setNotice((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    //* handling the submit function
    const handleNoticeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const noticeData = {
            course_id: courseId,
            notices: noticeArray
        };

        try {
            if (isEditing) {
                await updateNotice({ updateNoticeData, noticeId });
            } else {
                // sending the request to the server via redux toolkit
                await createNotice(noticeData);
            }
        } catch (err) {
            console.log(err);
        }
        console.log('success update:', updateSuccess);
        console.log('error data:', updateError);

        // if ('data' in error) {
        //     setErrorMessage((error.data as { message: string; }).message);
        // }

        // set

        setNotice({});
        setNumOfForms(1);
        setOpenSnackbar(true);
    };

    //close snackbar automatically
    const handleNoticeDelete = async () => {
        try {
            await deleteNotice({ noticeId });
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseSnackbar = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    if (deleteNoticeSuccess) {
        navigate(`/teacher/notice-list`);
    }

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                    {/* top title and button section */}
                    <Box component="section" sx={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        {/* back button and title */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px' }}>
                            <Link to={isEditing ? "/teacher/notice-list" : "/teacher/create-course/add-course-material"}>
                                <Button variant="outlined" sx={{
                                    width: '36px',
                                    height: '36px',
                                    minWidth: '36px',
                                    borderRadius: '8px',
                                    borderColor: "grey.700",
                                    color: "#3F3F46"
                                }}>
                                    <ArrowBackIcon fontSize="small" />
                                </Button>
                            </Link>
                            <Typography variant="h3">Notice</Typography>
                        </Box>

                        {
                            isEditing && (
                                <Button
                                    onClick={handleNoticeDelete}
                                    variant="outlined"
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px', gap: 1 }}>
                                    <DeleteOutlinedIcon fontSize="small" />
                                    Delete
                                </Button>
                            )
                        }
                        {/* continue button */}
                        {/* <Link to='/teacher/create-course/add-course-lessons'> */}
                        {
                            !isEditing && (
                                <Button
                                    // onClick={handleContinue}
                                    variant="contained"
                                    sx={{ borderRadius: '8px', width: '140px', height: '48px' }}>
                                    Continue <ChevronRightIcon />
                                </Button>
                            )
                        }

                        {/* </Link> */}
                    </Box>
                    {/* form section starts here */}
                    {
                        noticeCreationLoader && (
                            <Loader />
                        )
                    }
                    {/*update loader*/}
                    {
                        updateNoticeLoader && (
                            <Loader />
                        )
                    }
                    {
                        !noticeCreationLoader && (
                            <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                                <form onSubmit={handleNoticeSubmit}>
                                    {
                                        Array.from(Array(numOfForms)).map((_, index) => (
                                            <Paper key={index} variant="outlined"
                                                sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                                <Grid container spacing={2}>
                                                    <Button
                                                        onClick={() => {
                                                            setNumOfForms((prev) => prev - 1);
                                                        }}
                                                        disabled={numOfForms === 1 ? true : index !== numOfForms - 1}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            borderRadius: '5px',
                                                            width: '15px',
                                                            minWidth: '15px',
                                                            height: '15px',
                                                            borderColor: "grey.700",
                                                            color: "#3F3F46",
                                                            position: 'absolute',
                                                            right: '20px',
                                                            p: 1,
                                                        }}>
                                                        X
                                                    </Button>
                                                    {/* notice description field*/}
                                                    <Grid size={12}>
                                                        <CustomLabel fieldName="Notice*" />
                                                        <CustomTextField
                                                            name={isEditing ? 'notice' : `notice_${index}`}
                                                            value={isEditing ? updateNoticeData?.notice : notice[`notice_${index}`]}
                                                            handleInput={handleNoticeInput}
                                                            placeholder="Write notice"
                                                            multiline={true}
                                                            rows={8}
                                                            required={true}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                        ))
                                    }
                                    {/* form buttons */}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                                        {
                                            !isEditing && (
                                                <Button
                                                    onClick={() => {
                                                        setNumOfForms((prevState) => prevState + 1);
                                                    }}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        width: '167px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        fontSize: '14px'
                                                    }}>
                                                    + Add New Notice
                                                </Button>
                                            )
                                        }
                                        <Button
                                            variant="contained"
                                            size="small"
                                            type="submit"
                                            sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                            <UploadIcon /> {isEditing ? 'Update Notice' : 'Create Notice'}
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        )
                    }

                </Paper>
            </Box>
            {/* showing alert for what happened after submitting the request */}
            <Alert
                openSnackbar={openSnackbar}
                autoHideDuration={5000}
                handleCloseSnackbar={handleCloseSnackbar}
                isSuccess={isSuccess}
            // message={}
            />
        </>
    );
};

export default NoticeCreation;