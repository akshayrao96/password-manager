import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBar from './NavBar';


function Contact() {
    return (
        <div>
            <NavBar/>
            <body>
                <div class="content">
                    <section>
                        <div class="container">
                            <h2 class="text-center">Reach out and say Hello!</h2>
                            <div class="split">
                                <div class="left-description">
                                    <h2>How you can get in touch with us.</h2>
                                    <a href=""><i class="fas fa-envelope"></i>Email</a>
                                    <a href=""><i class="fab fa-github"></i>Github</a>
                                    <a href=""><i class="fab fa-linkedin"></i>Linkedin</a>
                                </div>
                                <div class="image-description">
                                    <img src="./assets/collaboration.jpg" alt="people collaborating"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </body>
        </div>
        
    )   
}

export default Contact;