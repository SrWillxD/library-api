import Author from '../Models/authors.model.js';
import Books from '../Models/books.model.js';

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
        try{
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
    async deleteAuthor(req, res, next){
        try {
            const { author_id } = req.params;

            if(!Number.isInteger(Number(author_id))){
                return res.status(400).json({ message: 'Invalid author_id. It should be an integer.'});
            }

            const author = await Author.findByPk(author_id);

            if (!author) {
                return res.status(404).json({ message: 'Author not found.' });
            }

            const books = await Books.findAll({ where: { author_id: author_id } });

            if (books.length > 0) {
                return res.status(400).json({
                    message: 'Cannot delete author with associated books.',
                });
            }

            await Author.destroy({ where: { author_id: author_id } });

            return res.status(200).json();
        } catch(err){
            console.error('Error deleting author:', err);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },
    async getAllAuthors(req, res){
        try{
            const authors = await Author.findAll();

            return res.status(200).json(authors);
        }catch(err){
            console.error('Error fetching authors:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    async getAuthorById(req, res) {
        try{
            const author_id = req.params.author_id;

            if(!Number.isInteger(Number(author_id))){
                return res.status(400).json({ message: 'Invalid author_id. It should be an integer.'});
            }

            const author = await Author.findByPk(author_id);

            if(!author){
                return res.status(404).json({ message: 'Author not found' });
            }

            return res.status(200).json(author);
        } catch(err){
            console.error('Error fetching author by ID:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

}

export default authorsControllerOBJ;
