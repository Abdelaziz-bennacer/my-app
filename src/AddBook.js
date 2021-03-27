import {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import './AddBook.scss'
import axios from "axios";

export default function AddBook(){

    let {bookId} = useParams();

    const [bookData, setBookData] = useState({})

    const [categoriesData, setCategoriesData] = useState([])

    const history = useHistory()

    useEffect(() => {
       axios.get('/categories').then(response => {
           setCategoriesData(response.data)
           setBookData({
               title: '',
               categoryId: response.data[0].id
           })
       })
           .then(() => {
               if(bookId){
                   axios.get(`/book/${bookId}`).then(response => {
                       setBookData({
                           title: response.data.title,
                           categoryId: response.data.category.id
                       })
                   })
               }
           })
    }, [bookId])


    const handleChange = (event) => {

        let currentState = {...bookData}
        currentState[event.target.name] = event.target.value
        setBookData(currentState)
    }

    const onSubmit = (event) => {
        if(bookId) {
            event.preventDefault()
            console.log('onSubmit')
            console.log(bookData)
            axios.put(`/books/${bookId}`, {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history.push("/myBooks")
            })
        } else {
            event.preventDefault()
            console.log('onSubmit')
            console.log(bookData)
            axios.post('/books', {
                ...bookData
            }).then(() => {
                //rediriger vers myBooks
                history.push("/myBooks")
            })

        }

    }

    return (

        <div className="container-add-book">
            <h2>Ajouter un livre</h2>

            <form onSubmit={onSubmit}>

                <div>
                    <label>Nom Du Livre</label>
                    <input name="title" value={bookData.title} type="text" onChange={handleChange} className="form-control"/>
                </div>

                <div>

                    <label>Catégorie Du Livre</label>

                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-control">
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}

                    </select>

                </div>

                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary"/>
                </div>

            </form>
        </div>

    )
}