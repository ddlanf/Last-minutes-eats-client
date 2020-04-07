import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RatingApiService from '../../../services/ratings-api-service'
import TokenService from '../../../services/token-service'
import './StarRating.css'

export default class StarRating extends Component {

    
    constructor(props){
       
       super(props)
       const { recipeId } = this.props
       const ratingToken = TokenService.getRatingToken(recipeId)

       this.state = {
            stars: !!ratingToken ?  this.returnStarArray(parseInt(ratingToken)) : [false, false, false, false, false],
            disabled: !!ratingToken
        }
    }

    returnStarArray = (rating) =>{
        
        const newState = []

        for(let i = 1; i < 6; i++){
            if(rating >= i){ newState.push(true) }
            else{ newState.push(false) }
        }

        return newState
    }

    showSolid = (index) =>{
        if(!this.state.disabled){
            const newState = this.state.stars
            for(let i = 0; i < index + 1; i++){
                newState[i] = true
            }
            
            this.setState({ stars : newState })
        }
    }

    showRegular = (index) =>{
        if(!this.state.disabled){
            const newState = []

            for(let i = 0; i < 5; i++){
                if(index => i){ newState[i] = false }
            }
            this.setState({ stars : newState })
        }
    }

    submitRating = (rating) =>{
        
        if(!this.state.disabled){
            const newRating = { rating }
            const newState = this.state.stars
            for(let i = 0; i < rating; i++){
                newState[i] = true
            }
            this.setState({ stars : newState, disabled: true })
            
            const { recipeId } = this.props

            RatingApiService.postRating(newRating, recipeId)
            .then(newRating => { 
                TokenService.saveRatingToken(recipeId, newRating.rating) 
            })
            .catch(res =>{ this.setState({ error: res.error})})
        }
    }

    renderStarRating(){
        return [1,2,3,4,5].map((num, index)=>{
            return (
                <div 
                    key={num} 
                    className="star-rating">
                     <FontAwesomeIcon  
                        style={{display : (!this.state.stars[index]) ? "inline" : 'none'}} 
                        onMouseEnter={() => this.showSolid(index)} className="view-recipe-star" 
                        icon={['far', 'star']}/>
                    <FontAwesomeIcon  
                        onClick={()=> this.submitRating(num)} 
                        style={{display : (this.state.stars[index]) ? "inline" : 'none'}} 
                        onMouseLeave={() => this.showRegular(num)} 
                        className="view-recipe-star" 
                        icon={['fas', 'star']}/>
                </div>
            )
        })
    }

    render() {
        return (
            <>
              <label className="view-recipe-rate">
                    {!this.disabled ? "Your rating" : "Rate this recipe"}
              </label>
              <span className="view-recipe-stars">
                    {this.renderStarRating()}
              </span>
            </>
        )
    }
}
