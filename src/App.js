import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import * as BooksAPI from './BooksAPI'

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

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            // Update bookshelf and add if not already present.
            book.shelf = shelf
            this.setState((state) => ({
                books: state.books.filter(b => b.id !== book.id).concat([book])
            })
        )})
    }

    render = () => (
        <div className="app">
            <Route exact path="/" render={() => (
                <ListBooks books={this.state.books} updateShelf={this.updateShelf} />
            )} />

            <Route path="/search" render={() => (
                <SearchBooks books={this.state.books} updateShelf={this.updateShelf} />
            )} />
        </div>
    )
}

export default BooksApp
