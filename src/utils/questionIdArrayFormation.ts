export const questionIdArrayFormation = (questionIdArr) => {
    let finalArr = [];
    for (const key of questionIdArr) {
        finalArr = [...finalArr, { questionId: key }];
    }
    return finalArr;
};