import Client from '../Models/clients.model.js';
import Sale from '../Models/sales.model.js'
import Author from '../Models/authors.model.js';
import Book from '../Models/books.model.js';

const clientsControllerOBJ = {
    async registerClient(req, res, next){
        try {
            const { name, email, password, tell, address } = req.body;

            if(!name || !email || !password || !tell || !address){
                console.log(name, email, password, tell, address);
                return res.status(400).json({message:"All fields are mandatory"});
            }

            const existingClients = await Client.findOne({where:{ email }});
            if(existingClients){
                return res.status(400).json({message: "There is already a customer registered with this email."});
            }

            const newClient = await Client.create({name, email, password, tell, address});

            return res.status(201).json({message: "Success", client: newClient});
        } catch (err){
            console.error("Error when registering a client", err);
            return res.status(500).json({message: "Internal Server error"});
        }
    },
    async updateClient(req, res, next){
        try {
            const { id } = req.params;
            const { name, email, password, tell, address } = req.body;
    
            if (!name || !email || !password || !tell || !address) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
    
            const existingClient = await Client.findByPk(id);
    
            if (!existingClient) {
                return res.status(404).json({ message: 'Client ID not found.' });
            }
    
            existingClient.name = name;
            existingClient.email = email;
            existingClient.password = password;
            existingClient.tell = tell;
            existingClient.address = address;
    
            await existingClient.save();
    
            return res.status(200).json({message: "Success", client: existingClient});
        } catch (err) {
            console.error('Error updating client:', err);
            return res.status(500).json({ message: 'Internal Server error.' });
        }
    },
    async deleteClient(req, res, next) {
        try{
            const { client_id } = req.params;

            if(!Number.isInteger(Number(client_id))){
                return res.status(400).json({ message: 'Invalid client_id. It should be an integer.'});
            }

            const existingClient = await Client.findByPk(client_id);

            if(!existingClient){
                return res.status(404).json({ message: 'Client not found.' });
            }

            const salesCount = await Sale.count({ where: { client_id } });

            if (salesCount > 0){
                return res.status(400).json({ message: "This customer has associated sales. Can't delete it."});
            }

            await Client.destroy({ where: { client_id } });

            return res.status(200).json({ message: 'Client deleted successfully.' });
        }catch(err){
            console.error('Error deleting client:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default clientsControllerOBJ;
