const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, description, genre, quantity, publishedDate } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const book = new Book({
      title,
      author,
      isbn,
      description,
      genre,
      quantity: quantity || 1,
      availableQuantity: quantity || 1,
      publishedDate,
      createdBy: req.user.id,
    });

    await book.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, isbn, description, genre, quantity, publishedDate } = req.body;

    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.quantity = quantity !== undefined ? quantity : book.quantity;
    book.availableQuantity = quantity !== undefined ? quantity : book.availableQuantity;
    book.publishedDate = publishedDate || book.publishedDate;
    book.updatedAt = new Date();

    await book.save();
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
