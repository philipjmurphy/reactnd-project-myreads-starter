import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import './App.css'

/**
 * MyReads: A Book Lending App - Books App component.
 */
class BooksApp extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books})
        })
    }

    updateShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            this.setState({
                books : this.state.books.map(b => {
                    // Change the bookshelf for the matching book.
                    if (b.id === book.id) {
                        b.shelf = shelf
                    }

                    return b
                })
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks books={this.state.books} updateShelf={this.updateShelf.bind(this)} />
                )} />

                <Route path="/search" render={({ history }) => (
                    <SearchBooks books={this.state.books} updateShelf={this.updateShelf.bind(this)} />
                )} />
            </div>
        )
    }
}

export default BooksApp
