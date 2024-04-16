import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBar from './NavBar';

function MainPage() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const handleLoginClick = () => {
        setIsLoginVisible(true);
    };

    const handleRegisterClick = () => {
        setIsLoginVisible(false);
    };

    return (
        <div>
            <NavBar/>
            <body>
                <div class="content">
                    <section>
                        <div class="container">
                            <h2 class="text-center">All Your Passwords Secure</h2>
                            <div class="form-box">
                            {isLoginVisible ? (

                                <div class="login-container" id="login">
                                    <div class="top">
                                        <span>Don't have an Account?<button1 onClick={handleRegisterClick}>Sign Up</button1></span>
                                        <div class="signHead">Login</div>
                                    </div>
                                    <div class="input-box">
                                        <input type="text" class="input-field" placeholder="Email"/>
                                    </div>
                                    <div class="input-box">
                                        <input type="password" class="input-field" placeholder="Password"/>
                                    </div>
                                    <div class="input-box">
                                        <input type="submit" class="submit" value="Sign In"/>
                                    </div>
                                </div>
                            ) : (
                                
                
                                <div class="register-container" id="register">
                                    <div class="top">
                                    <span>Have an Account?<button1 onClick={handleLoginClick}>Login</button1></span>
                                        <div class="signHead">Sign Up</div>
                                    </div>
                                    <div class="two-forms">
                                        <div class="input-box">
                                            <input type="text" class="input-field" placeholder="Firstname"/>
                                        </div>
                                        <div class="input-box">
                                            <input type="text" class="input-field" placeholder="Lastname"/>
                                        </div>
                                    </div>
                                    <div class="input-box">
                                        <input type="text" class="input-field" placeholder="Email"/>
                                    </div>
                                    <div class="input-box">
                                        <input type="password" class="input-field" placeholder=""/>
                                    </div>
                                    <div class="input-box">
                                        <input type="submit" class="submit" value="Register"/>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </section>
                </div>   
            </body>
        </div>
    )   
}
    
    

export default MainPage;


