import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import userService from '../../utils/userService'
import './Nav.css'

export default function Nav () {
    const [user, setUser] = useState(null)
    const history = useHistory();

    function handleLogout(){
        userService.logout();
        setUser({user: null})
        history.push('/login')
    }
    
    function goToLogin(){
        history.push('/login')
    };
    function goToSignup(){
        history.push('/signup')
    };

    function goToHome(){
        history.push('/')
    };
    
    function goToProfile(){
        history.push('/profile')
    }

    function goToNewPost(){
        history.push('/newpost')
    }


    useEffect(() => {
        setUser(userService.getUser())
    }, [])


    return (
        <div id='nav-container'>{
            !user ? 
            <>
                <div onClick={goToLogin}>Login</div>
                <div onClick={goToSignup}>Signup</div>
            </>:
            <>
                <div onClick={handleLogout}>Logout</div>
                <div onClick={goToHome}>Home</div>
                <div onClick={goToProfile}>Profile</div>
                <div onClick={goToNewPost}>New Post</div>
            </>
        }</div>
    )
}