import Author from '../Models/authors.model.js';

const authorsControllerOBJ = {
    async registerAuthor(req, res, next){
        try {
            const { name, email, tell } = req.body;

            if (!name || !email || !tell){
                return res.status(400).json({ message: 'All fields are mandatory.' });
            }

            const existingAuthor = await Author.findOne({ where: { email } });

            if (existingAuthor) {
                return res.status(400).json({ message: 'An author with this email already exists.' });
            }

            const newAuthor = await Author.create({ name, email, tell });

            return res.status(201).json({ author: newAuthor });
        } catch(err){
            console.error('Error creating author:', err);
            return res.status(500).json({ message: 'Internal Server Error.'});
        }
    },

}

export default authorsControllerOBJ;
