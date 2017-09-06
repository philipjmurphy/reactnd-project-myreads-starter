import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

/**
 * Search Books Results component.
 */
const SearchBooksResults = ({booksResults, updateShelf}) => (
    <div className="search-books-results">
        <ol className="books-grid">
            {booksResults.map(book => (
                <li key={book.id}>
                    <Book book={book} updateShelf={updateShelf} />
                </li>
            ))}
        </ol>
    </div>
)

SearchBooksResults.propTypes = {
    booksResults: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default SearchBooksResults
