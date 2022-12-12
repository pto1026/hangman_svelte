export default function substitute(letter, prompt, text) {
    let final = prompt.split('');
    for (let i = 0; i < text.length; i++) {
        if (final[i] === '_') {
            if (text.split('')[i].toUpperCase() === letter) final[i] = text.split('')[i];
        }
    }
    return final.join('');
}