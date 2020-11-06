import React, { Component } from 'react'
import './ViewAllRecipes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addRecipes, setError, startFetch, endFetch } from '../../actions/index'
import RecipesApiService from '../../services/recipes-api-service'

class ViewAllRecipes extends Component {

    constructor(prop){
        super(prop)
        this.state = { loadingDotsNum : 1 }
        this.setInterval = setInterval(()=>{
            const newLoadingDotNum = this.state.loadingDotsNum > 2 ? this.state.loadingDotsNum - 3 : this.state.loadingDotsNum + 1
            this.setState({
            loadingDotsNum : newLoadingDotNum
            });
        }, 500)
    }

    renderRecipes(){
        const { recipes } = this.props
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

    getRotationAngle = (target) =>{
        const obj = window.getComputedStyle(target, null);
        const matrix = obj.getPropertyValue('-webkit-transform') || 
            obj.getPropertyValue('-moz-transform') ||
            obj.getPropertyValue('-ms-transform') ||
            obj.getPropertyValue('-o-transform') ||
            obj.getPropertyValue('transform');

        let angle = 0; 

        if (matrix !== 'none') 
        {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } 

        return (angle < 0) ? angle +=360 : angle;
    }

    componentDidMount(){
        this.props.startFetch();       
        RecipesApiService.getRecipes()
            .then(recipes => { 
                this.props.addRecipes(recipes)
                const img = document.getElementsByClassName("loading-recipes")[0]
                const currentAngle = this.getRotationAngle(img)
                img.animate([
                    { transform: `rotateZ(${currentAngle}deg)` }, 
                    { transform: `rotateZ(${currentAngle < 90 ? 0 : 360}deg)` }
                  ], { 
                    duration: (currentAngle/360) * 1000,
                    iterations: 1
                })
                this.props.endFetch()
                clearInterval(this.setInterval)
            })
            .catch(res=>{ 
                this.props.setError(res.error)
                const img = document.getElementsByClassName("loading-recipes")[0]
                const currentAngle = this.getRotationAngle(img)
                img.animate([
                    { transform: `rotateZ(${currentAngle}deg)` }, 
                    { transform: `rotateZ(${currentAngle < 90 ? 0 : 360}deg)` }
                  ], { 
                    duration: (currentAngle/360) * 1000,
                    iterations: 1
                })
                this.props.endFetch()
                clearInterval(this.setInterval)
            })
    }

    componentWillUnmount(){
        clearInterval(this.setInterval)
    }
    
    render() {
        const { loadingDotsNum } = this.state
        return (
            <>
               <section className="view-all-recipes-recipes">
                    <ul className="view-all-recipes-lists">
                        {!this.props.fetching ?
                            this.renderRecipes()
                            :
                            <h1 className="view-all-recipes-loading">
                                Loading{['', '.', '..', '...'][loadingDotsNum]}
                            </h1>
                        }
                    </ul>
               </section>
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        error: state.error,
        recipes : state.recipes,
        fetching: state.fetching
    }
}

const mapDispathToProps = () =>{
    return {
        addRecipes,
        setError,
        startFetch,
        endFetch,
    }
}

export default connect(mapStateToProps, mapDispathToProps())(ViewAllRecipes);