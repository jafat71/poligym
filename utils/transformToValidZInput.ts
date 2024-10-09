
const transformToValidZInput = (input: string): number => {
    input = input.replace(/^0+/, '');
    if (input === '') {
        input = '0';
    }
    const parsedInput = parseInt(input, 10);
    const validInput = isNaN(parsedInput) || parsedInput < 0 ? 0 : parsedInput;
    return validInput
}

export default transformToValidZInput
