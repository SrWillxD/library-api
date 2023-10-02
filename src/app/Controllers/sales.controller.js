import Sale from '../Models/sales.model.js';
import Book from '../Models/books.model.js';
import Client from '../Models/clients.model.js';
import Author from '../Models/authors.model.js';

const salesControllerOBJ = {
    async registerASale(req, res, next) {
        try{
            const { date, client_id, book_id } = req.body;

            const client = await Client.findByPk(client_id);
            if(!client){
                return res.status(404).json({ message: 'Client not found.' });
            }

            const book = await Book.findByPk(book_id);
            if(!book){
                return res.status(404).json({ message: 'Book not found.' });
            }

            if(book.stock === 0){
                return res.status(400).json({ message: 'Book out of stock.' });
            }

            const saleValue = book.price;

            const newSale = await Sale.create({
                value: saleValue,
                date,
                client_id,
                book_id,
            });

            book.stock -= 1;
            await book.save();

            return res.status(201).json({ sale: newSale });
        }catch (err){
            console.error('Error registering a sale:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getSaleById(req, res, next){
        try{
            const { saleId } = req.params;

            if(!Number.isInteger(Number(saleId))){
                return res.status(400).json({ message: 'Invalid sale ID. Must be an integer.' });
            }

            const sale = await Sale.findByPk(saleId);

            if(!sale){
                return res.status(404).json({ message: 'Sale not found.' });
            }

            return res.status(200).json({ sale });
        }catch(err){
            console.error('Error fetching sale:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getAllSales(req, res, next) {
        try{
            const sales = await Sale.findAll();

            if(sales.length === 0){
                return res.status(404).json({ message: 'No sales found.' });
            }

            return res.status(200).json({ sales });
        }catch(err){
            console.error('Error fetching all sales:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getSalesByClient(req, res, next) {
        try{
            const { clientId } = req.params;

            if (!Number.isInteger(parseInt(clientId))) {
                return res.status(400).json({ message: 'Invalid client ID. Must be an integer.' });
            }

            const client = await Client.findByPk(clientId);

            if(!client){
                return res.status(404).json({ message: 'Client not found.' });
            }

            const sales = await Sale.findAll({ where: { client_id: clientId } });

            if(sales.length === 0){
                return res.status(404).json({ message: 'No sales found for the specified client.' });
            }

            return res.status(200).json({ sales });
        }catch(err){
            console.error('Error fetching sales by client:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getSalesByBook(req, res, next){
        try{
            const { bookId } = req.params;

            if(!Number.isInteger(parseInt(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const book = await Book.findByPk(bookId);

            if(!book){
                return res.status(404).json({ message: 'Book not found.' });
            }

            const sales = await Sale.findAll({ where: { book_id: bookId } });

            if (sales.length === 0) {
                return res.status(404).json({ message: 'No sales found for the specified book.' });
            }

            return res.status(200).json({ sales });
        }catch(err){
            console.error('Error fetching sales by book:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getSalesByAuthor(req, res, next){
        try{
            const { authorId } = req.params;

            if(!Number.isInteger(parseInt(authorId))){
                return res.status(400).json({ message: 'Invalid author ID. Must be an integer.' });
            }

            const author = await Author.findByPk(authorId);

            if(!author){
                return res.status(404).json({ message: 'Author not found.' });
            }

            const books = await Book.findAll({ where: { author_id: authorId } });

            if(books.length === 0){
                return res.status(404).json({ message: 'No books found for the specified author.' });
            }

            const bookIds = books.map((book) => book.book_id);

            const sales = await Sale.findAll({ where: { book_id: bookIds } });

            if(sales.length === 0){
                return res.status(404).json({ message: 'No sales found for the specified author.' });
            }

            return res.status(200).json({ sales });
        }catch(err){
            console.error('Error fetching sales by author:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default salesControllerOBJ;
