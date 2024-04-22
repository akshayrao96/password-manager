import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './MainPage.css'
import NavBar from './NavBar';

function MainPage() {
    const navigate = useNavigate();

    // Log in States
    const [usernameLogInState, setUsernameLogInState] = useState('');
    const [passwordLogInState, setPasswordLogInState] = useState('');
    const [errorMsgLogInState, setErrorMsgLogInState] = useState('');

    // Register States
    const [firstNameRegisterState, setFirstNameRegisterState] = useState('');
    const [lastNameRegisterState, setLastNameRegisterState] = useState('');

    const [usernameRegisterState, setUsernameRegisterState] = useState('');
    const [passwordRegisterState, setPasswordRegisterState] = useState('');
    const [verifyPasswordState, setVerifyPasswordState] = useState('');
    const [errorMsgRegisterState, setErrorRegisterMsgState] = useState('');

    // Form States
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    async function onSubmitLogIn() {
        setErrorMsgLogInState('');
        setErrorRegisterMsgState('')
        try {
          await axios.post('/api/users/login', {
            Username: usernameLogInState,
            Password: passwordLogInState,
          });
  
          navigate('/passwordManager');
        } catch (error) {
            setErrorMsgLogInState(error.response.data);
        }
      }

    function updatePasswordLogIn(event) {
        setPasswordLogInState(event.target.value);
    }
  
    function updateUsernameLogIn(event) {
        setUsernameLogInState(event.target.value);
    }

    async function onSubmitRegister() {
        setErrorMsgLogInState('');
        setErrorRegisterMsgState('')
        // verify password
        if(verifyPasswordState !== passwordRegisterState) {
            setErrorRegisterMsgState('Please verify passwords are the same :D');
          return;
        }

  
        try {
          await axios.post('/api/users/register', {
            // Not sure if we need states for the first and last name
            FirstName: firstNameRegisterState,
            LastName: lastNameRegisterState,
            Username: usernameRegisterState,
            Password: passwordRegisterState,
          });

          setFirstNameRegisterState('');
          setLastNameRegisterState('');
          setPasswordRegisterState('');
          setUsernameRegisterState('');
          setVerifyPasswordState('');

          navigate('/passwordManager');
        } catch (error) {
            setErrorRegisterMsgState(error.response.data);
        }
    }

    function updateFirstNameRegister(event) {
        setFirstNameRegisterState(event.target.value);
    }

    function updateLastNameRegister(event) {
        setLastNameRegisterState(event.target.value);
    }

    function updatePasswordRegister(event) {
        setPasswordRegisterState(event.target.value);
    }

    function updateVerifyPasswordRegister(event) {
        setVerifyPasswordState(event.target.value);
    }
  
    function updateUsernameRegister(event) {
        setUsernameRegisterState(event.target.value);
    }

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
                            {errorMsgRegisterState && <h1> {errorMsgRegisterState} </h1>}
                            {errorMsgLogInState && <h1> {errorMsgLogInState} </h1>}
                            
                            <div class="form-box">
                            {isLoginVisible ? (

                                <div class="login-container" id="login">
                                    <div class="top">
                                        <span>Don't have an Account?<button1 onClick={handleRegisterClick}>Sign Up</button1></span>
                                        <div class="signHead">Login</div>
                                    </div>
                                    <div class="input-box">
                                        <input type="text" class="input-field" placeholder="Username" value={usernameLogInState} onInput={(event) => updateUsernameLogIn(event)}/>
                                    </div>
                                    <div class="input-box">
                                        <input type="password" class="input-field" placeholder="Password" value={passwordLogInState} onInput={(event) => updatePasswordLogIn(event)}/>
                                    </div>
                                    <div class="input-box">
                                        <button class="submit" onClick={() => onSubmitLogIn()}>Sign In</button>
                                        {/* <input type="submit" class="submit" value="Sign In"/> */}
                                    </div>
                                </div>
                            ) : (
                                
                
                                <div class="register-container" id="register">
                                    <div class="top">
                                    <span>Have an Account?<button1 onClick={handleLoginClick}>Login</button1></span>
                                        <div class="signHead">Sign Up</div>
                                    </div>
                                    <div class="two-forms">
                                        <div class="input-box-user-pass">
                                            <input type="text" class="input-field" placeholder="Firstname" value={firstNameRegisterState} onInput={(event) => updateFirstNameRegister(event)}/>
                                        </div>
                                        <div class="input-box-user-pass">
                                            <input type="text" class="input-field" placeholder="Lastname" value={lastNameRegisterState} onInput={(event) => updateLastNameRegister(event)}/>
                                        </div>
                                    </div>
                                    <div class="input-box">
                                        <input type="text" class="input-field" placeholder="Username" value={usernameRegisterState} onInput={(event) => updateUsernameRegister(event)}/>
                                    </div>
                                    <div>
                                        <input type="password" class="input-field" placeholder="Password" value={passwordRegisterState} onInput={(event) => updatePasswordRegister(event)}/>
                                    </div>
                                    <div class="input-box">
                                        <input type="password" class="input-field" placeholder="Verify Password" value={verifyPasswordState} onInput={(event) => updateVerifyPasswordRegister(event)}/>
                                    </div>
                                    {/* i did not add the verify part not sure if we need that */}
                                    <div class="input-box">
                                        {/* <input type="submit" class="submit" value="Register"/> */}
                                        <button class="submit" onClick={() => onSubmitRegister()}>Register</button>
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


