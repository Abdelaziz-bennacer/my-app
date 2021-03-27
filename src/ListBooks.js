import {Component} from "react";
import Book from "./Book";
import './ListBooks.scss'
import './MyBooks.scss'
import axios from "axios";
import {withRouter} from "react-router-dom";

class ListBooks extends Component{

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        axios.get('/books?status=FREE').then(response => {
            this.setState({books: response.data})
        })
    }

    borrowBook(bookId) {
        axios.post(`/borrows/${bookId}`, {}).then(()=> {
            this.props.history.push('/myBorrows')
        })
    }

    render() {

        return <div>
            <h1>Livres Disponibles</h1>
            <div className="list-container">
            {this.state.books.length === 0 ? "Il n'y a pas de livres disponibles": null}
            {this.state.books.map(book => (<div className="list-book-container" key={book.id}>
                    <Book title={book.title} category={book.category.label} lender={`${book.user.firstName} ${book.user.lastName}`}/>
                    <button className="btn btn-primary btn-sm" onClick={() => this.borrowBook(book.id)}>Emprunter</button>
                </div>
            ))}
            </div>

        </div>
    }
}
export default withRouter(ListBooks)