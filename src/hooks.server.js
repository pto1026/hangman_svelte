import Sequelize from 'sequelize'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.database = new Sequelize('hangman', 'root', 'password', {
        host: 'localhost',
        dialect: 'mysql'
    });

    return await resolve(event);
}