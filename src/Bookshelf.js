import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

/**
 * Bookshelf component.
 */
class Bookshelf extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    render() {
        const {name, books, updateShelf} = this.props

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{name}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => {
                        return (
                            <li key={book.id}>
                                <Book book={book} updateShelf={updateShelf} />
                            </li>
                        )
                    })}
                </ol>
              </div>
            </div>
        )
    }
}

export default Bookshelf
