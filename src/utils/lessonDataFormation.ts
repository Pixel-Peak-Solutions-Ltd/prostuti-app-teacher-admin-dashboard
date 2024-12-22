export const constructLesson = (lessonObject: Record<string, string>, courseId: string) => {
    const lessons = [];

    const objectKeys = Object.keys(lessonObject);

    for (let i = 0; i < objectKeys.length; i++) {

        const tempObj: Record<string, string> = {};

        for (let j = 0; j < objectKeys.length; j++) {
            if (i === Number(objectKeys[j].at(objectKeys[j].length - 1))) {
                tempObj[String(objectKeys[j]).slice(0, objectKeys[j].length - 2)] = lessonObject[objectKeys[j]];
            }
        }

        if (Object.keys(tempObj).length !== 0) lessons.push(tempObj);
    }

    const finalObj = {
        course_id: courseId,
        lessons: [...lessons]
    };

    return finalObj;
};