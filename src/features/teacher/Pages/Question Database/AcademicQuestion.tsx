import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomAutoComplete from "../../../../shared/components/CustomAutoComplete";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useDeleteQuestionMutation, useGetAllAcademicQuestionsQuery } from "../../../../redux/features/question/questionApi";
import Loader from "../../../../shared/components/Loader";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteConfirmation from "../../../../shared/components/DeleteConfirmation";

const AcademicQuestion = () => {
    const [filter, setFilter] = useState<Record<string, string | undefined>>({});
    const [questionId, setQuestionId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [filterToSubmit, setFilterToSubmit] = useState<Record<string, string | undefined>>({});
    const navigate = useNavigate();
    // redux call for getting the list of questions
    // Initial data fetch without any filters
    const { data: initialQuestionData, isLoading } = useGetAllAcademicQuestionsQuery({});
    // filtered data fetching
    const { data: questionData, isLoading: filteredDataLoading, isFetching, refetch } = useGetAllAcademicQuestionsQuery(filterToSubmit);
    // delete question function from redux
    const [deleteQuestion, { isLoading: questionDeleting }] = useDeleteQuestionMutation();

    //^ selecting the filters
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilter((prevState) => ({ ...prevState, [name]: value === '' ? undefined : value }));
    };

    //*go back functionality
    const handleGoBack = () => {
        navigate('/teacher/question-database');
    };


    // confirming the filters to fetch data based on that
    const confirmFilter = (e: React.MouseEvent) => {
        e.preventDefault();
        // checking whether one or more filter keys value are undefined then deleting that key
        for (const [key, value] of Object.entries(filter)) {
            if (value === undefined || value === '') {
                delete filter[key];
            }
        }
        setFilterToSubmit({ ...filter });
        refetch();
        setFilter({});
    };

    //^handle delete from database

    const deleteQuestionFromDatabase = async (id: string) => {
        await deleteQuestion(id);
        setQuestionId('');
    };

    //! fetching all academic questions
    const fieldNameObj = {
        'Division': [...new Set(initialQuestionData?.data?.data.map((item: typeof initialQuestionData) => item?.category[0].division))] as string[],
        'Type': [...new Set(initialQuestionData?.data?.data.map((item: typeof initialQuestionData) => item.type))] as string[],
        'Subject': [...new Set(initialQuestionData?.data?.data.map((item: typeof initialQuestionData) => item?.category[0].subject))] as string[],
        'Chapter': [...new Set(initialQuestionData?.data?.data.map((item: typeof initialQuestionData) => item?.category[0].chapter))] as string[],
    };

    // render options for autocompletes

    const getFieldOptions = (fieldName: string) => {
        // using the initial full dataset for dropdown options
        return fieldNameObj[fieldName as keyof typeof fieldNameObj || []];
    };

    //*delete confirmation functions
    const handleDeleteClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteClose = () => {
        setOpen(false);
    };

    if (isLoading || filteredDataLoading || questionDeleting) {
        return (<Loader />);
    }

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                    {/* <Link to='/teacher/question-database'> */}
                    <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}
                        onClick={handleGoBack}
                    >
                        <ArrowBackIcon fontSize='small' />
                    </Button>
                    {/* </Link> */}
                    <Typography variant='h3'>Academic Question</Typography>
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
                                defaultValue={'Academic'}
                                value='Academic'
                            />
                        </Grid>
                        {/* subsequent filters */}
                        {
                            Object.keys(fieldNameObj).map((name, index) => (
                                <Grid size={2}>
                                    <CustomLabel fieldName={name} />
                                    <CustomAutoComplete
                                        key={index}
                                        options={getFieldOptions(name)}
                                        value={filter[name.toLowerCase()]}
                                        defaultValue={filter[name.toLowerCase()]}
                                        handleInput={handleFilter}
                                        name={name.toLowerCase()}
                                    />
                                </Grid>
                            ))
                        }
                        <Grid size={2} sx={{ alignSelf: 'flex-end' }}>
                            {/* <CustomLabel fieldName='' /> */}
                            <Button variant='contained' sx={{ width: '100%', height: '44px', borderRadius: '8px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                                onClick={(e) => confirmFilter(e)}
                            >
                                Search <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    {/* filters end */}
                    {/* question section */}
                    <Paper variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                        {/* fetching the questions */}
                        {
                            (isFetching) && (<Loader />)
                        }
                        {
                            questionData?.data?.data.length === 0 && (
                                <Typography variant='h3' align="center">No Questions Available</Typography>
                            )
                        }
                        {
                            questionData?.data?.data.map((question: typeof questionData, index: number) => (
                                <Grid container spacing={2} key={index}>
                                    {/* delete question button */}
                                    <Button
                                        onClick={() => {
                                            handleDeleteClickOpen();
                                            setQuestionId(question._id);
                                            console.log('question to delete:', question._id);
                                        }}
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
                                            "&:hover": {
                                                backgroundColor: 'red',
                                                color: 'white',
                                                borderColor: 'red',
                                            }
                                        }}>
                                        X
                                    </Button>

                                    {/* question title  */}
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
                                        question?.type === 'MCQ' && question?.options.map((option: string, index: number) => (
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
                                    <Grid size={12} sx={{ mb: 2 }}>
                                        <CustomLabel fieldName={'Answer Description'} />
                                        <CustomTextField
                                            name={'answer_description'}
                                            disabled
                                            placeholder={question.description}
                                            multiline={true}
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid size={12} sx={{ mb: 2 }}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            ))
                        }

                    </Paper>
                </Box>
            </Paper >
            {/* delete confirmation modal */}
            <DeleteConfirmation
                id={questionId}
                deleteFunction={deleteQuestionFromDatabase}
                handleDeleteClose={handleDeleteClose}
                open={open}
            />
        </Box>

    );
};

export default AcademicQuestion;