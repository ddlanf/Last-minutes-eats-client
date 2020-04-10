import React, { Component } from 'react'
import './Logo.css'
export default class Logo extends Component {

    state = {
        viewAllRecipes: false,
    }

    render() {
        return (
            <div className="logo-container">
                <img className="last-minute-eats-logo" src={require('../../images/logo.png')} alt="logo"/>
            </div>
        )
    }
}
