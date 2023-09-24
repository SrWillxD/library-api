import Author from '../Models/authors.model.js';

const authorsControllerOBJ = {
    async registerAuthor(req, res, next){
        try {
            const { name, email, tell } = req.body;

            if(!name || !email || !tell){
                return res.status(400).json({ message: 'All fields are mandatory.' });
            }

            const existingAuthor = await Author.findOne({ where: { email } });

            if(existingAuthor){
                return res.status(400).json({ message: 'An author with this email already exists.' });
            }

            const newAuthor = await Author.create({ name, email, tell });

            return res.status(201).json({ author: newAuthor });
        } catch(err){
            console.error('Error creating author:', err);
            return res.status(500).json({ message: 'Internal Server Error.'});
        }
    },
    async updateAuthor(req, res, next){
        try {
            const { id } = req.params;

            if(!Number.isInteger(Number(id))){
                return res.status(400).json({ message: 'Invalid author_id. It should be an integer.'});
            }

            const { name, email, tell } = req.body;

            if (!name || !email || !tell) {
                return res.status(400).json({ message: 'All fields are mandatory.' });
            }

            const existingAuthor = await Author.findByPk(id);

            if (!existingAuthor) {
                return res.status(404).json({ message: 'Author not found.'});
            }

            existingAuthor.name = name;
            existingAuthor.email = email;
            existingAuthor.tell = tell;

            await existingAuthor.save();

            return res.status(200).json({ author: existingAuthor });
        } catch (error) {
            console.error('Error updating author:', error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },
    
}

export default authorsControllerOBJ;
