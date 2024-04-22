import axios from 'axios'
import { useEffect, useState } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router'


function NavBarLoggedIn(props) {

    const yourName = props.yourName;

    const navigate = useNavigate();

    async function logOut() {
        const response = await axios.post('/api/users/logout')
        navigate('/') 
    }

    return(
        <header>
            <h1 class="logo"></h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle" />
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <label for="nav-toggle" class="nav-toggle-label">
                    <span></span>
                </label>
                <div class="signIn">
                    <div id="user-settings" ><u><strong>{yourName}'s Account</strong></u></div>
                    <button id="logOut-button" onClick={logOut}>Log Out</button>
                </div>
        </header>
    )
}

export default NavBarLoggedIn;