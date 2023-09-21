import Client from '../Models/clients.model.js';

const clientsControllerOBJ = {
    async registerClient(req, res, next){
        try {
            const { name, email, password, tell, addres } = req.body;

            if(!name || !email || !password || !tell || !addres){
                return res.status(400).json({message:"All fields are mandatory"});
            }

            const existingClients
        } catch (err) {
            
        }
    }
}

export default clientsControllerOBJ;
