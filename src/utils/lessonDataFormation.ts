export const constructLesson = (lessonObject: Record<string, string>, courseId: string) => {
    // const lessons = [];

    // const objectKeys = Object.keys(lessonObject);

    // for (let i = 0; i < objectKeys.length; i++) {

    //     const tempObj: Record<string, string> = {};

    //     for (let j = 0; j < objectKeys.length; j++) {
    //         if (i === Number(objectKeys[j].at(objectKeys[j].length - 1))) {
    //             tempObj[String(objectKeys[j]).slice(0, objectKeys[j].length - 2)] = lessonObject[objectKeys[j]];
    //         }
    //     }

    //     if (Object.keys(tempObj).length !== 0) lessons.push(tempObj);
    // }

    // const finalObj = {
    //     course_id: courseId,
    //     lessons: [...lessons]
    // };

    const result: Record<string, string>[] = [];

    // Extract keys for names and numbers
    const nameKeys = Object.keys(lessonObject).filter((key) => key.startsWith("name_"));
    const numberKeys = Object.keys(lessonObject).filter((key) => key.startsWith("number_"));

    // Sort the keys to ensure proper order
    const sortedNameKeys = nameKeys.sort((a, b) => parseInt(a.split("_")[1]) - parseInt(b.split("_")[1]));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sortedNumberKeys = numberKeys.sort((a, b) => parseInt(a.split("_")[1]) - parseInt(b.split("_")[1]));

    // Pair names and numbers based on the sorted keys
    sortedNameKeys.forEach((nameKey) => {
        const index = nameKey.split("_")[1]; // Extract the index
        const numberKey = `number_${index}`;

        if (lessonObject[numberKey]) {
            result.push({
                name: lessonObject[nameKey],
                number: lessonObject[numberKey],
            });
        }
    });

    const finalObj = {
        course_id: courseId,
        lessons: [...result]
    };

    return finalObj;
};