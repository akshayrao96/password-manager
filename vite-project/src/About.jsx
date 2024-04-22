import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBar from './NavBar';
import Collab from "./assets/collaboration.jpg"


function About() {
    return(
        <div>
            <NavBar/>
                <body>
                    <div class="content">
                        <section>
                            <div class="container">
                                <h2 class="text-center">What We're All About!</h2>
                                <div class="split">
                                    <div class="left-description">
                                        <h4>THE PERSONAL PASSWORD MANAGER</h4>
                                        <h2>Secure your business by securing your passwords.</h2>
                                        <p>Take the guesswork out of password management, and secret sharing
                                            so that you can keep your teammates safe and your business moving.
                                        </p>
                                        <button id="try-button">Try it free!</button>
                                    </div>
                                    <div class="image-description">
                                        <img src= {Collab} alt="people collaborating"/>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </body>
        </div>
    )
}

export default About;