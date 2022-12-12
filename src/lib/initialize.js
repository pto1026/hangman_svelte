export default function initialize(f) {
    let final = '';
    if (f) {
        for (const letter of f.text) {
            if (letter === ' ') {
                final += ' ';
            } else {
                final += '_';
            }
        }
    }
    return final;
}