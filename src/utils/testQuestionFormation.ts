export const testQuestionFormation = (questionDetails: Record<string, string>, testType: string) => {
    // creating the question array that will be sent to the server
    const questionArr = [];

    // creating an array that contains all the keys of the cloned array to loop through them
    const objectKeys = Object.keys(questionDetails);

    for (let i = 0; i < objectKeys.length; i++) {

        const tempObj: Record<string, unknown> = {};

        for (let j = 0; j < objectKeys.length; j++) {

            if (i === Number(objectKeys[j].at(objectKeys[j].length - 1))) {
                tempObj[String(objectKeys[j]).slice(0, objectKeys[j].length - 2)] = questionDetails[objectKeys[j]];
                tempObj['type'] = testType;
            }

        }
        // Add options array for MCQ type
        if (tempObj.type === 'MCQ') {
            tempObj.options = [
                tempObj.option1,
                tempObj.option2,
                tempObj.option3,
                tempObj.option4
            ];

            // Remove individual option properties
            delete tempObj.option1;
            delete tempObj.option2;
            delete tempObj.option3;
            delete tempObj.option4;
        }
        if (Object.keys(tempObj).length !== 0) questionArr.push({ newQuestion: tempObj });
    }

    return questionArr;
};