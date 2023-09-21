import React, {useReducer} from 'react'
import sweetalert2 from 'sweetalert2'

import {Link, Route, withRouter} from 'react-router-dom'

import Home from './Home'
import Register from "./Register"
import Login from './Login'
import MyProfile from './MyProfile'


// import Payment from './Payment'


// maintaining userObj state inside NavBar bcoz we have to pass dispatchFn to both Register & Login component

const reducerFn = (state, action) => {
    switch(action.type)
    {
        case 'ADD_USER': {
            return {...state, userObj: action.payload, isLoading: false}
        }
        case 'LOGIN_ERROR_FROM_DB': {
            return {...state, serverErrors: action.payload} // action.payload is a string
        }
        case 'LOGIN_RESET_SERVER_ERRORS': {
            return {...state, serverErrors: ''} // resetting serverErrors to '' after successful login
        }
        default: {
            return {...state}
        }
    }
}

const NavBar = (props) => {
    const {userLoggedIn, toggleUserLoggedInCb} = props

    const initialState = {
        userObj: {},
        serverErrors: ''
        // isLoading: true // by default isLoading is true
    }

    const [userStateObj, dispatchFn] = useReducer(reducerFn, initialState)

    console.log('userStateObj', userStateObj)

    // EHF - Logout link
    const handleLogout = () => {
        sweetalert2.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
        .then((res) => {
            console.log('res', res)

            if(res.isConfirmed) // if OK button clicked, isConfirmed = true. if cancel button clicked, isConfirmed = false
            { // if OK button clicked, then only logout
                localStorage.removeItem('token')
                toggleUserLoggedInCb() // sets userLoggedIn state to false in App

                
                props.history.push('/')
            }
        })
    }

    return ( // Home link common in all page irrespective of whether user is logged-in or not
        <div>
            {/* <Link to="/payments/:orderId"> payment </Link> */}

            <ul> 
                <li> <Link to="/"> Home </Link> </li>

                { // cr ->
                    userLoggedIn ? ( // if user is logged-in display: MyProfile, Logout links
                        <React.Fragment>
                            <li> <Link to="/users/profile"> MyProfile </Link> </li>
                            <li> <Link onClick={handleLogout}> Logout </Link> </li> 
                        </React.Fragment>
                    ) : ( // if user is not logged-in display: Register, Login links
                        <React.Fragment>
                            <li> <Link to="/users/register"> Register </Link> </li>
                            <li> <Link to="/users/login"> Login </Link> </li>
                        </React.Fragment>
                    )
                }
                
            </ul>
            
            
            

            <Route path="/" component={Home} exact={true} />
            {/* <Route path="/users/register" component={Register} exact={true} /> */}

            <Route path="/users/register" render={(props) => {
                return <Register {...props} dispatchFn={dispatchFn} />
            }} />

            <Route path="/users/login" render={(props) => { // to Login component, pass toggleUserLoggedInCb as props
                return <Login 
                            {...props} 
                            dispatchFn={dispatchFn} 
                            userStateObj={userStateObj} 
                            toggleUserLoggedInCb={toggleUserLoggedInCb} 
                        />
            }} />

            <Route path="/users/profile" component={MyProfile} exact={true} />
            


            {/* <Route path="/payments/:orderId" component={Payment} exact={true} /> */}
        </div>
    )
}

export default withRouter(NavBar) // since NavBar is not rendered via <Route>, so doesn't have history, match, location objects. so wrap NavBar inside withRouter component. now, to NavBar history, match, location are passed as props