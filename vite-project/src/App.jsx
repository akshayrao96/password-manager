import axios from 'axios'
import { useEffect, useState } from 'react'

// In this App.jsx, Hunter's main point was to show us how you can use React to do some API stuff
// this is mainly to show us how to do MA8 which is really easy
// one key note is that we should just be using Async and Await. Just know that it makes JS really run
// one function at a time.



function App() {

  const [usernameState, setUsernameState] = useState('')

  async function getRandomUsername() {
    console.log("Starting API call")
    const response = await axios.get('https://randomuser.me/api/')
    console.log(response)
    setUsernameState(response.data.results[0].name.first) 
    console.log("Ending API call")
  }

  useEffect(function() {
    console.log("App loaded")
    getRandomUsername();
    console.log("App finished loading")
  }, [])

  if(!usernameState) {
    return <div>
      Loading username...
    </div>
  }

  return (
    <div>
      Hello, World, {usernameState} !!!
    </div>
  )
}

export default App
