import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import recipes from '../dummyData'
import './ViewRecipe.css'

class ViewRecipe extends Component {

    makeStars(numberOfStars){
        const stars = []

        for(let i = 0; i < 5; i++){
            if(i >= numberOfStars){
                stars.push('☆')
            }
            else{ stars.push('★') }
        }

        return stars.join('')
    }

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

    goBack = () =>{
        this.props.history.push(`/view-all-recipes`)
    }

    render() {
        const { recipeId } = this.props.match.params;
        const recipe = recipes.filter(recipe => recipe.id === parseInt(recipeId))[0]
     
        return (
            <>
                <section className="view-recipe-logo">
                    <div className="view-recipe-food-image"></div>
                </section>
                <section className="view-recipe-recipe">
                    <div className="view-recipe-main">
                        <h1 className="view-recipe-recipe-name-desktop">{recipe.name}</h1>
                        <div className="view-recipe-rating-desktop">
                          {this.makeStars(recipe.rating)}
                        </div>
                        <div className="view-recipe-image-box"> 
                            <img className="view-recipe-image" alt={recipe.name} src={recipe.image} />
                        </div>
                        <h2 className="view-recipe-preparation-time-desktop">
                            {recipe.preparation_time + recipe.preparation_unit.slice(0, 3)}
                        </h2>
                    </div>
                    
                    <div className="view-recipe-main-detail">
                        <h1 className="view-recipe-recipe-name-mobile">{recipe.name}</h1>
                        <div className="view-recipe-rating-mobile">
                            {this.makeStars(recipe.rating)}
                        </div>
                        <h2 className="view-recipe-preparation-time-mobile">
                            {recipe.preparation_time + recipe.preparation_unit.slice(0, 3)}
                        </h2>
                        <h2 className="view-recipe-ingredients-header">Ingredients</h2>
                        <ul className="view-recipe-ingredients">
                            {this.makeIngredientsList(recipe.ingredients)}
                        </ul>
                        <h2>Instructions</h2>
                        <ol className="view-recipe-instructions">
                            {this.makeStepsList(recipe.steps)}
                        </ol>
                    </div>

                    <div className="view-recipe-rate-and-edit">
                        <Link 
                            to={`/edit-recipe/${recipe.id}`}
                            className="view-recipe-edit">
                            Edit
                        </Link>
                        <p>
                            <label className="view-recipe-rate">Rate this recipe</label>
                            <span className="view-recipe-stars">☆☆☆☆☆</span>
                        </p>
                    </div>
                    <button
                        className="view-recipe-back"
                        onClick={this.goBack}
                        >
                        Back
                    </button>
                </section>  
            </>
        )
    }
}

export default withRouter(ViewRecipe)