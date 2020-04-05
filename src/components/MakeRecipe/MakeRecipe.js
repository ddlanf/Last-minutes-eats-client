import React, { Component } from 'react'
import './MakeRecipe.css'

export default class MakeRecipe extends Component {

    goBack = () =>{
        this.props.history.push(`/view-all-recipes`)
    }

    render() {
        return (
            <>
                <section className="make-recipe">
                    <h1 className="make-recipe-heading">Make Your Recipe</h1>
                    <form className="make-recipe-form">
                        <label className="make-recipe-label">Recipe Name</label>
                        <input className="make-recipe-input" type="text"/>
                        <label className="make-recipe-label">Recipe Image Link</label>
                        <input className="make-recipe-input" type="text"/>
                        <div className="make-recipe-ingredients-and-steps">
                                <div className="make-recipe-ingredients-input">
                                    <label className="make-recipe-label">Ingredients</label> 
                                    <div className="make-recipe-button-and-text">
                                        <button className="make-recipe-plus">+</button>
                                        <input className="make-recipe-variable-input" type="text"/>
                                    </div>
                                </div>
                                <div className="make-recipe-instructions-input">
                                    <label className="make-recipe-label">Instructions</label>
                                    <div className="make-recipe-button-and-text">
                                        <button className="make-recipe-plus">+</button>
                                        <input className="make-recipe-variable-input" type="text"/>
                                    </div>
                                </div>
                        </div>
                        <button className="make-recipe-submit">Submit</button>
                        <button 
                            onClick={this.goBack}
                            className="edit-recipe-submit"
                            >Back
                        </button>
                    </form>
                </section>   
            </>
        )
    }
}
