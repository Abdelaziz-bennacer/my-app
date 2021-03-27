import Book from "./Book";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./MyBooks.scss"
import axios from "axios";
import SimpleModal from "./SimpleModal";


export default function MyBooks() {

    const [myBooks, setMyBooks] = useState([])
    const [showModal, setShowModal] = useState(false)

    const fetchBooks = () => {
        axios.get('/books').then(response => {
            setMyBooks(response.data)
        })
    }

    /* constructor() {
         super();
         this.state = {
             books: []
         }
     }*/

    useEffect(() => {
        /*axios.get('/books').then(response => {
        setMyBooks(response.data)
        })*/
        fetchBooks()
    }, [])

    /* componentDidMount() {

         this.setState(

             {books:[

                     {
                         title:"Asterix",
                         category:"BD"
                     },
                     {
                         title:"Tintin",
                         category:"BD"
                     }
                     ]
             }
         )
     }*/
    const handleDelete = (bookId) => {
        axios.delete(`/books/${bookId}`).then(response => {
            fetchBooks()
            }
        ).catch(error => {
            setShowModal(true)
        })
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div>
                <h1>Mes livres</h1>
                <div className="list-container">
                    {myBooks.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
                    {myBooks.map(book => (<div key={book.id} className="mybook-container">
                        <Book title={book.title} category={book.category.label}/>
                        <div className="container-buttons">
                            <Link to={`/addBook/${book.id}`}>
                                <button className="btn btn-primary btn-sm">Modifier</button>
                            </Link>
                            <button className="btn btn-primary btn-sm" onClick={()=> handleDelete(book.id)}>Supprimer</button>
                        </div>
                    </div>
                    ))}
                </div>
                <Link to="/addBook">
                    <button className="btn btn-primary btn-sm">Nouveau livre</button>
                </Link>
            </div>
            <SimpleModal title={"Suppression de livre imposssible"} bodyTxt={"Livre en cours d'emprunt"} handleCloseModal={handleCloseModal} showModal={showModal}/>
        </> )
}


/*   render()  {
        return <div>

            <h1>Mes Livres</h1>

            <div className="list-container">
                {this.state.books.length === 0 ? "Vous n'avez pas délaré de livres": null}
                {this.state.books.map(book => (
                    <div className="mybook-container">

                        <Book title={book.title} category={book.category}/>

                        <div className="container-buttons">
                            <Link to={`/addBook/${book.id}`}><button className="btn btn-primary btn-sm">Modifier</button></Link>
                            <button className="btn btn-primary btn-sm">Supprimer</button>
                        </div>

                    </div>
                ))}
            </div>

            <Link to="/addBook"><button className="btn btn-primary btn-sm">Nouveau Livre</button></Link>

        </div>
    }
}

export default MyBooks

 */