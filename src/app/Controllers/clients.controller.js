import Client from '../Models/clients.model.js';

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

}

export default clientsControllerOBJ;
