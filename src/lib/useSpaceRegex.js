export default function useSpaceRegex(input) {
    let regex = /\s/i;
    return regex.test(input);
}