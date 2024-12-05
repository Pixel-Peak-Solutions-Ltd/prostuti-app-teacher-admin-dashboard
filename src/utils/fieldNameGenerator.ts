export const fieldNameGenerator = (str: string) => {
    const tempArr = str.toLowerCase().split(' ');
    let string = '';
    if (tempArr.length === 2) {
        string = tempArr[0].toLowerCase() + tempArr[1].charAt(0).toUpperCase()
            + tempArr[1].slice(1);
    } else {
        string = tempArr[0].toLowerCase();
    }
    return string;
};