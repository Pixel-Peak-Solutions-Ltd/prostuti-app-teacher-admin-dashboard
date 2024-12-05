{
    questions?.data?.data.map((question: typeof questions, index: number) => (
        <>
            <Grid container spacing={2} key={index}>
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
                        {/* Conditionally render options only if the question type is MCQ */}
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
                    </Grid>

                </Grid>
                <Grid size={12} sx={{ mb: 2 }}>
                    <Divider />
                </Grid>
            </Grid>
        </>
    ))
}