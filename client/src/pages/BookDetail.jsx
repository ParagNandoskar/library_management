import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { bookAPI } from '../services/api'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookAPI.getBookById(id)
        setBook(response.data)
      } catch (err) {
        setError('Failed to fetch book details')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <div className="container"><p className="loading">Loading...</p></div>
  if (error) return <div className="container"><p className="error">{error}</p></div>
  if (!book) return <div className="container"><p className="error">Book not found</p></div>

  return (
    <div className="container book-detail">
      <Link to="/" className="back-link">← Back to Library</Link>
      <div className="detail-content">
        <h1>{book.title}</h1>
        <div className="detail-grid">
          <div>
            <h3>Author</h3>
            <p>{book.author}</p>
          </div>
          <div>
            <h3>Genre</h3>
            <p>{book.genre || 'Not specified'}</p>
          </div>
          <div>
            <h3>ISBN</h3>
            <p>{book.isbn || 'Not available'}</p>
          </div>
          <div>
            <h3>Quantity</h3>
            <p>{book.quantity}</p>
          </div>
          <div>
            <h3>Available</h3>
            <p>{book.availableQuantity}</p>
          </div>
          <div>
            <h3>Published Date</h3>
            <p>{book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'Not specified'}</p>
          </div>
        </div>

        {book.description && (
          <div className="description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookDetail
