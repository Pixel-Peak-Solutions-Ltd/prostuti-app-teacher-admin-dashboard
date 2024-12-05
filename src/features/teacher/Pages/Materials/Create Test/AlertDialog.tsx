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
import { useEffect, useState } from 'react';
import { useGetAllQuestionsQuery } from '../../../../../redux/features/question/questionApi';
import Checkbox from '@mui/material/Checkbox';
import { saveQuestionToStore } from '../../../../../redux/features/question/questionSlice';
import { useGetCategoryByIdQuery } from '../../../../../redux/features/category/categoryApi';
import { fieldNameGenerator } from '../../../../../utils/fieldNameGenerator';
import { ISingleCategory } from '../../../../../types/types';
import { QuestionType } from '../../../../../utils/Constants';
import ViewQuestion from '../../../../../shared/components/ViewQuestion';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AlertDialog(
    { open, handleClose, academicFields, jobFields, admissionFields, databaseQuestionIdArray, type, categoryType, singleCategory }:
        {
            open: boolean;
            handleClose: () => void;
            academicFields: string[];
            jobFields: string[];
            admissionFields: string[];
            databaseQuestionIdArray: string[];
            type: string;
            categoryType: string;
            singleCategory: ISingleCategory
        }
) {
    //local states
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterToSubmit, setFilterToSubmit] = useState<Record<string, string | undefined>>({});
    // getting courseId from local redux store
    const courseId = useAppSelector((state) => state.courseAndLessonId.id.course_id);
    const dispatch = useAppDispatch();
    // fetching the course from the id
    const { data: courseData, isLoading: courseLoading } = useGetCourseByIdQuery({ courseId });

    // first category filter applied when page loads
    // questionQueryParams.categoryType = courseData?.data.category;
    // type received as a prop from it's parent component
    // questionQueryParams.type = type;

    // fetching all questions
    const { data: questions, isLoading: questionLoader, refetch, isFetching } = useGetAllQuestionsQuery(filterToSubmit, {
        refetchOnMountOrArgChange: true,  // Ensures fresh data on filter change
        skip: false  // Do not skip the query on mount
    });

    if (courseLoading) {
        return (<Loader />);
    }
    if (questionLoader) {
        return (<Loader />);
    }

    // questionQueryParams.categoryType = categoryType;

    const subject = questions?.data?.data.map((question) => question.category[0].subject);

    // const uniqueSubjectArray = subject.filter((item, index) =>  )

    const arraysForFilterFields = {
        Subject: subject
    };


    // selecting the filters
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({ ...prevState, [name]: value === '' ? undefined : value }));
    };


    // confirming the filters to fetch data based on that
    const confirmFilter = (e: React.MouseEvent) => {
        e.preventDefault(); // Manually clear questions
        setFilterToSubmit({ ...filters });
        refetch();  // This will trigger a new request to fetch filtered questions
        setFilters({});
    };

    // Debugging logs
    console.log(singleCategory);
    console.log('Filters:', filters);
    console.log('Filter to Submit:', filterToSubmit);
    console.log('Fetched Questions:', questions?.data?.data);
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
                            <Typography variant='h3'>{categoryType} Questions</Typography>
                        </Box>
                        {/* filter and question database section */}
                        <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                            {/* filters */}
                            <Grid container spacing={2}>
                                <Grid size={2}>
                                    <CustomLabel fieldName={'Category'} />
                                    <CustomAutoComplete
                                        name='categoryType'
                                        options={[singleCategory['type']]}
                                        handleInput={handleFilter}
                                        value={filters['categoryType']}
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <CustomLabel fieldName={'Type'} />
                                    <CustomAutoComplete
                                        name='type'
                                        options={QuestionType}
                                        handleInput={handleFilter}
                                        value={filters['type']}
                                    />
                                </Grid>

                                {/* academic filters */}
                                {categoryType === 'Academic' &&
                                    (academicFields.map((name, index) => (
                                        <Grid size={2} key={index + 1}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                options={[singleCategory[fieldNameGenerator(name)]]}
                                                value={filters[fieldNameGenerator(name)]}
                                                handleInput={handleFilter}
                                                name={fieldNameGenerator(name)}
                                            />
                                        </Grid>
                                    )))
                                }
                                {/* job filters */}
                                {
                                    categoryType === 'Job' &&
                                    (jobFields.map((name, index) => (
                                        <Grid size={2} key={index + 2}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                options={arraysForFilterFields[name] || []}
                                                value={filters[fieldNameGenerator(name)]}
                                                handleInput={handleFilter}
                                                name={name.toLowerCase()}
                                            />
                                        </Grid>
                                    )))
                                }
                                {/* admission filters */}
                                {
                                    categoryType === 'Admission' &&
                                    (admissionFields.map((name, index) => (
                                        <Grid size={2} key={index + 3}>
                                            <CustomLabel fieldName={name} />
                                            <CustomAutoComplete
                                                options={[]}
                                                value={filters[fieldNameGenerator(name)]}
                                                handleInput={handleFilter}
                                                name={name.toLowerCase()}
                                            />
                                        </Grid>
                                    )))
                                }
                                <Grid size={2} sx={{ alignSelf: 'flex-end' }}>
                                    {/* <CustomLabel fieldName='' /> */}
                                    <Button variant='contained' sx={{ width: '100%', height: '44px', borderRadius: '8px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                                        // onClick={(e) => confirmFilter(e)}
                                        onClick={confirmFilter}
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
                                isFetching && (<Loader />)
                            }
                            <ViewQuestion questionArr={questions?.data?.data} />
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus size='small'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}