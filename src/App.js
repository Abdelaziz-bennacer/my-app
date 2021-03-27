import {BrowserRouter, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import MyBooks from "./MyBooks";
import ListBooks from "./ListBooks";
import AddBook from "./AddBook";
import MyBorrows from "./MyBorrows";
import Login from "./Login";
import AddUser from "./AddUser";
import Header from "./Header";
import {useState} from "react";

function App() {

    const [userInfo, setUserInfo] = useState('')

    return (

        <div>

              <BrowserRouter>

                  <div className="App">

                        {!userInfo && <Redirect to="/login" />}
                        {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo}/>}

                        <Route path="/myBooks">
                            <MyBooks/>
                        </Route>

                        <Route path="/listBooks">
                            <ListBooks/>
                        </Route>

                        <Route exact path="/addBook">
                            <AddBook/>
                        </Route>

                        <Route path="/myBorrows">
                            <MyBorrows/>
                        </Route>

                        <Route path="/login">
                            <Login setuserInfo={setUserInfo}/>
                        </Route>

                        <Route path="/addUser">
                            <AddUser setUserInfo={setUserInfo}/>
                        </Route>

                        <Route exact path="/addBook/:bookId">
                            <AddBook />
                        </Route>

                  </div>

              </BrowserRouter>

        </div>
    );
}

export default App;
