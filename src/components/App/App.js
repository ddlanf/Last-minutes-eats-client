import React, { Component } from 'react'
import 'react-dom'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import ViewAllRecipes from '../ViewAllRecipes/ViewAllRecipes'
import ViewRecipe from '../ViewRecipe/ViewRecipe'
import EditRecipe from '../EditRecipe/EditRecipe'
import MakeRecipe from '../MakeRecipe/MakeRecipe'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
library.add(farStar, fasStar, fab, faStarHalfAlt)

export default class App extends Component {

  render() {
    return (
        <div className='App'>
            <header className='App_header'>
                <Nav />
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
                  component={NotFoundPage}
                />
              </Switch>
            </main>
        </div>
    )
  }
}
