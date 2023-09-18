import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

// Crie uma instância do Sequelize usando sua conexão do pg
const sequelize = new Sequelize(process.env.ELEPHANTSQL_URL, {
    dialect: 'postgres', // Especifique o dialeto (no seu caso, PostgreSQL)
    define: {
        timestamps: false, // Configuração opcional para desativar timestamps automáticos
    },
});

export default sequelize;
