// pattern for checking for a valid url
const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
export const createValidUrlArray = (str: string) => {
    const stringArr = str.split(' ');

    const finalArr: string[] = [];

    for (const key of stringArr) {

        if (urlPattern.test(key)) {
            finalArr.push(key);
        }
    }

    return finalArr;
};

