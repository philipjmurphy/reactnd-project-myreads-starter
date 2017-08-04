import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import Book from './Book'

/**
 * Search Books component.
 */
class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        let showingBooks
        const {books, updateShelf} = this.props
        const {query} = this.state

        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((book) => match.test(book.title))
        } else {
            showingBooks = []
        }

        showingBooks = showingBooks.sort(sortBy('name'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>

                    <div className="search-books-input-wrapper">
                        <input autoFocus
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map(book => (
                            <li key={book.id}>
                                <Book book={book} updateShelf={updateShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
