export const getEnumKeyByValue = <T extends object>(
    enumObject: T,
    value: T[keyof T]
): keyof T | undefined => {
    return Object.keys(enumObject).find(
        key => enumObject[key as keyof T] === value
    ) as keyof T | undefined;
}

export const getEnumKeyByValueAsync = async <T extends object>(
    enumObject: T,
    value: T[keyof T]
): Promise<keyof T | undefined> => {
    return getEnumKeyByValue(enumObject, value);
}

