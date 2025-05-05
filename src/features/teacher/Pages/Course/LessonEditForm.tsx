import { Button, } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CustomLabel from "../../../../shared/components/CustomLabel";
import CustomTextField from "../../../../shared/components/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface TLesson {
    _id: string;
    number: string;
    name: string;
    course_id: string;
    createdAt: Date;
    updatedAt: Date;
}

const LessonEditForm = ({ lessonDataFromDB }: { lessonDataFromDB: TLesson[]; }) => {
    console.log(`received data from edit lesson`, lessonDataFromDB);
    return (
        <>
            {
                lessonDataFromDB?.map((lesson: TLesson, index: number) => {
                    return (
                        <>
                            <Grid container spacing={4} key={lesson._id}>
                                <Grid size={3}>
                                    <CustomLabel fieldName={`Lesson Number*`} />
                                    <CustomTextField
                                        name={`number_${index + 1}`}
                                        value={lesson?.number}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid size={8}>
                                    <CustomLabel fieldName={`Lesson Name*`} />
                                    <CustomTextField
                                        name={`name_${index + 1}`}
                                        value={lesson?.name}
                                        disabled={true}
                                    />
                                </Grid>
                                <Grid size={1} sx={{ alignSelf: 'flex-end' }}>
                                    <Button
                                        onClick={() => {
                                            // deleteLessonFromDB(index);
                                        }}
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            height: '40px', minHeight: '40px', width: '100%', borderRadius: '8px', borderColor: "grey.700", color: "#3F3F46",
                                            '&:hover': {
                                                backgroundColor: '#e91e63',
                                                color: '#FFF',
                                                border: 'none'
                                            }
                                        }}>
                                        <DeleteOutlinedIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    );

                })
            }
        </>
    );
};

export default LessonEditForm;