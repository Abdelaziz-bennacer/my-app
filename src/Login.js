import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import logo from './logo.png'
import './Login.scss'
import axios from "axios";
import SimpleModal from "./SimpleModal";


class Login extends Component{

    constructor() {
        super();
        this.state = {userData: {}, showModal: false}
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleChange(event) {

        let currentState = {...this.state.userData}
        currentState[event.target.name] = event.target.value
        this.setState({userData: currentState})
    }

    onSubmit (event) {
        event.preventDefault()

        axios.post('/authenticate',
            {email: this.state.userData.email,
                password: this.state.userData.password}).then(response => {
                    this.props.setuserInfo(response.data.userName)
                    this.props.history.push("/listBooks")
        }).catch(()=> {
            this.setState({showModal: true})
        })
    }

    handleCloseModal() {
        this.setState({showModal: false})
    }


    render() {

        const title = "Login incorrect"
        const bodyTxt = "Votre login ou mot de passe est incorrect "

        return (
            <>
                <div className="login-container">
                      <div>
                          <div>
                              <img src={logo} alt="Logo" />
                          </div>
                          <div className="title">
                              Bienvenue sur ShareBook!
                          </div>
                          <div className="form-container">
                              <form onSubmit={this.onSubmit}>
                                  <span>Mail: </span>
                                  <input type="text" className="form-control" name="email" onChange={this.handleChange}/>
                                  <span>Password: </span>
                                  <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                                  <div>
                                      <input type="submit" className="btn btn-primary" value="OK"/>
                                  </div>
                              </form>
                          </div>
                          <div><Link to="/addUser">M'inscrire</Link></div>
                    </div>
                </div>
                <SimpleModal showModal={this.state.showModal} handleCloseModal={this.handleCloseModal} title={title} bodyTxt={bodyTxt}/>
            </>
        )
    }

}
export default withRouter(Login)