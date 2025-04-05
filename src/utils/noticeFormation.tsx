/* eslint-disable @typescript-eslint/no-unused-vars */
export const formatNotice = (noticeObj: Record<string, string>) => {
    // creating the question array that will be sent to the server
    const noticeArr = [];
    // creating an array that contains all the keys of the notice object to loop through them
    const objectKeys = Object.keys(noticeObj);

    for (let i = 0; i < objectKeys.length; i++) {

        const tempObj: Record<string, unknown> = {};

        for (let j = 0; j < objectKeys.length; j++) {

            if (i === Number(objectKeys[j].at(objectKeys[j].length - 1))) {
                tempObj[String(objectKeys[j]).slice(0, objectKeys[j].length - 2)] = noticeObj[objectKeys[j]];
            }

        }
        if (Object.keys(tempObj).length !== 0) noticeArr.push(tempObj);
    }

    return noticeArr;
};