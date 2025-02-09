import CustomAutoComplete from "../../../../../shared/components/CustomAutoComplete";
import CustomLabel from "../../../../../shared/components/CustomLabel";
import { QuestionCategory, QuestionType } from "../../../../../utils/Constants";
import Grid from '@mui/material/Grid2';
import CustomTextField from "../../../../../shared/components/CustomTextField";
import { useGetCategoryQuery } from "../../../../../redux/features/question/questionApi";
import Loader from "../../../../../shared/components/Loader";
import { FormControl, MenuItem, TextField, Typography } from "@mui/material";
import { getUniqueStrings } from "../../../../../utils/typeSafeUniqueArrays";
import AdornedTextField from "../../../../../shared/components/AdornedTextField";
import { useRef } from "react";

// type declaration
type TAddQuestionForm = {
    index: number;
    setQuestion: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    question: Record<string, string>;
    setCategory_id: React.Dispatch<React.SetStateAction<string>>;
    setImageFile: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
    imageFile: Record<string, File | null>;
};
const AddQuestionForm = ({ index, setQuestion, question, setCategory_id, setImageFile, imageFile }: TAddQuestionForm) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileIconClick = () => {
        fileInputRef.current?.click();
        // setImageFile((prevState)=>({...prevState, `image_${index}`: e.target.files[0]}))
    };
    //question type selection

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestion((prevState) => ({ ...prevState, [name]: value }));
        setCategory_id(categoryId);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageFile((prevState) => ({ ...prevState, [`${index}`]: e.target.files[0] }));
    };

    // creating a query parameter object
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

    // extracting divisions subjects, chapter, universityType, universityName, from the category data and creating unique array. The getUniqueStrings is a custom function helping to provide type safety.

    const divisions = getUniqueStrings(categoryData?.data || [], 'division');
    const subjects = getUniqueStrings(categoryData?.data || [], 'subject');
    const chapters = getUniqueStrings(categoryData?.data || [], 'chapter');
    const universityNames = getUniqueStrings(categoryData?.data || [], 'universityName');
    const universityTypes = getUniqueStrings(categoryData?.data || [], 'universityType');

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
            {/* question type selection */}
            <Grid size={index === 0 ? 6 : 12}>
                <CustomLabel fieldName="Question Type" />
                <CustomAutoComplete
                    options={QuestionType}
                    handleInput={handleInput}
                    name={`type_${index}`}
                    value={question[`type_${index}`]}
                    required={true}
                />
            </Grid>
            {/* 2nd row filter columns */}
            {
                (index === 0 && question.category_0 === 'Academic') && (
                    <>
                        <Grid size={4}>
                            <CustomLabel fieldName="Division" />
                            <CustomAutoComplete options={divisions || []} name={`division_${index}`} value={question[`division_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete options={subjects || []} name={`subject_${index}`} value={question[`subject_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Chapter" />
                            <CustomAutoComplete options={chapters || []} name={`chapter_${index}`} value={question[`chapter_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                    </>)
            }
            {/* in case of admission */}
            {
                (index === 0 && question.category_0 === 'Admission') && (
                    <>
                        <Grid size={4}>
                            <CustomLabel fieldName="University Type" />
                            <CustomAutoComplete options={universityTypes} name={`universityType_${index}`} value={question[`universityType_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="University Name" />
                            <CustomAutoComplete options={universityNames} name={`universityName_${index}`} value={question[`universityName_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                        <Grid size={4}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete options={subjects} name={`subject_${index}`} value={question[`subject_${index}`]} handleInput={handleInput} required={true} />
                        </Grid>
                    </>)
            }

            {/* in case of job */}
            {
                (index === 0 && question.category_0 === 'Job') && (
                    <>
                        <Grid size={12}>
                            <CustomLabel fieldName="Subject" />
                            <CustomAutoComplete
                                options={subjects}
                                name={`subject_${index}`}
                                value={question[`subject_${index}`]}
                                handleInput={handleInput}
                                required={true}
                            />
                        </Grid>
                    </>)
            }

            {/* question title input field */}
            <Grid size={12}>
                <CustomLabel fieldName='Question' />
                {/* <CustomTextField
                    name={`title_${index}`}
                    handleInput={handleInput}
                    placeholder='Write your question here'
                    required={true}
                    value={question[`title_${index}`]}
                /> */}
                <AdornedTextField
                    name={`title_${index}`}
                    handleInput={handleInput}
                    handleFileIconClick={handleFileIconClick}
                    placeholder='Write your question here'
                    fileInputRef={fileInputRef}
                    required={true}
                    handleFileInput={handleFileInput}
                    value={question[`title_${index}`]}
                />
                {
                    imageFile[`${index}`] !== null &&
                    (
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "500", mt: 0.5 }} color="#009688">{imageFile[`${index}`]?.name}</Typography>

                    )
                }

            </Grid>
            {/* mcq row */}
            {

                (question[`type_${index}`] === 'MCQ' || '') && (
                    <>
                        {Array.from(Array(4)).map((item, optionIndex) => (
                            <Grid size={3}>
                                <CustomLabel fieldName={`Option ${optionIndex + 1}`} />
                                <CustomTextField
                                    name={`option${optionIndex + 1}_${index}`}
                                    value={question[`option${optionIndex + 1}_${index}`]}
                                    handleInput={handleInput}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    required={true}
                                />
                            </Grid>
                        ))}
                        < Grid size={12}>
                            <CustomLabel fieldName='Correct Answer' />
                            <CustomTextField
                                name={`correctOption_${index}`}
                                value={question[`correctOption_${index}`]}
                                handleInput={handleInput}
                                placeholder='Write the correct answer'
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
                    value={question[`description_${index}`]}
                    handleInput={handleInput}
                    placeholder="Explain the answer here"
                    multiline={true}
                    rows={4}
                    required={true} />
            </Grid>
        </>
    );
};

export default AddQuestionForm;