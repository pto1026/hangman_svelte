export default function useCharacterRegex(input) {
    let regex = /[a-zA-Z]/i;
    return regex.test(input);
}