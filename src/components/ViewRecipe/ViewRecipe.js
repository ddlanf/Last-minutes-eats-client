import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import recipes from '../dummyData'
import './ViewRecipe.css'

class ViewRecipe extends Component {
    
    componentDidMount(){
        const { recipeId } = this.props.match.params;
       // const recipe = recipes.filter(recipe =>{ recipe.id === recipeId })
    }

    render() {
        return (
            <>
                <section className="view-recipe-logo">
                    <div className="view-recipe-food-image">Logo</div>
                </section>
                <section className="view-recipe-recipe">
                    <div className="view-recipe-main">
                        <h1 className="view-recipe-recipe-name-desktop">Cheesy Noodle with Egg</h1>
                        <div className="view-recipe-rating-desktop">
                            ★★★★☆
                        </div>
                        <div className="view-recipe-image">Image</div>
                    </div>
                    
                    <div className="view-recipe-main-detail">
                        <h1 className="view-recipe-recipe-name-mobile">Cheesy Noodle with Egg</h1>
                        <div className="view-recipe-rating-mobile">
                            ★★★★☆
                        </div>
                        <h2 className="view-recipe-ingredients-header">Ingredients</h2>
                        <ul className="view-recipe-ingredients">
                            <li>Sapporo Ichiban Shrimp Noodle Soup 3.5 oz</li>
                            <li>1 Large Egg</li>
                            <li>1/2 cup of water</li>
                            <li>1 or 2 slice(s) of cheese of your choice</li>
                        </ul>
                        <h2>Instructions</h2>
                        <ol className="view-recipe-instructions">
                            <li>
                                Boil water in a frying pan.
                            </li>
                            <li>
                                Add the noodle
                            </li>
                            <li>
                                Once the noodels are soft, add the half of soup base from the noodle package. Stir until mixed. 
                            </li>
                            <li>
                                Create a hole in middle of the noodle, add an egg in the hole you just made, and close the lid.
                            </li>
                            <li>
                                Once the egg is half cooked, place the cheese. Close the lid, and let it sit for 1 more minute.
                            </li>
                            <li>
                                Mix and enjoy
                            </li>
                        </ol>
                    </div>

                    <div className="view-recipe-rate-and-edit">
                        <p>Edit</p>
                        <p>
                            <label className="view-recipe-rate">Rate this recipe</label>
                            <span className="view-recipe-stars">☆☆☆☆☆</span>
                        </p>
                    </div>
                </section>  
            </>
        )
    }
}

export default withRouter(ViewRecipe)