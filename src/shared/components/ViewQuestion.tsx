import { ISingleQuestion } from "../../redux/features/question/questionSlice";
import Grid from '@mui/material/Grid2';
import CustomLabel from "./CustomLabel";
import CustomTextField from "./CustomTextField";


const ViewQuestion = ({ questionArr }: { questionArr: [ISingleQuestion] }) => {
    return (
        <>
            {
                questionArr.map((question, index: number) => (
                    <Grid container spacing={2}>
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
                ))
            }
        </>
    );
};

export default ViewQuestion;