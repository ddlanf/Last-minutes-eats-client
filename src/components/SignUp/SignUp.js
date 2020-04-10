import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import './SignUp.css'
import EmailApiService from '../../services/emails-api-service'
import TokenService from '../../services/token-service'

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            submitted: false,
            error: ''
        }
    }

    handleInputChange = (event) =>{
        const { name } = event.target
        const { value } = event.target
        
        this.setState({
            [name] : value
        })
    }

    submitEmail = (ev) =>{
        ev.preventDefault()

        const { email } = this.state
        const newEmail = { email }
        if(!newEmail.email){
            this.setState({ error: 'Please enter email'})
        }

        else{
            EmailApiService.postEmail(newEmail)
                .then((res)=> {
                    this.setState({submitted: true, error: '' })
                    TokenService.saveEmailToken(TokenService.makeBasicEncryptedToken(res.email))
                    this.props.userSignedUp()
                })
                .catch(res =>{ this.setState({ error: res.error }) })
        }
    }


    render() {
        return (
            <section 
                className={`sign-up ${this.state.back ? 'slide-up' : ''}`}>
                <form
                    onSubmit={this.submitEmail}
                    className="sign-up-form">
                    <label className="sign-up-label">
                        Please enter your email to get early access to the full version of the App.
                    </label>
                    <input 
                        type="text"
                        name="email"
                        onChange={this.handleInputChange}
                        className="sign-up-input"/>
                    {this.state.error ? <p className="sign-up-error">{this.state.error}</p> : ''}
                    {this.state.submitted ? 
                    <p className="sign-up-submitted">
                        Thank you for signing in. We will email you once the full version of the 
                        App is ready!!
                    </p> : ''}
                    <button
                        disabled={this.state.submitted}
                        type="submit"
                        className="sign-up-submit"
                        >
                        Submit
                    </button>
                    <Link 
                        className="sign-up-back"
                        to="/">
                            Back
                    </Link>
                </form>
            </section>
        )
    }
}
