// import Sequelize from 'sequelize'
//
// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//     const sequelize = new Sequelize('hangman', 'root', 'password', {
//         host: 'localhost',
//         dialect: 'mysql'
//     });
//     event.locals.database = sequelize;
//
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
//
//     return await resolve(event);
// }