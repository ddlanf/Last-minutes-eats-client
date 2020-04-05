import React from 'react';
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

function App() {
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
              path={'/signup'}
              component={SignUp}
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
  );
}

export default App;