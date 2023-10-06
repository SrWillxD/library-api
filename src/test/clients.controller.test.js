import request from 'supertest';
import app from '../server.js';
import sequelizeMock from 'sequelize-mock';
import { DataTypes } from 'sequelize';

const dbMock = new sequelizeMock();
const Client = dbMock.define('Client', {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tell: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

describe('Clients Controller', () => {
    beforeEach(() => {
        dbMock.reset();
    });

    it('deve retornar 201 e cadastrar um cliente', async () => {
        const clientData = {
            name: 'Novo Cliente',
            email: 'novo@cliente.com',
            password: 'senha123',
            tell: '123456789',
            address: 'Rua do Cliente',
        };

        dbMock.$queueResult(Client.build(clientData));

        const response = await request(app)
            .post('/api/clients/registerClient')
            .send(clientData);

        expect(response.status).toBe(201);
        expect(response.body.client).toEqual(expect.objectContaining(clientData));
    });

    it('deve retornar 400 se algum campo estiver faltando', async () => {
        const incompleteClientData = {
            name: 'Nome Incompleto',
            email: 'incompleto@cliente.com',
            password: 'senha123',
            tell: '123456789',
        };

        const response = await request(app)
            .post('/api/clients/registerClient')
            .send(incompleteClientData);

        expect(response.status).toBe(400);
    });

    it('deve retornar 400 se o cliente já estiver cadastrado', async () => {
        const clientData = {
            name: 'Cliente Existente',
            email: 'existente@cliente.com',
            password: 'senha123',
            tell: '123456789',
            address: 'Rua do Cliente Existente',
        };

        dbMock.$queueResult([Client.build(clientData)]);

        const response = await request(app)
            .post('/api/clients/registerClient')
            .send(clientData);

        expect(response.status).toBe(400);
    });


});
