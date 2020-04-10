import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Logo from '../Logo/Logo'
import "./Nav.css"

class Nav extends Component {

    rendorRightNavBar(){
        const rightNavBar = 
        ['view-all-recipes', 'view-recipe/:recipeId', 'edit-recipe/:recipeId']
        .map(path =>{
           
           return(  
                    <Route
                         exact key={path} path={`/${path}`}>
                        <Link className="nav-bar-right-nav-link" to="/make-recipe">Make Recipe</Link>
                    </Route>);
        })

        rightNavBar.push(
            (<Route
                exact key={'/'} path={`/`}>
                {this.props.hasEmailToken ?
                    '': <Link className="nav-bar-right-nav-link" to="/signup">Sign Up</Link>}
            </Route>)
        )

        return rightNavBar
    }


    render() {

        return (
            <nav className="nav-bar">
                <div className="nav-bar-left-nav">
                    <Link 
                        className="nav-bar-left-nav-link"
                        to='/view-all-recipes'
                        >
                        Last Minute 
                            <span className="nav-break">Eats</span>
                    </Link>
                    <Route  exact path="/">
                        <div className="get-started">
                            <div className="get-started-arrow">↑</div>
                            <p className="get-started-text">Click here to get started!</p>
                        </div>
                    </Route>
                </div>
                <div className="logo-container">
                    <div className="line"></div>
                    <img className="last-minute-eats-logo" src={require('../../images/logo.png')} alt="logo"/>
                </div>
                <div className="nav-bar-right-nav">
                    {this.rendorRightNavBar()}
                </div>
            </nav>
        )
    }
}


export default Nav