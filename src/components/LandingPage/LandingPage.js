import React, { Component } from 'react'
import Pizza from '../../images/pizza.jpg'
import Chicken from '../../images/chicken.jpg'
import Noodle from '../../images/noodle.png'
import Rice from '../../images/rice.jpg'
import Taco from '../../images/tacos.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LandingPage.css'

export default class LandingPage extends Component {

    state = {
        images : [true, false, false, false, false],
        showPortfolio: false
    }

    nextImage = (index) =>{

        const newState = this.state.images
        if(index !== 4){
            newState[index] = false
            newState[index + 1] = true
            this.setState({ images : newState})
        }
        else{
            newState[index] = false
            newState[0] = true
            this.setState({ images : newState})
        }
    }

    render() {
        return (
            <div className="landing-page">
                <div className="lading-page-top-sections">
                    <section className="landing-page-hero">
                        <img 
                            src={Pizza} 
                            alt="pizza" 
                            className="food-image"
                            onAnimationEnd={() => this.nextImage(0)}
                            style={{display: this.state.images[0] ? 'block' : 'none'}}/>
                        <img 
                            src={Chicken} 
                            alt="chicken"
                            className="food-image"
                            onAnimationEnd={() => this.nextImage(1)}
                            style={{display: this.state.images[1] ? 'block' : 'none'}}/>
                        <img 
                            src={Noodle} 
                            alt="noodle"
                            className="food-image"
                            onAnimationEnd={() => this.nextImage(2)}
                            style={{display: this.state.images[2] ? 'block' : 'none'}}/>
                        <img 
                            src={Rice} 
                            alt="rice"
                            className="food-image"
                            onAnimationEnd={() => this.nextImage(3)}
                            style={{display: this.state.images[3] ? 'block' : 'none'}}/>
                        <img 
                            src={Taco} 
                            alt="taco"
                            className="food-image"
                            onAnimationEnd={() => this.nextImage(4)}
                            style={{display: this.state.images[4] ? 'block' : 'none'}}/>
                    </section>

                    <div className="landing-page-headings">
                        <section className="landing-page-heading first">
                            <h1 className="landing-page-heading-text">
                                Woke up late to work in the morning or feeling lazy to prepare a whole meal?
                                <span className="landing-page-break">
                                    Last minute eats has the perfect recipes for you
                                </span>
                            </h1>
                        </section>

                        <section className="landing-page-heading second"> 
                            <h1 className="landing-page-heading-text">
                                Your time is valuable. 
                                <span className="landing-page-break">
                                    That's why all of our recipes take less than 15 minutes to prepare.
                                </span>
                            </h1>
                            <div className="landing-page-heading-small-text">
                                Average Americans spend 2 hours a day preparing meals. 
                                <span className="landing-page-break">
                                    That's 30 days a year spent on cooking alone!
                                </span>
                                <span className="landing-page-break">
                                    Our recipes has less than 5 ingredient and fewer than 7 short steps to have your stomach filled.
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
                    <section className="landing-page-my-info">
                        <div className="landing-page-my-name">
                            Created by Daniel Laufenberg
                        </div>
                        <div className="github-and-linkedIn-links-mobile">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ddlanf">
                                <FontAwesomeIcon  className="github" size="5x" icon={['fab', 'github']}/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/daniel-laufenberg/">
                                <FontAwesomeIcon  className="linkedIn"  size="5x" icon={['fab', 'linkedin']}/>
                            </a> 
                        </div>
                        <div className="github-and-linkedIn-links">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ddlanf">
                                <FontAwesomeIcon  className="github" size="8x" icon={['fab', 'github']}/>
                            </a>
                            <a target="_blank"rel="noopener noreferrer" href="https://www.linkedin.com/in/daniel-laufenberg/">
                                <FontAwesomeIcon  className="linkedIn"  size="8x" icon={['fab', 'linkedin']}/>
                            </a> 
                        </div>
                        <p className="portfolio">
                            <a 
                                className="portfolio-link"
                                href="https://ddlanf.github.io/Portfolio" 
                                target="_blank"rel="noopener noreferrer">
                                Portfolio
                            </a>
                        </p>
                        <p className="landing-page-copy">Copyright © 2020</p> 
                        <p className="landing-page-rights-reserved">All Rights Reserved</p>
                    </section>
            </div>
        )
    }
}
