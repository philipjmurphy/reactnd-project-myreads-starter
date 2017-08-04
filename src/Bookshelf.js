import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

/**
 * Bookshelf component.
 */
const Bookshelf = ({name, books, updateShelf}) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map(book => (
                <li key={book.id}>
                    <Book book={book} updateShelf={updateShelf} />
                </li>
            ))}
        </ol>
      </div>
    </div>
)

Bookshelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default Bookshelf
