import { DataTypes } from 'sequelize';
import sequelize from '../Database/ElephantSQL/database.js';
import Client from './clients.model.js';
import Book from './books.model.js';

const Sale = sequelize.define('Sale', {
    sale_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    value: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'client_id',
        },
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'book_id',
        },
    },
}, { tableName: 'sales', timestamps: false });

export default Sale;
