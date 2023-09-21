import {useState, useReducer} from 'react'
import sweetalert from 'sweetalert'

import validator from 'validator'
import axios from 'axios'


// const reducerFn = (state, action) => {
//     switch(action.type)
//     {
//         case 'ADD_USER': {
//             return {...state, userObj: action.payload, isLoading: false}
//         }
//         case 'LOGIN_ERROR_FROM_DB': {
//             return {...state, serverErrors: action.payload} // action.payload is a string
//         }
//         default: {
//             return {...state}
//         }
//     }
// }

// component - Register
const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState()
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const {dispatchFn} = props

    // const initialState = {
    //     userObj: {},
    //     serverErrors: ''
    //     // isLoading: true // by default isLoading is true
    // }

    // const [userStateObj, dispatchFn] = useReducer(reducerFn, initialState)

    // EHF - form i/p field name, email, password, role
    const handleChange = (e) => {
        if(e.target.name === 'username')
        {
            setUsername(e.target.value)
        }
        else if(e.target.name === 'email')
        {
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password')
        {
            setPassword(e.target.value)
        }
        else if(e.target.name === 'role')
        {
            setRole(e.target.value)
        }
    }


    // client side validation
    const runValidations = () => {
        if(username.trim().length === 0)
        {
            errors.username = 'username is mandatory'
        }
        if(email.trim().length === 0)
        {
            errors.email = 'email is mandatory'
        }
        else if(!validator.isEmail(email)) // !false => true
        {
            errors.email = 'invalid email format'
        }

        if(password.trim().length === 0)
        {
            errors.password = 'password is mandatory'
        }
        else if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))
        {
            errors.password = 'invalid password. Password should be of atleast 8 characters, containing one lowercase, one uppercase, one number, one symbol'
        }
    }

    // console.log('errors', errors)


    // EHF - 'submit' or 'Register' change
    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) // => no errors, so insert userObj into db
        {
            const formUserObj = {
                username: username,
                email: email,
                password: password,
                role: role
            }
            console.log('formUserObj', formUserObj)

            // make API call to insert user into db
            axios.post('http://localhost:3050/api/users/register', formUserObj)
                .then((insertedUserObjFromDBResponse) => {
                    console.log('insertedUserObjFromDBResponse', insertedUserObjFromDBResponse) // response from db is bit slow
                    dispatchFn({
                        type: 'ADD_USER',
                        payload: insertedUserObjFromDBResponse.data
                    })

                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setRole('')
                    setFormErrors({})

                    sweetalert({
                        title: 'successfully registered the user',
                        icon: 'success'
                    })
                    props.history.push('/users/login')
                })
                .catch((err) => {
                    console.log('error in inserting user record into db', err.message)
                })
        }
        else // => has errors, so setFormErrors state variable to errors
        {
            setFormErrors(errors)
        }
    }

    // console.log('formErrors', formErrors)

    return (
        <div>
            <h1> Register </h1>

            <form onSubmit={handleSubmit}>
                <label> username </label>
                <input type="text" value={username} onChange={handleChange} name="username" /> 
                { // cr -> if formErrors obj has username property, then display its value
                    formErrors.username && <span> {formErrors.username} </span>
                }
                <br />

                <label> Email </label>
                <input type="text" value={email} onChange={handleChange} name="email" />
                {formErrors.email && <span> {formErrors.email} </span>}
                <br />

                <label> Password </label>
                <input type="text" value={password} onChange={handleChange} name="password" /> 
                {formErrors.password && <span> {formErrors.password} </span>}
                <br />

                <label> Role </label>
                <select value={role} onChange={handleChange} name="role"> 
                    <option value=""> select role </option>
                    <option value="instructor"> instructor </option>
                    <option value="learner"> learner </option>
                </select> <br /> <br />

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register