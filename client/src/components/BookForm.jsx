import { useState } from 'react'
import './BookForm.css'

function BookForm({ onSubmit, book, onCancel }) {
  const [formData, setFormData] = useState(book || {
    title: '',
    author: '',
    isbn: '',
    description: '',
    genre: '',
    quantity: 1,
    publishedDate: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Published Date</label>
          <input
            type="date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default BookForm
