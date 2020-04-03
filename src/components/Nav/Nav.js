import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Nav.css"

export default class Nav extends Component {

    render() {

        //for now
        const landingPage = true;

        return (
            <nav className="nav-bar">
                <div className="nav-bar-left-nav">
                    <Link 
                        className="nav-bar-left-nav-link"
                        to='/view-all-recipes'
                        >
                        Last Minute Eats
                    </Link>
                </div>
                <div className="nav-bar-right-nav">
                    {landingPage ? 
                        <Link className="nav-bar-right-nav-link" to="/signup">Sign Up</Link> : 
                        <Link className="nav-bar-right-nav-link" to="create-recipe">Create Recipe</Link>}
                </div>
            </nav>
        )
    }
}
