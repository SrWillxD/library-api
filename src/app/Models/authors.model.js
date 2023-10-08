import { DataTypes } from 'sequelize';
import sequelize from '../Database/ElephantSQL/database.js';

const Author = sequelize.define('Author', {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, { tableName: 'authors', timestamps: false });

export default Author;
