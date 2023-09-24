import Book from '../Models/books.model.js';
import Author from '../Models/authors.model.js';
import Sales from '../Models/sales.model.js';

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
    async updateBook(req, res, next){
        try{
            const { book_id } = req.params;
            const { price, stock } = req.body;

            if(!Number.isInteger(Number(book_id))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.'});
            }

            const book = await Book.findByPk(book_id);

            if(!book){
                return res.status(404).json({ message: 'Book not found.' });
            }

            book.price = price;
            book.stock = stock;
            await book.save();

            return res.status(200).json();
        }catch(err){
            console.error('Error updating book:', err);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },
    async deleteBook(req, res, next) {
        try{
            const { book_id } = req.params;

            if(!Number.isInteger(Number(book_id))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.'});
            }

            const book = await Book.findByPk(book_id);

            if(!book){
                return res.status(404).json({ message: 'Book not found.' });
            }

            const sales = await Sales.findAll({ where: { book_id: book_id } });

            if(sales.length > 0){
                return res.status(400).json({ message: 'Cannot delete the book. Sales associated with it.' });
            }

            await book.destroy();

            return res.status(200).json();
        } catch(err){
            console.error('Error deleting book:', err);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    },

}

export default booksControllerOBJ;
