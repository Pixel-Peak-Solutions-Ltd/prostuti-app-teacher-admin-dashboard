import CustomAutoComplete from "../../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../../shared/components/CustomLabel";
import { QuestionCategory, QuestionType } from "../../../../../utils/Constants";
import Grid from '@mui/material/Grid2';
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { useGetCategoryQuery } from "../../../../../redux/features/question/questionApi";
import Loader from "../../../../../shared/components/Loader";
import { ICategory } from "../../../../../types/types";
import { FormControl, MenuItem, TextField } from "@mui/material";

const AddQuestionForm = ({ index, setQuestion, question, setCategory_id }:
    {
        index: number;
        setQuestion: React.Dispatch<React.SetStateAction<Record<string, string>>>;
        question: Record<string, string>;
        setCategory_id: React.Dispatch<React.SetStateAction<string>>
    }) => {


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestion((prevState) => ({ ...prevState, [name]: value }));
        setCategory_id(categoryId);
    };

    const categoryQueryParams = {
        ...(question.category_0 && { category_0: question.category_0 }),
        ...(question.division_0 && { division_0: question.division_0 }),
        ...(question.subject_0 && { subject_0: question.subject_0 }),
        ...(question.chapter_0 && { chapter_0: question.chapter_0 }),
        ...(question.universityName_0 && { universityName: question.universityName_0 }),
        ...(question.universityType_0 && { universityType: question.universityType_0 }),
    };

    // console.log(categoryQueryParams);

    // redux api call
    const { data: categoryData, isLoading } = useGetCategoryQuery(categoryQueryParams);

    //handling the question queries

    // console.log("from add question form page:", question);

    if (isLoading) {
        return <Loader />;
    }

    // extracting divisions from the category data
    const allDivisions = categoryData?.data.map((item: ICategory) => (item.division));
    const allUniversityName = categoryData?.data.map((item: ICategory) => (item.universityName));
    const allUniversities = categoryData?.data.map((item: ICategory) => (item.universityName));

    // creating unique arrays for each type of filter
    const divisions = allDivisions.filter((value: string, index: number) => allDivisions.indexOf(value) === index);
    const universityNames = allUniversityName.filter((value: string, index: number) => (allUniversityName.indexOf(value) === index));
    const universityTypes = allUniversities.filter((value: string, index: number) => (allUniversities.indexOf(value) === index));


    // subjects, chapter, universityType, universityName, from the category data
    const subjects = categoryData?.data.map((item: ICategory) => (item.subject));
    const chapter = categoryData?.data.map((item: ICategory) => (item.chapter));

    // narrowed down category
    const categoryId = categoryData?.data[0]?._id || '';

    // console.log(questionArray)
    // console.log('currently fetched data:', categoryData?.data,);
    // console.log('unique division', divisions);
    // console.log('unique subject', subjects);


    return (
        <>

            {/* choosing the question category field */}
            {index === 0 &&
                (<Grid size={6}>
                    <CustomLabel fieldName="Category" />
                    <FormControl fullWidth>
                        <TextField
                            name={`category_${index}`}
                            // value={age}
                            onChange={(e) => {
                                setQuestion({});
                                setQuestion((prevState) => ({
                                    ...prevState,
                                    [`category_${index}`]: e.target.value,
                                }));
                            }}
                            size="small"
                            select
                            required={true}
                            sx={{
                                mt: 0.8,
                                "& .MuiOutlinedInput-root": {
                                    color: "grey.500",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "8px",
                                    }
                                }
                            }}
                        >
                            {
                                QuestionCategory.map((itemName) => (
                                    <MenuItem key={itemName} value={itemName}>
                                        {itemName}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid >)
            }
            <Grid size={index === 0 ? 6 : 12}>
                <CustomLabel fieldName="Question Type" />
                <CustomAutoComplete
                    options={QuestionType}
                    handleInput={handleInput}
                    name={`type_${index}`}
                />
            </Grid>
            {/* 2nd row filter columns */}
            {
                (index === 0 && question.category_0 === 'Academic') && (
                    <>
                        <Grid size={4}>
                            <CustomLabel fieldName="Division" />
                            <CustomAutoComplete options={divisions || []} name={`division_${index}`} handleInput={handleInput} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete options={subjects || []} name={`subject_${index}`} handleInput={handleInput} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Chapter" />
                            <CustomAutoComplete options={chapter || []} name={`chapter_${index}`} handleInput={handleInput} />
                        </Grid>
                    </>)
            }
            {/* in case of admission */}
            {
                (index === 0 && question.category_0 === 'Admission') && (
                    <>
                        <Grid size={4}>
                            <CustomLabel fieldName="University Type" />
                            <CustomAutoComplete options={universityTypes} name={`universityType${index}`} handleInput={handleInput} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="University Name" />
                            <CustomAutoComplete options={universityNames} name={`universityName${index}`} handleInput={handleInput} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete options={divisions} name={`subject_${index}`} handleInput={handleInput} />
                        </Grid>
                    </>)
            }

            {/* in case of job */}
            {
                (index === 0 && question.category_0 === 'Job') && (
                    <>
                        <Grid size={12}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete options={divisions} name={`subject_${index}`} handleInput={handleInput} />
                        </Grid>
                    </>)
            }

            {/* mcq row */}
            <Grid size={12}>
                <CustomLabel fieldName='Question' />
                <CustomTextField name={`title_${index}`} handleInput={handleInput} placeholder='Write your question here' />
            </Grid>
            {

                question[`type_${index}`] === 'MCQ' && (
                    <>
                        {Array.from(Array(4)).map((item, optionIndex) => (
                            <Grid size={3}>
                                <CustomLabel fieldName={`Option ${optionIndex + 1}`} />
                                <CustomTextField name={`option${optionIndex + 1}_${index}`} handleInput={handleInput} placeholder={`Option ${optionIndex + 1}`} />
                            </Grid>
                        ))}
                        < Grid size={12}>
                            <CustomLabel fieldName='Correct Answer' />
                            <CustomTextField name={`correctOption_${index}`} handleInput={handleInput} placeholder='Write the correct answer' />
                        </ Grid>
                    </>
                )
            }
            {/* mcq row ends */}
            {/* question description */}
            <Grid size={12}>
                <CustomLabel fieldName='Answer Description' />
                <CustomTextField name={`description_${index}`} handleInput={handleInput} placeholder="Explain the answer here" multiline={true} rows={4} />
            </Grid>
        </>
    );
};

export default AddQuestionForm;