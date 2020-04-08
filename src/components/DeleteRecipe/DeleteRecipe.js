import React, { Component } from 'react'
import { Link, withRouter} from 'react-router-dom' 
import './DeleteRecipe.css'
import RecipesApiService from '../../services/recipes-api-service'

class DeleteRecipe extends Component {

    constructor(props){
        super(props);
        this.state = { 
            token: '',
            submitted: false,
            error: ''
        }
    }

    handleInputChange = (event) =>{
        const { name } = event.target
        const { value } = event.target
        
        this.setState({
            [name] : value
        })
    }

    deleteRecipe = (ev) =>{
        ev.preventDefault()

        const { recipeId } = this.props.match.params;
        const { token } = this.state

        if(!token){
            this.setState({ error: 'Please enter token'})
        }
 
        else{
          RecipesApiService.deleteRecipe(recipeId, token)
            .then(res =>{
                this.setState({ submitted: true})
            })
            .catch((res)=>{ this.setState({ error: res.error })})
        }
    }

    render() {

        const { recipeId } = this.props.match.params;

        return (
            <form
                onSubmit={this.deleteRecipe}
                className="delete-recipe-form">
                <label className="delete-recipe-label">
                    Enter token to delete this recipe
                </label>
                <input 
                    type="password"
                    name="token"
                    onChange={this.handleInputChange}
                    className="delete-recipe-input"/>
                {!this.state.submitted ? (this.state.error  ? <p className="delete-recipe-error">{this.state.error}</p> : '') : ''}
                {this.state.submitted ? 
                <p className="delete-recipe-submitted">
                    Recipe deleted
                </p> : ''}
                <button
                    disabled={this.state.submitted}
                    type="submit"
                    className="delete-recipe-submit"
                    >
                    Submit
                </button>
                {this.state.submitted ?
                    <Link
                        to={`/view-all-recipes`}
                        className="delete-recipe-link"
                        >
                        Back
                    </Link>
                    :
                    <Link
                        to={`/view-recipe/${recipeId}`}
                        className="delete-recipe-link"
                        >
                        Back
                    </Link>}
            </form>
        )
    }
}

export default withRouter(DeleteRecipe)