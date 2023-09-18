import sequelize from "./database.js";

let testingElephantSQLConnection = async () =>{
    try {
        await sequelize.authenticate();
        console.log('🐘🎲 Conected to the ElephantSQL database!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default testingElephantSQLConnection;
