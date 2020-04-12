import React, { Component } from 'react'
import RecipesApiService from '../../services/recipes-api-service'
import RecipeContext from '../../contexts/RecipeContext'
import { withRouter} from 'react-router-dom'
import EditRecipeGate from './EditRecipeGate/EditRecipeGate'
import './EditRecipe.css'

class EditRecipe extends Component {

    _isMounted = false;

    static contextType = RecipeContext

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
            changed: false,
            token: '',
            error : '',
            buffer: false
        }
    }

    goBack = () =>{
        const { recipeId } = this.props.match.params;
        this.props.history.push(`/view-recipe/${recipeId}`)
    }

    handleInputChange = (event) =>{

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

    editIngredientslist(){
        const ingredientsInput = [1,2,3,4,5].map((num, index)=>{
            return( 
                <div 
                    key={num} 
                    style={{display: this.state.ingredients[index].display ? 'block' : 'none' }}
                    className="edit-recipe-button-and-text">
                    {(index !== 4) ?
                        <button 
                            type="button"
                            style={{display: 
                                this.state.ingredients[index + 1].display ? 'none' :  'block'}}
                            onClick={() => this.addAnother('ingredients', index)}
                            className="edit-recipe-plus">
                            +
                        </button>
                        : ''}
                    <input 
                        className="edit-recipe-variable-input" 
                        type="text"
                        name="ingredient-1"
                        defaultValue={this.state.ingredients[index].value}
                        onChange={(e) => this.handleArrayInputChange(e, 'ingredients', index)}/>
                     {(index !== 0) ?
                        <button 
                            type="button"
                            style={{display: (index === 4) ? 'block' : this.state.ingredients[index + 1].display  
                                ? 'none' :  'block'}}
                            onClick={() => this.deleteOne('ingredients', index)}
                            className="edit-recipe-minus">
                            -
                        </button>
                        : ''}
                </div>
            )                          
        })

        return ingredientsInput
    }

    editInstructionlists(){
         const stepsInput = [1,2,3,4,5,6,7].map((num, index)=>{
             return (
                <div 
                    key={num} 
                    style={{display: this.state.steps[index].display ? 'block' : 'none' }}
                    className="edit-recipe-button-and-text steps">
                     <span className="edit-recipe-number">{num}</span>
                     {(index !== 6) ?
                        <button 
                            type="button"
                            style={{display: 
                                this.state.steps[index + 1].display ? 'none' :  'block'}}
                            onClick={() => this.addAnother('steps', index)}
                            className="edit-recipe-plus">
                            +
                        </button>
                        : ''}
                    <textarea 
                        className="edit-recipe-variable-input" 
                        type="text"
                        name={`step-${num}`}
                        defaultValue={this.state.steps[index].value}
                        onChange={(e) => this.handleArrayInputChange(e, 'steps', index)}/>
                     {(index !== 0) ?
                        <button 
                            type="button"
                            style={{display: (index === 6) ? 'block' : this.state.steps[index + 1].display  
                                ? 'none' :  'block'}}
                            onClick={() => this.deleteOne('steps', index)}
                            className="edit-recipe-minus">
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
            input: currentInputs, changed: true
        })
    }

    setToken = (token) => {
        this.setState({ token })
    }
    

    editRecipe = (e) =>{
        e.preventDefault()

        let validRecipe = true
        const { recipe_name, image, preparation_time, preparation_time_unit, token} = this.state
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

        newRecipe.ingredients = ingredients
        newRecipe.steps = steps

        const { recipeId } = this.props.match.params;

        if(validRecipe){
           this.setState({ buffer : true })
           RecipesApiService.editRecipe(recipeId, newRecipe, token)
                .then(() =>{
                    RecipesApiService.getRecipes()
                        .then(recipes => { 
                            this.context.setRecipes(recipes)
                            this.props.history.push('/view-all-recipes')
                        })
                        .catch(res=>{ this.context.setError(res.error)})
                })
                .catch((res) => {
                        this.setState({ error: res.error, buffer: false })
                })
        }
        else{
            this.setState({ buffer : false })
        }
    }

    componentDidMount(){

        this._isMounted = true;

        const { recipeId } = this.props.match.params;

        RecipesApiService.getRecipe(recipeId)
            .then(recipe =>{
                const { recipe_name, image, preparation_time, preparation_time_unit } = recipe

                const ingredients = []
                for(let i = 0; i < 5; i++){
                    if(recipe.ingredients[i]){
                        ingredients.push({ value: recipe.ingredients[i], display: true })
                    }
                    else{ ingredients.push({ value: '', display: false })   }
                }
                const steps = []
                for(let i = 0; i < 7; i++){
                    if(recipe.steps[i]){
                        steps.push({ value: recipe.steps[i], display: true })
                    }
                    else{ steps.push({ value: '', display: false })   }  
                }

                const defaultRecipe = {
                    recipe_name, image, 
                    preparation_time, preparation_time_unit,
                    ingredients, steps
                }
               this.setState({ ...defaultRecipe })
            })
            .catch(res => {this.context.setError(res.error)})
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { recipeId } = this.props.match.params;

        return (
            <>
                <EditRecipeGate
                    token={this.state.token}
                    setToken={this.setToken}
                    recipeId={recipeId}
                />
                <section className="edit-recipe">
                    <h1 className="edit-recipe-heading">Edit This Recipe</h1>
                    <form className="edit-recipe-form"
                        onSubmit={(e) => this.editRecipe(e)}
                        >
                        <div className="edit-recipe-top-field">
                            <div className="edit-recipe-name-field">
                                <label className="edit-recipe-label">Recipe Name</label>
                                <input 
                                    className="edit-recipe-input" 
                                    type="text"
                                    name="recipe_name"
                                    defaultValue={this.state.recipe_name}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="edit-recipe-image-field">
                                <label className="edit-recipe-label">Recipe Image Link</label>
                                <input 
                                    className="edit-recipe-input" 
                                    type="text"
                                    name="image"
                                    defaultValue={this.state.image}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="edit-recipe-ingredients-and-instructions">
                                <div className="edit-recipe-instructions-field">
                                    <label className="edit-recipe-label">Instructions</label>
                                    <div className="edit-recipe-instructions-input-box">
                                        {this.editInstructionlists()}
                                    </div>
                                </div>
                                <div className="edit-recipe-ingredients-field">
                                    <label className="edit-recipe-label">Ingredients</label> 
                                    <div className="edit-recipe-ingredients-input-box">  
                                        {this.editIngredientslist()}
                                    </div>
                                </div>
                        </div>
                        <label className="edit-recipe-preparation-time-label" >Preparation Time</label>
                        <div className="edit-recipe-preparation-time-box">
                            <input
                                className="edit-recipe-preparation-time-input" 
                                type="number"
                                name="preparation_time"
                                defaultValue={this.state.preparation_time}
                                onChange={this.handleInputChange}
                            />
                            <select 
                                className="edit-recipe-preparation-time-unit-input" 
                                value={this.state.preparation_time_unit} onChange={(e) => this.handleSelectChange(e.target)}>
                                <option value="seconds">sec</option>
                                <option value="minutes">min</option>
                            </select>
                        </div>
                        {this.state.buffer ? <p className="edit-recipe-buffer">Uploading please wait</p> :
                            this.state.error ? <p className="edit-recipe-error">{this.state.error}</p> : ''}
                        <button
                            type="submit" 
                            name="submit"
                            disabled={!this.state.changed}
                            style={{opacity: (!this.state.changed ? '0.5' : '1')}}
                            className="edit-recipe-submit">
                            Submit
                        </button>
                        <button 
                            type="button"
                            onClick={this.goBack}
                            className="edit-recipe-back"
                            >
                            Cancel
                        </button>
                    </form>
                </section>   
            </>
        )
    }
}


export default withRouter(EditRecipe)