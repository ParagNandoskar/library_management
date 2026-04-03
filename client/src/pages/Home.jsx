import { useEffect, useState } from 'react'
import { bookAPI } from '../services/api'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import './Home.css'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookAPI.getAllBooks()
        setBooks(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch books')
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return <div className="container"><p className="loading">Loading books...</p></div>
  if (error) return <div className="container"><p className="error">{error}</p></div>

  return (
    <div className="container">
      <div className="home-header">
        <h1>📚 Library Collection</h1>
        <p>Browse our collection of books</p>
      </div>
      <BookList books={books} onEdit={() => {}} onDelete={() => {}} />
    </div>
  )
}

export default Home
