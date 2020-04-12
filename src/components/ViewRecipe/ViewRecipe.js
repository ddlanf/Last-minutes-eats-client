import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RecipesApiService from '../../services/recipes-api-service'
import RecipeContext from '../../contexts/RecipeContext'
import StarRating from './StarRating/StarRating'
import DeleteRecipe from './DeleteRecipe/DeleteRecipe'
import './ViewRecipe.css'

class ViewRecipe extends Component {

    static contextType = RecipeContext

    state = { showDeleteRecipe: false }

    makeIngredientsList(ingredients){
        return ingredients.map((ingredient, index) =>{
            return <li key={index}>{ingredient}</li>
        })
    }

    makeStepsList(steps){
        return steps.map((step, index)=>{
            return <li key={index}>{step}</li>
        })
    }


    makeStars(numberOfStars){
        const stars = []
        
        for(let i = 1; i < 6; i++){

            if(numberOfStars < i  && numberOfStars < i - 0.75){
                stars.push((<FontAwesomeIcon key={i} className="view-recipe-star" icon={['far', 'star']}/>))
            }
            else if(numberOfStars >= i - 0.75 && numberOfStars <= i - 0.5){
                stars.push((<FontAwesomeIcon key={i} className="view-recipe-star" icon="star-half-alt"/>))
            }
            else if(numberOfStars > i - 0.5 && numberOfStars < i - 0.25){
                stars.push((<FontAwesomeIcon key={i} className="view-recipe-star" icon="star-half-alt"/>))
            }
            else{  stars.push((<FontAwesomeIcon  key={i} className="view-recipe-star" icon={['fas', 'star']}/>))  }
        }

        return stars
    }

    toggleDeleteRecipe = (showDeleteRecipe) =>{
        this.setState({ showDeleteRecipe })
    }

    componentDidMount(){
        const { recipeId } = this.props.match.params;

        RecipesApiService.getRecipe(recipeId)
            .then(recipe =>{
                this.context.setRecipe(recipe)
            })
            .catch(res => {this.context.setError(res.error)})
    }

    render() {
        
        const defaultRecipe = { steps: [], ingredients: [], preparation_time_unit: ''}

        const recipe = this.context.recipe.recipe_name ? this.context.recipe : defaultRecipe 
     
        const { recipeId } = this.props.match.params;

        return (
            <>
                <DeleteRecipe
                    showDeleteRecipe={this.state.showDeleteRecipe}
                    toggleDeleteRecipe={this.toggleDeleteRecipe}
                />
                <section className="view-recipe-recipe">
                    <div className="view-recipe-main">
                        <h1 className="view-recipe-recipe-name-desktop">{recipe.recipe_name}</h1>
                        <div className="view-recipe-rating-desktop">
                          {this.makeStars(recipe.overall_rating)}
                        </div>
                        <div className="view-recipe-image-box"> 
                            <img className="view-recipe-image" alt={recipe.recipe_name} src={recipe.image} />
                        </div>
                        <h2 className="view-recipe-preparation-time-desktop">
                            {recipe.preparation_time + recipe.preparation_time_unit.slice(0, 3)}
                        </h2>
                        <div className="view-recipe-star-box-desktop">
                            <StarRating recipeId={recipeId}/>
                        </div>
                    </div>
                    
                    <div className="view-recipe-main-detail">
                        <h1 className="view-recipe-recipe-name-mobile">{recipe.recipe_name}</h1>
                        <div className="view-recipe-rating-mobile">
                            {this.makeStars(recipe.overall_rating)}
                        </div>
                        <h2 className="view-recipe-preparation-time-mobile">
                            {recipe.preparation_time} {recipe.preparation_time_unit.slice(0, 3)}
                        </h2>
                        <h2 className="view-recipe-ingredients-header">Ingredients</h2>
                        <ul 
                            className={`view-recipe-ingredients  ${(recipe.ingredients.length <= 3) ? 'short-list' : 'long-list'}`}>
                            {this.makeIngredientsList(recipe.ingredients)}
                        </ul>
                        <h2 className="view-recipe-ingredients-header">Instructions</h2>
                        <ol className={`view-recipe-instructions
                         ${(recipe.steps.length <= 4) ? 'short-list' : 'long-list'}`}>
                            {this.makeStepsList(recipe.steps)}
                        </ol>
                    </div>
                    <div className="view-recipe-star-box-mobile">
                        <StarRating recipeId={recipeId}/>
                    </div>
                    <div className="view-recipe-back-and-edit">
                        <Link
                            to="/view-all-recipes"
                            className="view-recipe-back"
                            >
                            Back
                        </Link>
                        <Link 
                            to={`/edit-recipe/${recipe.id}`}
                            className="view-recipe-edit">
                            Edit
                        </Link>
                    </div>
                </section>  
                <button
                    onClick={() => this.toggleDeleteRecipe(true)}
                    className="view-recipe-delete"
                    >
                    Delete this recipe
                </button>
            </>
        )
    }
}

export default withRouter(ViewRecipe)