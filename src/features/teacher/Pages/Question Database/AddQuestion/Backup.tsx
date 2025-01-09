// const handleAddQuestion = (values: FieldValues) => {
//     console.log(values);
// };

// const defaultValues = {
//     questionType: "",
//     category: "",
//     division: "",
//     subject: "",
//     chapter: "",
//     question: "",
//     option1: "",
//     option2: "",
//     option3: "",
//     option4: "",
//     designation: "",
//     answerDescription: "",
// };

// add question form
{/* <>
    <Grid size={index === 0 ? 6 : 12}>
        <CustomLabel fieldName="Question Type" />
        <ProSelectField items={QuestionType} name={`questionType_${index}`} size="small" />
    </Grid>

    {index === 0 &&
        (<Grid size={6}>
            <CustomLabel fieldName="Category" />
            <ProInput name={`category_${index}`} placeholder="Academic" type="text" size="small" />
        </Grid>)
    } */}

{/* 2nd row 4 columns */ }
{/* {
        index === 0 && (
            <>
                <Grid size={4}>
                    <CustomLabel fieldName="Division" />
                    <ProInput name={`division_${index}`} placeholder="Commerce" type="text" size="small" />
                </Grid>
                <Grid size={4}>
                    <CustomLabel fieldName="Subject" />
                    <ProInput name={`subject_${index}`} placeholder="Accounting 1st Paper" type="text" size="small" />
                </Grid>
                <Grid size={4}>
                    <CustomLabel fieldName="Chapter" />
                    <ProInput name={`chapter_${index}`} placeholder="Chapter 4: Trail Balance" type="text" size="small" />
                </Grid>
            </>)
    } */}

{/* mcq row */ }
{/* <Grid size={12}>
        <CustomLabel fieldName='Question' />
        <ProInput name='question' placeholder='Write your question here' type="text" size="small" />
    </Grid>
    {
        Array.from(Array(4)).map((item, optionIndex) => (
            <Grid size={3}>
                <ProInput name={`option${optionIndex + 1}_${index}`} placeholder={`Option ${index + 1}`} type="text" size="small" />
            </Grid>
        ))
    }
    <Grid size={12}>
        <CustomLabel fieldName='Answer Description' />
        <ProInput name={`answerDescription_${index}`} placeholder="Explain the answer here" multiline={true} rows={4} type="text" />
    </Grid>
</> */}
// making an array unique
// const divisions = [...new Set(categoryData?.data.map((item: ICategory) => (item.division)))] as string[];
// const universityNames = [...new Set(categoryData?.data.map((item: ICategory) => (item.universityName)))];
// const universityTypes = [...new Set(categoryData?.data.map((item: ICategory) => item.universityType))];
// const subjects = [...new Set(categoryData?.data.map((item: ICategory) => item.subject))];
// const chapters = [...new Set(categoryData?.data.map((item: ICategory) => item.chapter))];