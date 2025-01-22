import { ICategory } from "../types/types";

// helper function to type safe the arrays
export const getUniqueStrings = (items: ICategory[], key: keyof ICategory): string[] => {
    return [...new Set(items.map(item => item[key] as string))];
};