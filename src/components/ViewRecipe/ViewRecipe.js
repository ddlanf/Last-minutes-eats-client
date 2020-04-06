import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RecipesApiService from '../../services/recipes-api-service'
import RecipeContext from '../../contexts/RecipeContext'
import StarRatingComponent from 'react-star-rating-component';
import RatingApiService from '../../services/ratings-api-service'
import TokenService from '../../services/token-service'
import './ViewRecipe.css'

class ViewRecipe extends Component {

    static contextType = RecipeContext

   constructor(props){
       super(props)
       const { recipeId } = this.props.match.params;
       const ratingToken = TokenService.getRatingToken(recipeId)
        this.state = {
            submitted: !!ratingToken,
            rating: !!ratingToken ? parseInt(ratingToken) : 0
        }
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

    onStarHover(nextValue){
        this.setState({rating: nextValue});
    }

    onStarClick(nextValue) {
        this.setState({ submitted: true })
        const { recipeId } = this.props.match.params;
        const newRating = { rating : nextValue }
        
        RatingApiService.postRating(newRating, recipeId)
           .then(newRating => { TokenService.saveRatingToken(recipeId, newRating.rating) })
           .catch(res =>{ this.context.setError(res.error)})
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
     
        return (
            <>
                <section className="view-recipe-logo">
                    <div className="view-recipe-food-image"></div>
                </section>
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
                    </div>
                    
                    <div className="view-recipe-main-detail">
                        <h1 className="view-recipe-recipe-name-mobile">{recipe.recipe_name}</h1>
                        <div className="view-recipe-rating-mobile">
                            {this.makeStars(recipe.overall_rating)}
                        </div>
                        <h2 className="view-recipe-preparation-time-mobile">
                            {recipe.preparation_time + recipe.preparation_time_unit.slice(0, 3)}
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
                        <div>
                            <label className="view-recipe-rate">Rate this recipe</label>
                            <span className="view-recipe-stars">
                            <StarRatingComponent 
                                name="rate" 
                                starCount={5}
                                starColor={"black"}
                                emptyStarColor={"grey"}
                                value={this.state.rating}
                                editing={!this.state.submitted}
                                onStarClick={this.onStarClick.bind(this)}
                                onStarHover={this.onStarHover.bind(this)}
                            />
                            </span>
                        </div>
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