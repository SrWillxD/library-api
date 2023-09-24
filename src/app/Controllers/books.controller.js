import Book from '../Models/books.model.js';
import Author from '../Models/authors.model.js';

const booksControllerOBJ ={
    async registerBook(req, res, next){
        try{
            const { title, price, stock, author_id } = req.body;

            if(!title || !price || !stock || !author_id){
                return res.status(400).json({ message: 'All fields are mandatory.' });
            }

            const author = await Author.findByPk(author_id);

            if(!author){
                return res.status(404).json({message: 'author_id not found.'});
            }

            const newBook = await Book.create({ title, price, stock, author_id });

            return res.status(201).json({book: newBook});
        }catch(err){
            console.error('Error registering book:', err);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },
}

export default booksControllerOBJ;
