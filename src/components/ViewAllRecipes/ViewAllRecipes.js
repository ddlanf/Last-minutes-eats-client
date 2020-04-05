import React, { Component } from 'react'
import './ViewAllRecipes.css'
import recipes from '../dummyData'
import { Link } from 'react-router-dom'

export default class ViewAllRecipes extends Component {

    renderRecipes(){
        const allRecipes = recipes.map(recipe =>{
            return (
                    <li
                        key={recipe.id}
                        >
                        <Link
                            className="view-all-recipes-link"
                            to={`/view-recipe/${recipe.id}`}>
                            <div className="view-all-recipes-recipe">
                                <div className="view-all-recipes-recipe-box"> 
                                    <p className="view-all-recipes-rating">{this.makeStars(recipe.rating)}</p>
                                    <h3 className="view-all-recipes-recipe-name">{recipe.name}</h3>
                                    <div className="view-all-recipes-recipe-details">
                                        <p className="view-all-recipes-preparation-time">{recipe.preparation_time}{recipe.preparation_unit}</p>
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

        for(let i = 0; i < 5; i++){
            if(i >= numberOfStars){
                stars.push('☆')
            }
            else{ stars.push('★') }
        }

        return stars.join('')
    }
    
    render() {
       
        return (
            <>
               <section className="view-all-recipes-logo">
                    <div className="view-all-recipes-logo-food-image">Logo</div>
               </section>  
               <section className="view-all-recipes-recipes">
                    <ul className="view-all-recipes-lists">
                        {this.renderRecipes()}
                    </ul>
               </section>
            </>
        )
    }
}
