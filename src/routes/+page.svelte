<script>
    import {enhance} from '$app/forms';
    import substitute from "$lib/substitute.js";
    import initialize from "$lib/initialize.js";
    import {filter} from "lodash-es";

    const min = 3;
    const max = 14;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /** @type {import('./$types').ActionData} */
    export let form = {text: ''};

    let previousGuesses = '';
    let gameStatus = 'Setup';
    let prompt;
    $: initial = initialize(form);
    $: lostGame = previousGuesses.length === 11;

    function handleGuess(letter) {
        if (form.text.toUpperCase().includes(letter)) {
            if (!previousGuesses.includes(letter)) {
                rightGuess(letter)
            }
        } else {
            wrongGuess(letter);
        }
    }

    function wrongGuess(letter) {
        if (!previousGuesses.includes(letter)) previousGuesses += letter;
        if (lostGame) {
            gameStatus = 'Loss';
        }
    }

    function rightGuess(letter) {
        previousGuesses += letter;
        prompt = substitute(letter, prompt ?? initial, form.text);
        if (!prompt.includes('_')) {
            gameStatus = 'Won';
        }
    }
</script>

<h1>Welcome to Hangman</h1>

{#if !form}
    <form method="POST" use:enhance on:submit={gameStatus = 'Playing'}>
        <label for="letters">
            Letters
            <input name="letters" type="number" id="letters" {min} {max}>
        </label>
        <button>Submit</button>
    </form>
{:else if gameStatus === 'Playing'}
    <h1>Score: {previousGuesses.length} / 11</h1>
    {#if prompt}
        <h3 class="prompt">{prompt}</h3>
    {:else}
        <h3 class="prompt">{initial}</h3>
    {/if}
    <div class="button-container">
        {#each filter(alphabet.split(''), function (l) {
            return !previousGuesses.includes(l)
        }) as letter}
            <button on:click={() => handleGuess(letter)}>{letter}</button>
        {/each}
    </div>
{:else if gameStatus === 'Loss'}
    <h2>You lost. The word/phrase was {form.text}</h2>
{:else if gameStatus === 'Won'}
    <h2>You won. The word/phrase was {form.text}</h2>
{/if}

<style>
    .prompt {
        letter-spacing: 2px;
    }
</style>