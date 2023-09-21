import {useState} from 'react'

import validator from 'validator'
import axios from 'axios'
import sweetalert from 'sweetalert'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const {dispatchFn, userStateObj, toggleUserLoggedInCb} = props


    // client-side validation
    const runValidations = () => {
        if(email.trim().length === 0)
        {
            errors.email = 'email is mandatory'
        }
        else if(!validator.isEmail(email))
        {
            errors.email = 'invalid email format'
        }

        if(password.trim().length === 0)
        {
            errors.password = 'password is mandatory'
        }
    }



    // EHF - form i/p fields: email, password
    const handleChange = (e) => {
        if(e.target.name === 'email')
        {
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password')
        {
            setPassword(e.target.value)
        }
    }



    // EHF - 'submit' or 'login' button
    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) // => no errors, create userFormObj, make API call
        {
            const userFormObj = {
                email: email,
                password: password
            }

            const userLoginFn = async () => {
                try{
                    const userLoginResp = await axios.post('http://localhost:3050/api/users/login', userFormObj)
                    console.log('userLoginResp.data', userLoginResp.data)

                    const token = userLoginResp.data.token

                    localStorage.setItem('token', token)

                    dispatchFn({
                        type: 'LOGIN_RESET_SERVER_ERRORS' // reset it to '' empty string
                    })

                    // passing object to sweetalert
                    sweetalert({
                        title: 'successfully logged-in',
                        icon: 'success'
                    })

                    props.history.push('/') // re-direct to Home component
                    toggleUserLoggedInCb() // sets userLoggedIn state variable in App to true
                }
                catch(e){
                    console.log('error in user login -> Login component', e)
                    dispatchFn({
                        type: 'LOGIN_ERROR_FROM_DB',
                        payload: e.response.data.errors // is a string
                    })
                }
            }

            userLoginFn()
        }
        else // => has errors
        {
            setFormErrors(errors)
        }
    }


    return (
        <div>
            <h1> Login </h1>

            <form onSubmit={handleSubmit}>
                <label> Email </label>
                <input type="text" value={email} onChange={handleChange} name="email" /> 
                { // cr
                    formErrors.email && <span> {formErrors.email} </span>
                }
                <br />

                <label> Password </label>
                <input type="text" value={password} onChange={handleChange} name="password" /> 
                { // cr
                    formErrors.password && <span> {formErrors.password} </span>
                }
                <br />

                { //cr ->
                    userStateObj.serverErrors && <p> {userStateObj.serverErrors} </p>
                }

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login