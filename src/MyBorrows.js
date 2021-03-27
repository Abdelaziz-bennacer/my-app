import {useEffect, useState} from "react";
import Book from "./Book";
import "./MyBorrows.scss"
import axios from "axios";

export default function MyBorrows(){

   /* constructor() {
        super();
        this.state = {
            borrows: []
        }
    }*/

    /*componentDidMount() {
        axios.get('/borrows').then(response => {
            this.setState({borrows: response.data})
        })
    }*/

   const [myBorrows, setMyBorrows] = useState([])

    const getMyBorrows = () => {
        axios.get('/borrows').then(response => {
            setMyBorrows(response.data)
        })
    }

    useEffect(() => {
        getMyBorrows()
    }, [])

    const closeBorrow = (borrowId) => {
        axios.delete(`/borrows/${borrowId}`).then(response => {
            setMyBorrows(response.data)
        })

    }




    return <div>

                <h1>Mes Emprunts</h1>
                <div className="list-container">
                    {myBorrows.length === 0 ? "Vous n'avez pas d'emprunt": null}
                    {myBorrows.map(borrow => (<div className="borrow-container" key={borrow.id}>

                                    <Book
                                        title={borrow.book.title}
                                        category={borrow.book.category.label}
                                        lender={borrow.lender.firstName + " " + borrow.lender.lastName}
                                        askDate={borrow.askDate}
                                        closeDate={borrow.closeDate}/>

                                    <div className="text-center">
                                        {borrow.closeDate ? "" : <button className="btn btn-primary btn-sm"
                                                                         onClick={() => closeBorrow(borrow.id)}>Clore</button>}
                                    </div>
                                </div>)

                    )}

                </div>

            </div>


}
