import { DataTypes } from 'sequelize';
import sequelize from '../Database/ElephantSQL/database.js';
import Author from './authors.model.js';

const Book = sequelize.define('Book', {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: 'author_id',
        },
    },
}, { tableName: 'books', timestamps: false });

export default Book;
