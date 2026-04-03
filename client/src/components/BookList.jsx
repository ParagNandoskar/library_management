import './BookList.css'

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="no-books">No books found</p>
  }

  return (
    <div className="book-list">
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn || 'N/A'}</td>
              <td>{book.genre || 'N/A'}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => onEdit(book)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => onDelete(book._id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookList
