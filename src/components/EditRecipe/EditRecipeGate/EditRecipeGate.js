import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RecipeTokenApiService from '../../../services/recipe-token-api-service'
import './EditRecipeGate.css'
export default class EditRecipeGate extends Component {

    state  = {
        error: '',
        changed: false,
        tokenAccepted: false,
        token: ''
    }

    handleInputChange = (event) =>{
        const { name } = event.target
        const { value } = event.target
        
        this.setState({
            [name] : value,
            changed : true,
        })
    }

    submitToken = (e) =>{
      e.preventDefault()

      RecipeTokenApiService.checkRecipeToken(this.state.token, this.props.recipeId)
            .then(res =>{
                this.props.setToken(this.state.token)
                this.setState({ tokenAccepted : true })
            })
            .catch(res =>{
                this.setState({ error: res.error })
            })
    }
    
    render() {
        return (
            <section className="edit-recipe-gate">
                    <form
                        onSubmit={(e) => this.submitToken(e)}
                        className={`edit-recipe-gate-form ${this.state.tokenAccepted ? 'slide-up':''}`}>
                        <label className="edit-recipe-gate-label">
                            Enter token to edit this recipe
                        </label>
                        <input 
                            type="password"
                            name="token"
                            onChange={this.handleInputChange}
                            className="edit-recipe-gate-input"/>
                        {this.state.error  ? <p className="edit-recipe-gate-error">{this.state.error}</p> : ''}
                        <button
                            disabled={!this.state.changed}
                            type="submit"
                            className="edit-recipe-gate-submit"
                            >
                            Submit
                        </button>
                        <Link
                            to={`/view-recipe/${this.props.recipeId}`}
                            className="edit-recipe-gate-back"
                            >
                            Back
                        </Link>
                    </form>
             </section>
        )
    }
}
