import {useState, useEffect} from 'react'

import NavBar from './components/NavBar'


const App = () => {
    const [userLoggedIn, setUserloggedIn] = useState(false) 

    const toggleUserLoggedInCb = () => {
        setUserloggedIn(!userLoggedIn)
    }

    useEffect(() => {
        if(localStorage.getItem('token')) // => token is present in ls i.e, user is logged-in
        {
            toggleUserLoggedInCb() // setting userLoggedIn = true
        }
    }, [])

    return (
      <div>
          <h1> e-learning platform </h1>
          <NavBar userLoggedIn={userLoggedIn} toggleUserLoggedInCb={toggleUserLoggedInCb} />
      </div>
    )
}

export default App
