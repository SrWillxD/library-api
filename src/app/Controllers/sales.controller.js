import Sale from '../Models/sales.model.js';
import Book from '../Models/books.model.js';
import Client from '../Models/clients.model.js';

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

}

export default salesControllerOBJ;
