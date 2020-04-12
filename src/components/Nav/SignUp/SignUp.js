import React, { Component } from 'react'
import './SignUp.css'
import EmailApiService from '../../../services/emails-api-service'
import TokenService from '../../../services/token-service'

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            submitted: false,
            error: '',
            back: false
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


    goBack = () =>{
        this.setState({ back: true, error: '' })
    } 

    setDisplayProperty = () =>{
        if(this.state.back){ 
            this.props.toggleSignUp(false)
            this.setState({ back: false }) 
        }
    }
    
    render() {

        return (
            <section 
                className="sign-up">
                <form
                    style={{ display: this.props.showSignUp ? 'block' : 'none'}}  
                    onAnimationEnd={this.setDisplayProperty}
                    onSubmit={this.submitEmail}
                    className={`sign-up-form ${this.state.back ? 'slide-up' : ''}`}>
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
                    <button
                        type="button"
                        onClick={this.goBack}
                        className="sign-up-back">
                            Back
                    </button>
                </form>
            </section>
        )
    }
}

export default SignUp