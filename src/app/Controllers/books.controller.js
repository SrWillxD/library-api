import Book from '../Models/books.model.js';
import InfoBooksReview from '../Schemas/review.schema.js';
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
    async getBookById(req, res, next){
        try {
            const { bookId } = req.params;

            if(!Number.isInteger(parseInt(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const postgresqlBook = await Book.findByPk(bookId);

            if(!postgresqlBook){
                return res.status(404).json({ message: 'Book not found in PostgreSQL.' });
            }

            const mongodbBook = await InfoBooksReview.findOne({bookId: 1});
            let bookInfo;

            if(!mongodbBook){
                bookInfo = {
                    book_id: postgresqlBook.book_id,
                    title: postgresqlBook.title,
                    price: postgresqlBook.price,
                    stock: postgresqlBook.stock,
                    infos: "empty"
                }
            }else{
                bookInfo = {
                    book_id: postgresqlBook.book_id,
                    title: postgresqlBook.title,
                    price: postgresqlBook.price,
                    stock: postgresqlBook.stock,
                    infos: {
                        description: mongodbBook.description,
                        pages: mongodbBook.pages,
                        publisher: mongodbBook.publisher,
                        reviews: mongodbBook.reviews,
                    }
                }
            }
            return res.status(200).json(bookInfo);
        }catch(err){
            console.error('Error fetching book information:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }, 
    async getAllBooks(req, res, next){
        try{
            const books = await Book.findAll();
            return res.status(200).json({ books });
        }catch(err){
            console.error('Error fetching all books:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async getBooksByAuthor(req, res, next){
        try{
            const{ authorId }= req.params;

            if(!Number.isInteger(parseInt(authorId))){
                return res.status(400).json({ message: 'Invalid author ID. Must be an integer.' });
            }

            const books = await Book.findAll({ where: { author_id: authorId } });

            if(books.length === 0){
                return res.status(404).json({ message: 'No books found for the specified author.' });
            }

            return res.status(200).json({ books });
        }catch(err){
            console.error('Error fetching books by author:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async registerBookInfo(req, res, next){
        try{
            const { bookId, description, pages, publisher } = req.body;

            if(!Number.isInteger(parseInt(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const existingBook = await Book.findByPk(bookId);
    
            if(!existingBook){
                return res.status(404).json({ message: 'Book with the specified ID does not exist in database.' });
            }

            const existingMongoDBBook = await InfoBooksReview.findOne({ bookId: bookId });

            if(existingMongoDBBook){
                return res.status(409).json({ message: 'Book with the specified ID already exists.' });
            }

            const newBook = new InfoBooksReview({
                bookId,
                description,
                pages,
                publisher,
                reviews: [],
            });

            await newBook.save();
            return res.status(201).json({ message: 'New book entry created with an empty reviews array.' });
        }catch(err){
            console.error('Error registering book info:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async updateBookInfo(req, res, next){
        try{
            const { bookId, description, pages, publisher } = req.body;

            if(!Number.isInteger(parseInt(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const existingMongoDBBook = await InfoBooksReview.findOne({ bookId: bookId });

            if(!existingMongoDBBook){
                return res.status(404).json({ message: 'Book with the specified ID does not exist.' });
            }

            existingMongoDBBook.description = description;
            existingMongoDBBook.pages = pages;
            existingMongoDBBook.publisher = publisher;

            await existingMongoDBBook.save();

            return res.status(200).json({});
        }catch(err){
            console.error('Error updating book info:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async deleteBookInfo(req, res, next) {
        try{
            const { bookId } = req.params;

            if(!Number.isInteger(Number(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const existingMongoDBBook = await InfoBooksReview.findOne({ bookId: bookId });

            if(!existingMongoDBBook){
                return res.status(404).json({ message: 'Book with the specified ID does not exist.' });
            }

            await existingMongoDBBook.deleteOne({ bookId: bookId });

            return res.status(200).json({});
        } catch (err) {
            console.error('Error deleting book info:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async addReview(req, res, next){
        try{
            const { bookId, name, grade, review } = req.body;

            if(!Number.isInteger(Number(bookId))){
                return res.status(400).json({ message: 'Invalid book ID. Must be an integer.' });
            }

            const existingMongoDBBook = await InfoBooksReview.findOne({ bookId: bookId });

            if(!existingMongoDBBook){
                return res.status(404).json({ message: 'Book with the specified ID does not exist.' });
            }

            existingMongoDBBook.reviews.push({ name, grade, review });

            await existingMongoDBBook.save();

            return res.status(201).json({});
        }catch(err){
            console.error('Error adding review:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async deleteReview(req, res, next){
        try{
            const { bookId, position } = req.params;

            if(!Number.isInteger(Number(bookId)) || !Number.isInteger(Number(position))){
                return res.status(400).json({ message: 'Invalid book ID or position. Must be integers.' });
            }

            const existingMongoDBBook = await InfoBooksReview.findOne({ bookId: bookId });

            if(!existingMongoDBBook){
                return res.status(404).json({ message: 'Book with the specified ID does not exist.' });
            }

            if(position < 0 || position >= existingMongoDBBook.reviews.length){
                return res.status(400).json({ message: 'Invalid position, this index does not exist.' });
            }

            existingMongoDBBook.reviews.splice(position, 1);

            await existingMongoDBBook.save();
    
            return res.status(200).json({});
        } catch(err){
            console.error('Error deleting review:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default booksControllerOBJ;
