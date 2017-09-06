import React from 'react'
import PropTypes from 'prop-types'

/**
 * Book component.
 */
const Book = ({book, updateShelf}) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: 'url("'+ (book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : '') +'")'
            }}></div>
            <div className="book-shelf-changer">
                <select
                    value={book.shelf}
                    onChange={(event) => updateShelf(book, event.target.value)}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>

        <div className="book-cover-title">{book.title}</div>
        {book.authors && (<div className="book-authors">{book.authors.join(', ')}</div>)}
    </div>
)

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
}


export default Book
