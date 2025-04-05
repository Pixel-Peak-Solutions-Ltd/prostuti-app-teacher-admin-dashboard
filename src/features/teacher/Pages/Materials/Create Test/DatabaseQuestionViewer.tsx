import Grid from '@mui/material/Grid2';
import CustomLabel from '../../../../../shared/components/CustomLabel';
import CustomTextField from '../../../../../shared/components/CustomTextField';
import { Divider, IconButton } from '@mui/material';
import { ISingleQuestion, removeQuestionFromStore } from '../../../../../redux/features/question/questionSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '../../../../../redux/hooks';
const DatabaseQuestionViewer = ({ questionArr }: { questionArr: ISingleQuestion[] }) => {
    // dispatch function
    const dispatch = useAppDispatch();

    return (
        <>
            {
                questionArr.map((question, index) => (
                    <Grid container spacing={2} key={index}>
                        {/* question title  */}
                        <Grid size={11}>
                            <CustomLabel fieldName={`Question-${index + 1}`} />
                            <CustomTextField
                                name={'question'}
                                disabled
                                placeholder={question.title}
                            />
                        </Grid>
                        <Grid size={1} sx={{ display: 'flex', alignSelf: 'flex-end', justifyContent: 'right' }}>
                            <IconButton
                                onClick={() => dispatch(removeQuestionFromStore(question._id))}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
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
                        <Grid size={12} sx={{ mb: 2 }}>
                            <Divider />
                        </Grid>
                    </Grid>
                ))
            }

        </>
    );
};

export default DatabaseQuestionViewer;