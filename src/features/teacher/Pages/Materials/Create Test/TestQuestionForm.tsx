import Grid from '@mui/material/Grid2';
import CustomLabel from '../../../../../shared/components/CustomLabel';
import CustomTextField from '../../../../../shared/components/CustomTextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import AlertDialog from './AlertDialog';
import { useAppSelector } from '../../../../../redux/hooks';
import { useGetCategoryByIdQuery } from '../../../../../redux/features/category/categoryApi';
import { useGetCourseByIdQuery } from '../../../../../redux/features/course/courseApi';
import Loader from '../../../../../shared/components/Loader';


const TestQuestionForm = ({ index, handleTestQuestionInput, question, testDetails, setNumOfForms, numOfForms }:
    {
        handleTestQuestionInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        question: Record<string, string>;
        index: number;
        testDetails: Record<string, string>;
        numOfForms?: number;
        setNumOfForms?: React.Dispatch<React.SetStateAction<number>>;
    }
) => {
    // modal state
    const [open, setOpen] = useState(false);

    // fetching all academic questions
    const academicFields = ['Division', 'Subject', 'Chapter'];
    const jobFields = ['Subject'];
    const admissionFields = ['Subject', 'University Name', 'University Type', 'Chapter'];

    // fetching added questions from the database
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const questionsFromDatabase = useAppSelector((state) => state.pickedQuestions.questions);
    // fetching the course from the id
    const { data: courseData, isLoading } = useGetCourseByIdQuery({ courseId });
    const { data: singleCategory, isLoading: categoryLoading } = useGetCategoryByIdQuery({ id: courseData?.data?.category_id });

    // array id for question added from database
    const databaseQuestionIdArray = questionsFromDatabase.map((item) => item._id);


    if (categoryLoading) {
        return (<Loader />);
    }

    if (isLoading) {
        return (<Loader />);
    }
    const categoryType = singleCategory?.data.type;

    //* handler functions
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid size={index > 0 ? 11 : 9}>
                    <CustomLabel fieldName={`Question ${index + 1}`} />
                    <CustomTextField
                        name={`title_${index}`}
                        handleInput={handleTestQuestionInput}
                        placeholder='Write your question here'
                        value={question[`title_${index}`]}
                        required={true}
                    />
                </Grid>
                {/* conditional rendering the upload from database button */}
                {
                    index === 0 && (
                        <Grid size={2} sx={{ display: 'flex', alignSelf: 'flex-end' }}>
                            <Button
                                onClick={handleClickOpen}
                                variant='outlined'
                                size='small'
                                sx={{ width: '100%', height: '40px', borderRadius: '8px', fontSize: '14px' }}
                            >
                                Upload from Database
                            </Button>
                        </Grid>
                    )
                }

                <Grid size={1} sx={{ display: 'flex', alignSelf: 'flex-end', justifyContent: 'right' }}>
                    <IconButton
                        disabled={numOfForms === 1 ? true : index !== numOfForms - 1 ? true : false}
                        onClick={() => {
                            if (numOfForms > 1) {
                                setNumOfForms(state => state - 1);
                            }
                        }}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Grid>
            </Box>

            {/* mcq row */}
            {

                (testDetails?.type === 'MCQ') && (
                    <>
                        {Array.from(Array(4)).map((item, optionIndex) => (
                            <Grid size={3} key={optionIndex}>
                                <CustomLabel fieldName={`Option ${optionIndex + 1}`} />
                                <CustomTextField
                                    name={`option${optionIndex + 1}_${index}`}
                                    handleInput={handleTestQuestionInput}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={question[`option${optionIndex + 1}_${index}`]}
                                    required={true}
                                />
                            </Grid>
                        ))}
                        < Grid size={12}>
                            <CustomLabel fieldName='Correct Answer' />
                            <CustomTextField
                                name={`correctOption_${index}`}
                                handleInput={handleTestQuestionInput}
                                placeholder='Write the correct answer'
                                value={question[`correctOption_${index}`]}
                                required={true}
                            />
                        </ Grid>
                    </>
                )
            }
            {/* mcq row ends */}
            {/* question description */}
            <Grid size={12}>
                <CustomLabel fieldName='Answer Description' />
                <CustomTextField
                    name={`description_${index}`}
                    handleInput={handleTestQuestionInput}
                    placeholder="Explain the answer here"
                    value={question[`description_${index}`]}
                    multiline={true}
                    rows={4}
                    required={true}
                />
            </Grid>

            {/* question added from database */}

            <Grid size={12}>
                <Divider />
            </Grid>

            {/* modal for question adding */}
            <AlertDialog
                singleCategory={singleCategory.data}
                categoryType={categoryType}
                open={open}
                handleClose={handleClose}
                academicFields={academicFields}
                jobFields={jobFields}
                admissionFields={admissionFields}
                databaseQuestionIdArray={databaseQuestionIdArray}
            />
        </>
    );
};

export default TestQuestionForm;