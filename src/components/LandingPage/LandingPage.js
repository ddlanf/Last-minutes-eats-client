import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {

    render() {
        return (
            <>
                <section className="landing-page-hero">
                    <Link to="/view-all-recipes">Click Here to get started</Link>
                </section>

                <section className="landing-page-heading first">
                    <h1 className="landing-page-heading-text">
                        Woke up late to work in the morning or feeling lazy to prepare a whole meal?
                        <span className="landing-page-break">
                            Last minute eats have the perfect recipes for you
                        </span>
                    </h1>
                </section>

                <section className="landing-page-heading second"> 
                    <h1>Your time is valuable. That's why we make our recipes less than 15 minutes to prepare.</h1>
                    <div className="landing-page-heading-small-text">
                        Average Americnans spend 2 hours a day preparing meals. 
                        <span className="landing-page-break">
                            That's 30 days a year spent on cooking alone!
                        </span>
                        <span className="landing-page-break">
                            Our recipes less than 5 ingredient and fewer than 7 short steps to have your stomach filled
                        </span>
                    </div>
                </section>

                <section className="landing-page-my-info">
                    <p className="landing-page-my-name">Created by Daniel Laufenberg.</p>
                    <p className="landing-page-links">Github : LinkedIn</p>
                    <p className="landing-page-copy">Copyright © 2020</p> 
                    <p className="landing-page-rights-reserved">All Rights Reserved</p>
                </section>
            </>
        )
    }
}
