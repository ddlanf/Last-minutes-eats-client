import React, { Component } from 'react'
import recipes from '../dummyData'
import {  withRouter } from 'react-router-dom'
import './EditRecipe.css'

class EditRecipe extends Component {

    makeInstructionlists(steps){
        const inputFields = steps.map((step, index) =>{
            if(index === 0){
            return (
                    <div key={index} className="edit-recipe-button-and-text">
                        <button className="edit-recipe-plus">+</button>
                        <input 
                                defaultValue={step}
                                className="edit-recipe-variable-input" 
                                type="text"/>
                    </div>)
            }
            else if(index === 6){
                return (
                    <div key={index} className="edit-recipe-button-and-text">
                        <input 
                                defaultValue={step}
                                className="edit-recipe-variable-input" 
                                type="text"/>
                        <button className="edit-recipe-minus">-</button>
                    </div>)
            }
            else if(index === steps.length - 1){
                return( <div key={index} className="edit-recipe-button-and-text">
                            <button className="edit-recipe-plus">+</button>
                                <input 
                                    defaultValue={step}
                                    className="edit-recipe-variable-input" 
                                    type="text"/>
                            <button className="edit-recipe-minus">-</button>
                        </div>)
            }
            else{
                return( <div key={index} className="edit-recipe-button-and-text">
                             <button className="edit-recipe-plus">+</button>
                             <input 
                                    defaultValue={step}
                                    className="edit-recipe-variable-input" 
                                    type="text"/>
                         </div>)
            }
        })

        return inputFields
    }

    makeIngredientslist(ingredients){
        const inputFields = ingredients.map((ingredient, index) =>{
            if(index === 0){
            return (
                    <div key={index} className="edit-recipe-button-and-text">
                        <button className="edit-recipe-plus">+</button>
                        <input 
                                defaultValue={ingredient}
                                className="edit-recipe-variable-input" 
                                type="text"/>
                    </div>)
            }
            else if(index === 4){
                return (
                    <div key={index} className="edit-recipe-button-and-text">
                        <input 
                                defaultValue={ingredient}
                                className="edit-recipe-variable-input" 
                                type="text"/>
                        <button className="edit-recipe-minus">-</button>
                    </div>)
            }
            else if(index === ingredients.length - 1){
                return( <div key={index} className="edit-recipe-button-and-text">
                            <button className="edit-recipe-plus">+</button>
                                <input 
                                    defaultValue={ingredient}
                                    className="edit-recipe-variable-input" 
                                    type="text"/>
                            <button className="edit-recipe-minus">-</button>
                        </div>)
            }
            else{
                return( <div key={index} className="edit-recipe-button-and-text">
                             <button className="edit-recipe-plus">+</button>
                             <input 
                                    defaultValue={ingredient}
                                    className="edit-recipe-variable-input" 
                                    type="text"/>
                         </div>)
            }
        })

        return inputFields
    }

    goBack = (id) => {
        this.props.history.push(`/view-recipe/${id}`)
    }

    render() {

        const { recipeId } = this.props.match.params;
        const recipe = recipes.filter(recipe => recipe.id === parseInt(recipeId))[0]
        const { ingredients, steps, name, image } = recipe

        return (
            <>
                <section className="edit-recipe">
                    <h1 className="edit-recipe-heading">Edit Your Recipe</h1>
                    <form className="edit-recipe-form">
                        <label className="edit-recipe-label">Recipe Name</label>
                        <input 
                                defaultValue={name}
                                className="edit-recipe-input" 
                                type="text"/>
                        <label className="edit-recipe-label">Recipe Image Link</label>
                        <input 
                                defaultValue={image}
                                className="edit-recipe-input" 
                                type="text"/>
                        <div className="edit-recipe-ingredients-and-steps">
                                <div className="edit-recipe-ingredients-input">
                                    <label className="edit-recipe-label">Ingredients</label> 
                                    {this.makeIngredientslist(ingredients)}
                                </div>
                                <div className="edit-recipe-instructions-input">
                                    <label className="edit-recipe-label">Instructions</label>
                                        {this.makeInstructionlists(steps)}
                                </div>
                        </div>
                        <button className="edit-recipe-submit">Submit</button>
                        <button 
                            onClick={() => this.goBack(recipeId)}
                            className="edit-recipe-submit"
                            >Back
                        </button>
                    </form>    
                </section>   
            </>
        )
    }
}

export default withRouter(EditRecipe)