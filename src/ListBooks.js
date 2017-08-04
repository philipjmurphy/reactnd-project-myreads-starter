import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

/**
 * List Books component.
 */
class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    render() {
        const {books, updateShelf} = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <Bookshelf name="Currently Reading" books={books.filter(book => book.shelf === 'currentlyReading')} updateShelf={updateShelf} />
                    <Bookshelf name="Want to Read" books={books.filter(book => book.shelf === 'wantToRead')} updateShelf={updateShelf} />
                    <Bookshelf name="Read" books={books.filter(book => book.shelf === 'read')} updateShelf={updateShelf} />

                    <div className="open-search">
                        <Link to="/search" className="">Search books</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks
