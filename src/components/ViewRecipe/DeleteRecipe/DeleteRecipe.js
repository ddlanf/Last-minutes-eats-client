import React, { Component } from 'react'
import { withRouter} from 'react-router-dom' 
import './DeleteRecipe.css'
import RecipesApiService from '../../../services/recipes-api-service'

class DeleteRecipe extends Component {

    constructor(props){
        super(props);
        this.state = { 
            token: '',
            submitted: false,
            error: '',
            back: false
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

    goBack = () =>{
        if(this.state.submitted){
            this.props.history.push('/view-all-recipes')
        }
        this.setState({ back: true })
    } 

    setDisplayProperty = () =>{
        if(this.state.back){ 
            this.props.toggleDeleteRecipe(false)
            this.setState({ back: false }) 
        }
    }

    render() {

        return (
            <form
                style={{ display: this.props.showDeleteRecipe ? 'block' : 'none'}}  
                onAnimationEnd={this.setDisplayProperty}
                onSubmit={this.deleteRecipe}
                className={`delete-recipe-form ${this.state.back ? 'slide-up' : ''}`}>
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
                <button
                    onClick={this.goBack}
                    type="button"
                    className="delete-recipe-back">                        
                    Back 
                </button>
            </form>
        )
    }
}

export default withRouter(DeleteRecipe)