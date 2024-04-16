import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import NavBar from './NavBar';


function LoggedIn() {
    // Want to be able to get a whole empty list at the beginning
    const [passwordList, setPasswordList] = useState([]);

    // want to be able to insert password URL and passwords
    // we start with an empty state first 
    const [passwordURL, setPasswordURL] = useState('');
    const [passwordPassword, setPasswordPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editing, setEditing] = useState({
        isEditing: false,
        originalPasswordURL: '',
        originalPasswordPassword: ''
    });

    // This function talks to the backend to retrieve this
    async function getAllPassword() {
        const response = await axios.get('/api/passwordManager/');
        setPasswordList(response.data);
    }

    // Talks to the backend to delete this password
    async function deletePassword(password) {
        await axios.delete('/api/passwordManager/' + password);
        await getAllPassword();
    }

    // We want to insert a new URL and password
    async function insertPassword() {
        setErrorMessage('')
        try {
            if (editing.isEditing) {
                await axios.put('/api/passwordManager/' + editing.originalPasswordURL, {
                    URL: passwordURL,
                    Password: passwordPassword,
                });
            } else {
                await axios.post('/api/passwordManager/', {
                    URL: passwordURL,
                    Password: passwordPassword,
                });
            }
            // This is so the fields get cleared out
            setPasswordURL('');
            setPasswordPassword('');
            setEditing({
                isEditing: false,
                originalPasswordURL: '',
                originalPasswordPassword: ''
            });
            await getAllPassword();
        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    function updatePasswordURL(event) {
        setPasswordURL(event.target.value);
    }

    function updatePasswordPassword(event) {
        setPasswordPassword(event.target.value);
    }

    function setEditingPassword(passwordURL, passwordPassword) {
        setPasswordURL(passwordURL);
        setPasswordPassword(passwordPassword);
        setEditing({
          isEditing: true, 
          originalPasswordURL: passwordURL,
          originalPasswordPassword: passwordPassword,
    });
    }

    function onCancel() {
        setPasswordURL('');
        setPasswordPassword('');
        setEditing({
          isEditing: false, 
          originalPasswordURL: '',
          originalPasswordPassword: '',
    });
    }

    function onStart() {
        getAllPassword();
    }

    // This allows the passwords to be shown when page is mounted
    useEffect(onStart, [])

    // When you first start the program, it is important to print it out
    // for the screen, this will do it here
    const passwordListElement= [];
    for(let i = 0; i < passwordList.length; i++) {
        passwordListElement.push(<li>URL: {passwordList[i].URL} 
        - Password: {passwordList[i].Password}
        - <button onClick={() => deletePassword(passwordList[i].URL)}>Delete</button>
        {/* first we create a button -> Somehow we want the edit button to be able to change the URL and the password
        We need to somehow allow the change of state */}
        - <button onClick={() => setEditingPassword(passwordList[i].URL, passwordList[i].Password)}>Edit</button>
        </li>)

    } 

    let inputFieldTitleText;
    if (editing.isEditing) {
        inputFieldTitleText = "Edit Password";
    } else {
        inputFieldTitleText = "Add New Password";
    }

    let submitButton;
    if (editing.isEditing) {
        submitButton = "Save Edits";
    } else {
        submitButton = "Add New Password";
    }
    // {errorMessage && <h1>{errorMessage}</h1>}
    let errorComponent;
    if (errorMessage) {
        errorComponent = <h1>{errorMessage}</h1>
    }
    return(
        <div>
            <NavBar/>
            <body>
                <div className="content">
                    <section>
                        <div className="container">
                            <h2 className="text-center">Your Passwords</h2>
                                <div className="management-box">
                                    {/* I dont understand this specific line of code - why need && */}
                                    {errorComponent}

                                    <ul>
                                        {passwordListElement}
                                    </ul>
                                    <div>{inputFieldTitleText}</div>
                                    {/* <div>Add New Password</div> */}
                                    <div>
                                        <div>
                                            <label>URL:</label> <input value={passwordURL} onInput={(event) => updatePasswordURL(event)}/>
                                        </div>
                                        <div>
                                            <label>Password:</label> <input value={passwordPassword} onInput={(event) => updatePasswordPassword(event)}/>
                                        </div>
                                        <div>
                                            <button onClick={() => insertPassword()}>{submitButton}</button>
                                            <button onClick={() => onCancel()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>          
                        </div>
                    </section>
                </div>
            </body>
        </div>
    )
}

export default LoggedIn;


{/* {errorMsgState && <h1> {errorMsgState} </h1>} */}
                                                    {/* <ul>
                                                        {pokemonListElement}
                                                    </ul> */}
                                                    {/* <div>Add new Password</div>
                                                        <div>
                                                            <div>
                                                                <label>Name:</label> <input value={pokemonNameState} onInput={(event) => updatePokemonName(event)}/>
                                                            </div>
                                                            <div>
                                                                <label>Color:</label> <input value={pokemonColorState} onInput={(event) => updatePokemonColor(event)}/>
                                                            </div>
                                                            <div>
                                                                <button onClick={() => insertPokemon()}>Add Password</button>
                                                            </div>
                                                            <ul>
                                                            {pokemonListElement}
                                                            </ul>
                                                        </div>
                                                    </div> */}