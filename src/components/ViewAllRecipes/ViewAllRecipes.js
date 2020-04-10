import React, { Component } from 'react'
import './ViewAllRecipes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import RecipesApiService from '../../services/recipes-api-service'
import RecipeContext from '../../contexts/RecipeContext'

export default class ViewAllRecipes extends Component {

    static contextType = RecipeContext
    
    renderRecipes(){
        const { recipes } = this.context
        const allRecipes = recipes.map((recipe, index) =>{
            return (
                    <li
                        key={recipe.id}
                        >
                        <Link
                            className="view-all-recipes-link"
                            to={`/view-recipe/${recipe.id}`}>
                            <div className="view-all-recipes-recipe">
                                <div className="view-all-recipes-recipe-box"> 
                                    <p className="view-all-recipes-rating">{this.makeStars(recipe.overall_rating)}</p>
                                    <h3 className="view-all-recipes-recipe-name">{recipe.recipe_name}</h3>
                                    <div className="view-all-recipes-recipe-details">
                                        <p className="view-all-recipes-preparation-time">{recipe.preparation_time} {recipe.preparation_time_unit.slice (0, 3)}</p>
                                        <p className="view-all-recipes-amount-of-steps">{recipe.steps.length} steps</p>
                                        <p className="view-all-recipes-amount-of-ingredients">{recipe.ingredients.length} ingredients</p>
                                    </div>
                                </div>
                                <div className="view-all-recipes-image-box">
                                    <img className="view-all-recipes-image" alt={recipe.name} src={recipe.image}/>
                                </div>
                            </div>
                        </Link>
                    </li>
                    )
        })

        return allRecipes
    }

    makeStars(numberOfStars){
        const stars = []
        
        for(let i = 1; i < 6; i++){

            if(numberOfStars < i  && numberOfStars < i - 0.75){
                stars.push((<FontAwesomeIcon key={i} className="view-all-recipes-star" icon={['far', 'star']}/>))
            }
            else if(numberOfStars >= i - 0.75 && numberOfStars <= i - 0.5){
                stars.push((<FontAwesomeIcon key={i} className="view-all-recipes-star" icon="star-half-alt"/>))
            }
            else if(numberOfStars > i - 0.5 && numberOfStars < i - 0.25){
                stars.push((<FontAwesomeIcon key={i} className="view-all-recipes-star" icon="star-half-alt"/>))
            }
            else{  stars.push((<FontAwesomeIcon  key={i} className="view-all-recipes-star" icon={['fas', 'star']}/>))  }
        }

        return stars
    }

    componentDidMount(){
        RecipesApiService.getRecipes()
            .then(recipes => { this.context.setRecipes(recipes)})
            .catch(res=>{ this.context.setError(res.error)})
    }
    
    render() {
       
        return (
            <>
               <section className="view-all-recipes-recipes">
                    <ul className="view-all-recipes-lists">
                        {this.renderRecipes()}
                    </ul>
               </section>
            </>
        )
    }
}
