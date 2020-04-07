import React, { Component } from 'react'
import 'react-dom'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import SignUp from '../SignUp/SignUp'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import ViewAllRecipes from '../ViewAllRecipes/ViewAllRecipes'
import ViewRecipe from '../ViewRecipe/ViewRecipe'
import EditRecipe from '../EditRecipe/EditRecipe'
import MakeRecipe from '../MakeRecipe/MakeRecipe'
import TokenService from '../../services/token-service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import Star from '../ViewRecipe/StarRating/StarRating'
library.add(farStar, fasStar, fab, faStarHalfAlt)

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      hasEmailToken: TokenService.hasEmailToken()
    }
  }

  userSignedUp = () =>{
    this.setState({
      hasEmailToken: true
    })
  }

  render() {
    return (
        <div className='App'>
            <header className='App_header'>
                <Nav 
                  hasEmailToken={this.state.hasEmailToken}
                />
            </header>
            <main className="App_main">
              <Switch>
                <Route
                  exact
                  path={'/'}
                  component={LandingPage}
                />
                <Route
                  exact
                  path={'/signup'}
                  render={(props) => 
                        <SignUp {...props} 
                            hasEmailToken={this.state.hasEmailToken}
                            userSignedUp={this.userSignedUp}/>}
                />
                <Route
                  exact
                  path={'/view-all-recipes'}
                  component={ViewAllRecipes}
                />
                <Route
                  exact
                  path={'/view-recipe/:recipeId'}
                  component={ViewRecipe}
                />
                <Route
                  exact
                  path={'/edit-recipe/:recipeId'}
                  component={EditRecipe}
                />
                <Route
                  exact
                  path={'/make-recipe'}
                  component={MakeRecipe}
                />
                <Route
                  exact path={'/star'}
                  component={Star}
                />
                <Route
                  component={NotFoundPage}
                />
              </Switch>
            </main>
        </div>
    )
  }
}
