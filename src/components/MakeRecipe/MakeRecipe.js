import React, { Component } from 'react'
import RecipesApiService from '../../services/recipes-api-service'
import { connect } from 'react-redux'
import { addRecipes, setError } from '../../actions/index'
import RecipeTokensApiService from '../../services/recipe-token-api-service'
import './MakeRecipe.css'

class MakeRecipe extends Component {

    constructor(props){
        super(props)
        this.state = {
            recipe_name: '',
            image:'',
            preparation_time: '',
            preparation_time_unit: 'minutes',
            ingredients: [
                { value: '', display: true  },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
            ],
            steps : [
                { value: '', display: true  },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
                { value: '', display: false },
            ],
            token : '',
            changed: false,
            error : '',
            buffer: false
        }
    }

    goBack = () =>{
        this.props.history.push(`/view-all-recipes`)
    }

    handleInputChange = (event) =>{

        this.setState({ clicked: false })

        const { name } = event.target
        const { value } = event.target
        
        this.setState({
             [name] : value,
             changed : true
        })
    }

    handleArrayInputChange = (event, input, index) =>{
        const currentInputs = this.state[input]
        currentInputs[index].value = event.target.value
        
        this.setState({
            input: currentInputs,
            changed : true
        })
    }   

    handleSelectChange = (event) =>{
        this.setState({ 
            preparation_time_unit : event.value,
            changed: true
        });
    }

    makeIngredientslist(){
        const ingredientsInput = [1,2,3,4,5].map((num, index)=>{
            return( 
                <div 
                    key={num} 
                    style={{display: this.state.ingredients[index].display ? 'block' : 'none' }}
                    className="make-recipe-button-and-text">
                    {(index !== 4) ?
                        <button 
                            type="button"
                            style={{display: 
                                this.state.ingredients[index + 1].display ? 'none' :  'block'}}
                            onClick={() => this.addAnother('ingredients', index)}
                            className="make-recipe-plus">
                            +
                        </button>
                        : ''}
                    <input 
                        className="make-recipe-variable-input" 
                        type="text"
                        name="ingredient-1"
                        onChange={(e) => this.handleArrayInputChange(e, 'ingredients', index)}/>
                     {(index !== 0) ?
                        <button 
                            type="button"
                            style={{display: (index === 4) ? 'block' : this.state.ingredients[index + 1].display  
                                ? 'none' :  'block'}}
                            onClick={() => this.deleteOne('ingredients', index)}
                            className="make-recipe-minus">
                            -
                        </button>
                        : ''}
                </div>
            )                          
        })

        return ingredientsInput
    }

    makeInstructionlists(){
         const stepsInput = [1,2,3,4,5,6,7].map((num, index)=>{
             return (
                <div 
                    key={num} 
                    style={{display: this.state.steps[index].display ? 'block' : 'none' }}
                    className="make-recipe-button-and-text">
                    <span className="make-recipe-number">{num}</span>
                     {(index !== 6) ?
                        <button 
                            type="button"
                            style={{display: 
                                this.state.steps[index + 1].display ? 'none' :  'block'}}
                            onClick={() => this.addAnother('steps', index)}
                            className="make-recipe-plus">
                            +
                        </button>
                        : ''}
                    <textarea 
                        className="make-recipe-variable-input" 
                        type="text"
                        name={`step-${num}`}
                        onChange={(e) => this.handleArrayInputChange(e, 'steps', index)}/>
                     {(index !== 0) ?
                        <button 
                            type="button"
                            style={{display: (index === 6) ? 'block' : this.state.steps[index + 1].display  
                                ? 'none' :  'block'}}
                            onClick={() => this.deleteOne('steps', index)}
                            className="make-recipe-minus">
                            -
                        </button>
                        : ''}
                </div>
             )
         })

         return stepsInput
    }   

    addAnother = (input, index) =>{
        const currentInputs = this.state[input]
        currentInputs[index + 1].display = true
        
        this.setState({
            input: currentInputs
        })
    }

    deleteOne = (input, index) =>{
        const currentInputs = this.state[input]
        currentInputs[index].display = false

        this.setState({
            input: currentInputs
        })
    }


    postRecipe = (e) =>{
        e.preventDefault()

        let validRecipe = true
        const { recipe_name, image, preparation_time, preparation_time_unit, token } = this.state
        const newRecipe = { recipe_name, image, preparation_time, preparation_time_unit }

        for(let [key, value] of Object.entries(newRecipe)){
            if(value === ""){
               this.setState({error : `Please enter ${key.replace('_', ' ')}`, changed: false})
               validRecipe = false;
            }
        }

        const ingredients = this.state.ingredients.filter(item => item.display).map(item => item.value).filter(item=> !!item)
        const steps = this.state.steps.filter(item => item.display).map(item => item.value).filter(item=> !!item)
    
        if(!ingredients.length){
            this.setState({error : `Please enter ingredients`, changed: false})
            validRecipe = false;
        }

        if(!steps.length){
            this.setState({error : `Please enter instructions`, changed: false})
            validRecipe = false;
        }

        if(!token){
            this.setState({error : `Please enter token`, changed: false})
            validRecipe = false;
        }
        else{
            const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])[\S]+/
            if (token.length < 8) {
                this.setState({error : `Token must be longer than 8 characters`, changed: false})
                validRecipe = false;
            }
            else if (token.length > 72) {
                this.setState({error : `Token be less than 72 characters`, changed: false})
                validRecipe = false;
            }
            else if (token.startsWith(' ') || token.endsWith(' ')) {
                this.setState({error : `Token must not start or end with empty spaces`, changed: false})
                validRecipe = false;
            }
            else if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(token)) {
                this.setState({error : `Token must contain one upper case, lower case, number and special character`, changed: false})
                validRecipe = false;
            }
        }

        newRecipe.ingredients = ingredients
        newRecipe.steps = steps

        if(validRecipe){

            this.setState({ buffer : true })
            RecipesApiService.postRecipe(newRecipe)
                .then(recipe =>{
                    
                    const recipeToken = { 
                        recipe_id : recipe.id,
                        token 
                    }

                    RecipeTokensApiService.postRecipeToken(recipeToken)
                        .then(()=>{
                            RecipesApiService.getRecipes()
                                .then(recipes => {
                                    this.props.addRecipes(recipes)
                                    this.props.history.push('view-all-recipes')
                                })
                                .catch(res=>{ 
                                    this.props.setError(res)
                                })
                        })
                        .catch(res => this.setState({ error: res.error, buffer: false }))
                })
                .catch(res => {this.setState({ error: res.error, buffer: false})})
        }
        else{ this.setState({ buffer : false }) }
    }

    render() {
        return (
            <>
                <section className="make-recipe">
                    <h1 className="make-recipe-heading">Make Your Recipe</h1>
                    <form className="make-recipe-form"
                        onSubmit={(e) => this.postRecipe(e)}
                        >
                        <div className="make-recipe-top-field">
                            <div className="make-recipe-name-field">
                                <label className="make-recipe-label">Recipe Name</label>
                                <input 
                                    className="make-recipe-input" 
                                    type="text"
                                    name="recipe_name"
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="make-recipe-image-field">
                                <label className="make-recipe-label">Recipe Image Link</label>
                                <input 
                                    className="make-recipe-input" 
                                    type="text"
                                    name="image"
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="make-recipe-ingredients-and-instructions">
                            <div className="make-recipe-instructions-field">
                                <label className="make-recipe-label instructions">Instructions</label>
                                <div className="make-recipe-instructions-input-box">
                                    {this.makeInstructionlists()}
                                </div>
                            </div>
                            <div className="make-recipe-ingredients-field">
                                <label className="make-recipe-label">Ingredients</label> 
                                <div className="make-recipe-ingredients-input-box">
                                    {this.makeIngredientslist()}
                                </div>
                            </div>
                        </div>
                        <label className="make-recipe-preparation-time-label" >Preparation Time</label>
                        <div className="make-recipe-preparation-time-box">
                            <input
                                className="make-recipe-preparation-time-input" 
                                type="number"
                                name="preparation_time"
                                onChange={this.handleInputChange}
                            />
                            <select 
                                className="make-recipe-preparation-time-unit-input" 
                                value={this.state.preparation_time_unit} onChange={(e) => this.handleSelectChange(e.target)}>
                                <option value="seconds">sec</option>
                                <option value="minutes">min</option>
                            </select>
                        </div>
                        <div className="make-recipe-token-box">
                            <label className="make-recipe-token-label">
                                Create a Token
                                <span className="make-recipe-break">
                                (This will be required to edit or delete your recipe)
                                </span>
                            </label>
                            <input
                                className="make-recipe-token-input" 
                                type="password"
                                name="token"
                                onChange={this.handleInputChange}/>
                        </div>
                        {this.state.buffer ? <p className="make-recipe-buffer">Uploading please wait</p> :
                            this.state.error ? <p className="make-recipe-error">{this.state.error}</p> : ''}
                        <button
                            type="submit" 
                            name="submit"
                            disabled={!this.state.changed}
                            style={{opacity: (!this.state.changed ? '0.5' : '1')}}
                            className="make-recipe-submit">
                            Submit
                        </button>
                        <button 
                            type="button"
                            onClick={this.goBack}
                            className="make-recipe-back"
                            >
                            Cancel
                        </button>
                    </form>
                </section>   
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        error: state.error,
        recipes : state.recipes
    }
}

const mapDispathToProps = () =>{
    return {
        addRecipes,
        setError,
    }
}

export default connect(mapStateToProps, mapDispathToProps())(MakeRecipe);