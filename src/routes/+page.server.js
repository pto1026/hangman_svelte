import { API_KEY } from '$env/static/private';
import {error, json} from '@sveltejs/kit';
import useSpaceRegex from "$lib/useSpaceRegex.js";
import useCharacterRegex from "$lib/useCharacterRegex.js";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        const letters = data.get('letters')
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                temperature: 0.7,
                max_tokens: 250,
                prompt: `Generate an English word or phrase for hangman. Length: ${letters} letters.`
            })
        })
        const completion = await response.json();
        const prompt = completion.choices[0].text.trim();
        let final = '';
        for (const letter of prompt.split('')) {
            if (useSpaceRegex(letter) || useCharacterRegex(letter)) final += letter;
        }
        return { text: final }
    }
}