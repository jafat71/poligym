
export const transformToValidZInput = (input: string): number => {
    input = input.replace(/^0+/, '');
    if (input === '') {
        input = '0';
    }
    const parsedInput = parseInt(input, 10);
    const validInput = isNaN(parsedInput) || parsedInput < 0 ? 0 : parsedInput;
    return validInput
}

const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const transformEmailToName = (email: string): string => {
    const nameParts = email.split('@')[0].split('.');
    let name = nameParts.slice(0, 2).join(' ');
    name = capitalizeWords(name);
    return name
}
