import { ISingleQuestion, saveQuestionToStore } from "../../../../../redux/features/question/questionSlice";
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { Checkbox, Divider } from "@mui/material";
import { useAppDispatch } from "../../../../../redux/hooks";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ViewQuestion = ({ questionArr, databaseQuestionIdArray }: { questionArr: [ISingleQuestion]; databaseQuestionIdArray: string[] }) => {
    const dispatch = useAppDispatch();
    return (
        <>
            {
                questionArr.map((question, index: number) => (
                    <Grid container spacing={2}>
                        {/* check box to select the question */}
                        <Grid size={1}>
                            <Checkbox
                                checked={databaseQuestionIdArray.includes(question._id) || false}
                                disabled={databaseQuestionIdArray.includes(question._id) || false}
                                {...label}
                                onChange={(e) => e.target.checked && dispatch(saveQuestionToStore(question))}
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
                                        <Grid size={3}>
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
                ))
            }
        </>
    );
};

export default ViewQuestion;