import React, { Component } from 'react'

const RecipeContext = React.createContext({
  recipes: [],
  recipe: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipes: () => {},
  setRecipe: () => {},
  deleteRecipe: () => {},
  clearRecipes: () => {},
})

export default RecipeContext

export class RecipeProvider extends Component {

  state = {
    recipes: [],
    recipe: [],
    error: null,
  };
 
  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setRecipes = recipes => {
    this.setState({ recipes })
  }

  setRecipe = recipe => {
    this.setState({ recipe })
  }

  deleteRecipe = id => {
    const recipes = this.state.recipes.filter(recipe => recipe.id !== id)  
    this.setState({ recipes })
  }

  clearRecipes = () => {
    this.setRecipes([])
    this.setImages([])
  }

  render() {
    const value = {
      recipes: this.state.recipes,
      recipe: this.state.recipe,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipes: this.setRecipes,
      setRecipe: this.setRecipe,
      deleteRecipe: this.deleteRecipe,
    }
    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    )
  }
}
