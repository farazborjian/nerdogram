import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import userService from '../../utils/userService'
import { Modal } from 'semantic-ui-react';
import NewPost from '../NewPost/NewPost';
import './Nav.css'

export default function Nav () {
    const [user, setUser] = useState(null)
    const [active, setActive] = useState(false)
    const history = useHistory();

    function handleModalOpen(){
        setActive(true)
    };

    function handleModalClose(){
        setActive(false)
    };


    
    
    
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
                <div onClick={handleModalOpen}>New Post</div>
                <Modal
                        // dimmer='blurring'
                        onClose={handleModalClose}
                        onOpen={handleModalOpen}
                        open={active}
                        >
                        <Modal.Header>New Post</Modal.Header>
                        <Modal.Content>
                            <NewPost handleModalClose={handleModalClose} />
                        </Modal.Content>
                    </Modal>


            </>
        }</div>
    )
}