import { useEffect, useState } from 'react'
import { bookAPI } from '../services/api'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import './Dashboard.css'

function Dashboard() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const fetchBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks()
      setBooks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleAddBook = async (formData) => {
    try {
      await bookAPI.createBook(formData)
      setSuccess('Book added successfully!')
      setShowForm(false)
      fetchBooks()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add book')
    }
  }

  const handleUpdateBook = async (formData) => {
    try {
      await bookAPI.updateBook(editingBook._id, formData)
      setSuccess('Book updated successfully!')
      setEditingBook(null)
      setShowForm(false)
      fetchBooks()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update book')
    }
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookAPI.deleteBook(id)
        setSuccess('Book deleted successfully!')
        fetchBooks()
        setTimeout(() => setSuccess(null), 3000)
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete book')
      }
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  if (loading) return <div className="container"><p className="loading">Loading...</p></div>

  return (
    <div className="container dashboard">
      <h1>📖 Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="dashboard-actions">
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-add-book">
            + Add New Book
          </button>
        )}
      </div>

      {showForm && (
        <div className="form-section">
          <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
          <BookForm
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            book={editingBook}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="books-section">
        <h2>Your Books</h2>
        <BookList books={books} onEdit={handleEdit} onDelete={handleDeleteBook} />
      </div>
    </div>
  )
}

export default Dashboard
