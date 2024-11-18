import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import AddQuestionForm from "./AddQuestionForm";
import { useState } from "react";
import Grid from '@mui/material/Grid2';
import { formatQuestion } from "../../../../../utils/questionFormation";
import { useCreateQuestionMutation } from "../../../../../redux/features/question/questionApi";
import Loader from "../../../../../shared/components/Loader";

const AddQuestion = () => {
    const [numOfForms, setNumOfForms] = useState(1);
    const [question, setQuestion] = useState<Record<string, string>>({});
    const [questionArr, setQuestionArr] = useState<Record<string, string>[]>([]);
    const [category_id, setCategory_id] = useState('');


    // redux api call
    const [createQuestion, { error, success, result, isLoading }] = useCreateQuestionMutation();

    // const categoryId = categoryData?.data[0]._id || '';
    // console.log('Inside add question form:', category_id);
    const questionArray = formatQuestion(question, category_id);

    // temporary array
    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(questionArray);
        await createQuestion(questionArray);
        setQuestion({});
    };

    if (isLoading) {
        return (<Loader />);
    }

    if (error) {
        console.log(error);
    }

    // console.log('from add question page', questionArr);
    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <Paper variant="outlined" sx={{ width: '100%', height: 'auto', borderRadius: '10px', p: 3 }}>
                {/* top title and button section */}
                <Box component="section" sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', mb: 3 }}>
                    <Link to='/teacher/question-database'>
                        <Button variant='outlined' sx={{ width: '36px', height: '36px', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46" }}>
                            <ArrowBackIcon fontSize='small' />
                        </Button>
                    </Link>
                    <Typography variant='h3'>Add Question</Typography>
                </Box>
                {/* dynamic form component*/}
                <Box sx={{ display: "flex", flexDirection: 'column', gap: '20px', position: 'relative' }}>
                    <form onSubmit={handleAddQuestion}>
                        {
                            Array.from(Array(numOfForms)).map((_, index) => (
                                <Paper key={index} variant='outlined' sx={{ width: '100%', height: '100%', p: 2, borderRadius: '8px', mb: 3 }}>
                                    <Grid container spacing={2} >
                                        <Button
                                            onClick={() => setNumOfForms((prev) => prev - 1)}
                                            variant="outlined"
                                            size="small"
                                            sx={{ borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46", position: 'absolute', right: '20px' }}>
                                            X
                                        </Button>
                                        <AddQuestionForm index={index} question={question} setQuestion={setQuestion} setCategory_id={setCategory_id} />
                                    </Grid>
                                </Paper>

                            ))
                        }
                        {/* form buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px", mt: 3 }}>
                            <Button
                                onClick={() => {
                                    setNumOfForms((prevState) => prevState + 1);
                                    setQuestionArr((prevState) => [...prevState, { name: 'Question' }]);
                                }}
                                variant='outlined'
                                size='small'
                                sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                + Add New Question
                            </Button>
                            <Button
                                variant='contained'
                                size='small'
                                type="submit"
                                sx={{ width: '167px', height: '40px', borderRadius: '8px', fontSize: '14px' }}>
                                + Add to Database
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Box >
    );
};

export default AddQuestion;