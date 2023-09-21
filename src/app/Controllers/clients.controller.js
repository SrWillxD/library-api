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
            return res.status(500).json({message: " Internal Server error"});
        }
    }
}

export default clientsControllerOBJ;
