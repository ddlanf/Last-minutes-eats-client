import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import './SignUp.css'

export default class SignUp extends Component {
    render() {
        return (
            <form className="sign-up-form">
                <label className="sign-up-label">Please Enter Your Email</label>
                <input className="sign-up-input"/>
                <Link
                    to="/"
                    className="sign-up-link"
                    >
                    Back
                </Link>
            </form>
        )
    }
}
