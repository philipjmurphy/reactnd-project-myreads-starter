import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

import SearchBooksResults from './SearchBooksResults'

/**
 * Search Books component.
 */
class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        booksResults: [],
        maxResults: 10
    }

    updateQuery = (query) => {
        this.setState({query})
    }

    search = (query) => {
        const {books} = this.props
        const {maxResults} = this.state

        if(query) {
            BooksAPI.search(query, maxResults).then(booksResults => {

                // Handle API response errors.
                if (typeof booksResults === 'undefined' || booksResults.error) {
                    if(booksResults.error && booksResults.error === 'empty query') {
                        console.log('Warning: check that you are using a known search term.')
                    } else {
                        console.log('Error occurred when searching.');
                    }

                    this.setState({booksResults: []})
                    return;
                }

                // Initialise bookshelves to 'none'.
                booksResults.map(book => {
                    book.shelf = 'none'
                    return book
                })

                // Update search results with my bookself state.
                for (let myBook of books) {
                    booksResults.map(book => {
                        if (myBook.id === book.id) {
                            book.shelf = myBook.shelf
                        }

                        return book
                    })
                }

                this.setState({booksResults})
            }).catch(err => console.log('API error', err))
        } else {
            this.setState({booksResults: []})
        }
    }

    render() {
        const {updateShelf} = this.props
        const {query, booksResults} = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>

                    <div className="search-books-input-wrapper">
                        <input autoFocus
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => {
                                let query = event.target.value.trim()
                                this.updateQuery(query)
                                this.search(query)
                            }}
                        />
                    </div>
                </div>

                <SearchBooksResults
                    booksResults={booksResults}
                    updateShelf={updateShelf} />
            </div>
        )
    }
}

export default SearchBooks
