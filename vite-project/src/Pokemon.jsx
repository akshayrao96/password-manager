import axios from 'axios'
import { useEffect, useState } from 'react'
import NavBar from './NavBar';

function PokemonPage() {
  const [passwordList, setPasswordList] = useState([]);
  const [pokemonListState, setPokemonListState] = useState([]);
  const [pokemonNameState, setPokemonNameState] = useState('');
  const [pokemonColorState, setPokemonColorState] = useState('');
  const [errorMsgState, setErrorMsgState] = useState('');


  // At the beginning we want to get all passwords
  async function getAllPokemon() {
    const response = await axios.get('/api/pokemon');
    setPokemonListState(response.data);
  }

  async function deletePokemon(pokemonName) {
    await axios.delete('/api/pokemon/' + pokemonName);
    await getAllPokemon();
  }

  async function insertPokemon() {
    setErrorMsgState('')
    try {
        await axios.post('/api/pokemon', {
            name: pokemonNameState,
            color: pokemonColorState,
        })
        setPokemonColorState('');
        setPokemonNameState('');
        await getAllPokemon();    
    } catch (error) {
        setErrorMsgState(error.response.data)
    }
  }

  function updatePokemonColor(event) {
    setPokemonColorState(event.target.value);
  }

  function updatePokemonName(event) {
    setPokemonNameState(event.target.value);
  }

  useEffect(function() {
    getAllPokemon();
  }, [])

  const pokemonListElement = [];
  for(let i = 0; i < pokemonListState.length; i++) {
    pokemonListElement.push(<li>Name: {pokemonListState[i].name} 
        - Color: {pokemonListState[i].color} 
        - <button onClick={() => deletePokemon(pokemonListState[i].name)}>Delete</button>
    </li>)
  }



  return (
    <div>
      <NavBar/>
      <body>
        <div className="content">
          <section>
            <div className="container">
              
              <h2 className="text-center">Your Passwords</h2>
              <div className="management-box">
              {errorMsgState && <h1>
                    {errorMsgState}
                  </h1>}
                  {/* <ul>
                    {pokemonListElement}
                  </ul> */}

                  <div>Add new Password</div>
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
                  </div>
            </div>
          </section>
        </div>
      </body>

                                      
    </div>
  )
}

export default PokemonPage;





