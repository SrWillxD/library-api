import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


const sequelize = new Sequelize(process.env.ELEPHANTSQL_URL, {
    dialect: 'postgres',
    define:{
        timestamps: false,
        underscored: true,
        underscoredAll: true
    },
});

export default sequelize;
