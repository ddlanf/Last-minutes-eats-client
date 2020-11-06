import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import TokenService from '../../services/token-service'
import SignUp from './SignUp/SignUp'
import "./Nav.css"

class Nav extends Component {

    constructor(props){
        super(props)
        this.state = {
          hasEmailToken: TokenService.hasEmailToken(),
          showSignUp : false
        }
    }

    toggleSignUp = (showSignUp) =>{
        this.setState({ showSignUp })
    }


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
                {!this.state.hasEmailToken ?
                        <button 
                            onClick={() => this.toggleSignUp(true)}
                            className="nav-bar-right-nav-link" >
                                Sign Up
                        </button> : ''}
            </Route>)
        )

        return rightNavBar
    }

    userSignedUp = () =>{
        this.setState({
          hasEmailToken: true
        })
    }

    render() {

        return (
            <>
                <SignUp
                    userSignedUp={this.userSignedUp}
                    toggleSignUp={this.toggleSignUp}
                    showSignUp={this.state.showSignUp}
                    hasEmailToken={this.state.hasEmailToken}/>
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
                        <Link to="/" className="last-minute-eats-logo">
                            <img  className={this.props.fetching ? "loading-recipes" : "not-loading-recipes"} src={require('../../images/logo.png')} alt="logo"/>
                        </Link>
                    </div>
                    <div className="nav-bar-right-nav">
                        {this.rendorRightNavBar()}
                    </div>
                </nav>
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        fetching: state.fetching,
    }
}

export default connect(mapStateToProps)(Nav)