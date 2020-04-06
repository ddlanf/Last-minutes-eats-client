import React, { Component } from 'react'
import './MakeRecipe.css'

export default class MakeRecipe extends Component {

    constructor(props){
        super(props)
        this.state = {
            recipe_name: '',
            Image:'',
            preparation_time: null,
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
            ]
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
             [name] : value 
        })

    }

    handleArrayInputChange = (event, input, index) =>{
        const currentInputs = this.state[input]
        currentInputs[index].value = event.target.value
        
        this.setState({
            input: currentInputs
        })
    }   

    handleSelectChange = (event) =>{
        this.setState({ preparation_time_unit : event.value});
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
                    <input 
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

        const { recipe_name, image, preparation_time, preparation_time_unit } = this.state
        const ingredients = this.state.ingredients.filter(item => item.display).map(item => item.value)
        console.log(ingredients)
    }

    render() {
        return (
            <>
                <section className="make-recipe">
                    <h1 className="make-recipe-heading">Make Your Recipe</h1>
                    <form className="make-recipe-form"
                        onSubmit={(e) => this.postRecipe(e)}
                        >
                        <label className="make-recipe-label">Recipe Name</label>
                        <input 
                            className="make-recipe-input" 
                            type="text"
                            name="recipe_name"
                            onChange={this.handleInputChange}/>
                        <label className="make-recipe-label">Recipe Image Link</label>
                        <input 
                            className="make-recipe-input" 
                            type="text"
                            onChange={this.handleInputChange}/>
                        <div className="make-recipe-ingredients-and-steps">
                                <div className="make-recipe-ingredients-input">
                                    <label className="make-recipe-label">Ingredients</label> 
                                    {this.makeIngredientslist()}
                                </div>
                                <div className="make-recipe-instructions-input">
                                    <label className="make-recipe-label">Instructions</label>
                                    {this.makeInstructionlists()}
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
                        <button
                            type="submit" 
                            className="make-recipe-submit">
                            Submit
                        </button>
                        <button 
                            type="button"
                            onClick={this.goBack}
                            className="edit-recipe-submit"
                            >
                            Back
                        </button>
                    </form>
                </section>   
            </>
        )
    }
}
