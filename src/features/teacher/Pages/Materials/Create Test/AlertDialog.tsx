import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomLabel from '../../../../../shared/components/CustomLabel';
import CustomTextField from '../../../../../shared/components/CustomTextField';
import CustomAutoComplete from '../../../../../shared/components/CustomAutoComplete';
import SearchIcon from '@mui/icons-material/Search';
import { useGetCourseByIdQuery } from '../../../../../redux/features/course/courseApi';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Loader from '../../../../../shared/components/Loader';
import { useState } from 'react';
import { useGetAllQuestionsQuery } from '../../../../../redux/features/question/questionApi';
import Checkbox from '@mui/material/Checkbox';
import { ISingleQuestion, saveQuestionToStore } from '../../../../../redux/features/question/questionSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AlertDialog(
    { open, handleClose, academicFields, jobFields, admissionFields, databaseQuestionIdArray }:
        {
            open: boolean;
            handleClose: () => void;
            academicFields: string[];
            jobFields: string[];
            admissionFields: string[];
            databaseQuestionIdArray: string[];
        }
) {
    //local states
    const [filters, setFilters] = useState<Record<string, string>>({});
    // getting courseId from local redux store
    // creating a query parameter object
    const questionQueryParams = {
        ...(filters.categoryType && { categoryType: filters.categoryType }),
        ...(filters.division && { division: filters.division }),
        ...(filters.subject && { subject: filters.subject }),
        ...(filters.chapter && { chapter: filters.chapter }),
        ...(filters.universityName && { universityName: filters.universityName }),
        ...(filters.universityType && { universityType: filters.universityType }),
    };

    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    // fetching the course from the id
    const { data: courseData, isLoading } = useGetCourseByIdQuery({ courseId });
    // first category filter applied when page loads
    questionQueryParams.categoryType = courseData?.data.category;

    // fetching all questions
    const { data: questions, isLoading: questionLoader } = useGetAllQuestionsQuery(questionQueryParams);

    const dispatch = useAppDispatch();

    if (isLoading) {
        return (<Loader />);
    }
    if (questionLoader) {
        return (<Loader />);
    }

    const subject = questions?.data?.data.map((question) => question.category[0].subject);
    // const uniqueSubjectArray = subject.filter((item, index) =>  )

    const arraysForFilterFields = {
        Subject: subject
    };

    // handling checkbox functionality
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            console.log('Question selected:');
            // dispatch(saveQuestionToStore(question));
        }
    };

    console.log('selected question ids:', databaseQuestionIdArray);
    console.log('All Subjects', subject);

    console.log('All questions', questions?.data?.data);

    console.log('fetching course category', courseData?.data.category);

    return (
        <>
            <Dialog
                fullWidth
                maxWidth='xl'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box sx={{ width: '100%', height: 'auto' }}>
                        {/* top title and button section */}
                        <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                            <Typography variant='h3'>{courseData?.data.category} Questions</Typography>
                        </Box>
                        {/* filter and question database section */}
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                            {/* filters */}
                            <Grid container spacing={2}>
                                <Grid size={2}>
                                    <CustomLabel fieldName={'Category'} />
                                    <CustomTextField
                                        name={'Category'}
                                        disabled
                                        value={courseData?.data.category}
                                    />
                                </Grid>
                                {/* academic filters */}
                                {courseData?.data.category === 'academic' &&
                                    (academicFields.map((name, index) => (
                                        <Grid size={2} key={index}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                key={index}
                                                options={[]}
                                                // value={filter[name.toLowerCase()]}
                                                // handleInput={handleFilter}
                                                name={name.toLowerCase()}
                                            />
                                        </Grid>
                                    )))
                                }
                                {/* job filters */}
                                {
                                    courseData?.data.category === 'Job' &&
                                    (jobFields.map((name, index) => (
                                        <Grid size={2} key={index}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                key={index}
                                                options={arraysForFilterFields[name] || []}
                                                // value={filter[name.toLowerCase()]}
                                                // handleInput={handleFilter}
                                                name={name.toLowerCase()}
                                            />
                                        </Grid>
                                    )))
                                }
                                {/* admission filters */}
                                {
                                    courseData?.data.category === 'Admission' &&
                                    (admissionFields.map((name, index) => (
                                        <Grid size={2} key={index}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                key={index}
                                                options={[]}
                                                // value={filter[name.toLowerCase()]}
                                                // handleInput={handleFilter}
                                                name={name.toLowerCase()}
                                            />
                                        </Grid>
                                    )))
                                }
                                <Grid size={2} sx={{ alignSelf: 'flex-end' }}>
                                    {/* <CustomLabel fieldName='' /> */}
                                    <Button variant='contained' sx={{ width: '100%', height: '44px', borderRadius: '8px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                                    // onClick={(e) => confirmFilter(e)}
                                    >
                                        Search <SearchIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* filters end */}
                        <Divider sx={{ my: 3 }} />
                        <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                            {
                                questions?.data?.data.map((question: typeof questions, index: number) => (
                                    <>
                                        <Grid container spacing={2} key={index}>
                                            {/* check box to select the question */}
                                            <Grid size={1}>
                                                <Checkbox
                                                    checked={databaseQuestionIdArray.includes(question._id) || false}
                                                    disabled={databaseQuestionIdArray.includes(question._id) || false}
                                                    {...label}
                                                    onChange={(e) => e.target.checked ? dispatch(saveQuestionToStore(question)) : console.log('Removed')}
                                                />
                                            </Grid>
                                            {/* question title  */}
                                            <Grid size={11}>
                                                <Grid container spacing={2}>
                                                    <Grid size={12}>
                                                        <CustomLabel fieldName={`Question-${index + 1}`} />
                                                        <CustomTextField
                                                            name={'question'}
                                                            disabled
                                                            placeholder={question.title}
                                                        />
                                                    </Grid>
                                                    {/* options for mcq */}
                                                    {
                                                        question?.type === 'MCQ' && question?.options.map((option: string) => (
                                                            <Grid size={3} key={index}>
                                                                <CustomTextField
                                                                    name={option}
                                                                    disabled
                                                                    placeholder={option}
                                                                />
                                                            </Grid>
                                                        )
                                                        )
                                                    }
                                                    <Grid size={12}>
                                                        <CustomLabel fieldName={'Answer Description'} />
                                                        <CustomTextField
                                                            name={'answer_description'}
                                                            disabled
                                                            placeholder={question.description}
                                                            multiline={true}
                                                            rows={4}
                                                        />
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid size={12} sx={{ mb: 2 }}>
                                                <Divider />
                                            </Grid>
                                        </Grid>
                                    </>
                                ))
                            }
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size='small' variant='outlined'>Disagree</Button>
                    <Button onClick={handleClose} autoFocus size='small'>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}