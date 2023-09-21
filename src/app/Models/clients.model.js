import { DataTypes } from 'sequelize';
import sequelize from '../Database/ElephantSQL/database.js';

const Client = sequelize.define('Client', {
    client_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tell:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},{tableName: 'clients', timestamps: false}
);

export default Client;