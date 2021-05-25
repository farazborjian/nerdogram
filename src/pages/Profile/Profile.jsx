import React, { useState, useEffect } from 'react';
import './Profile.css';
import Nav from '../../components/Nav/Nav';
import EditForm from '../../components/EditForm/EditForm';
import { Icon, Modal } from 'semantic-ui-react';
import PostGrid from '../../components/PostGrid/PostGrid';
import * as postService from '../../utils/postService';
import * as likesApi from '../../utils/likesService';


export default function Profile({user}){
    
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState(false)

    async function addLike(postId){
        try {
            const data = await likesApi.create(postId)
            console.log(data, ' response from addLike')
            getPosts() // get the updated posts
        } catch(err){
            console.log(err)
        }
    }
    async function deletePost(postId){
        try{  
            await postService.removePost(postId)
            getPosts()
        } catch(err){
            console.log(err)
        }
    }
    async function removeLike(likeId) {
        try {
            const data = await likesApi.removeLike(likeId);
            console.log(data, ' response from removeLike')
            getPosts()
        } catch(err){
            console.log(err)
        }
    }
    async function getPosts(){
        try {
            const data = await postService.getAll();
            const userPost = [];
            data.posts.forEach(post=>{
                if (user._id === post.user._id) {
                    userPost.push(post)
                }             
            })
            setPosts([...userPost])
        } catch(err){
            console.log(err, ' this is the error')
        }
    }

    

    function handleModalOpen(){
        setActive(true)
    };

    function handleModalClose(){
        setActive(false)
    };

    useEffect(() => {
        getPosts()
    }, [])
    return(
        <>
        <Nav />
<div id='profile-container'>
    <div id='profile-inner-container'>
        <div id='icon-container'>
            <Icon onClick={handleModalOpen} name='edit' size='large' color='light blue'></Icon>
        </div>
        
        <img id='user-image' src={user.photoUrl} alt="photoUrl"/>
        <div id ='user-info'>
            <h1>{user.username}</h1>
            <h3>{user.email}</h3>
            <h3>{user.bio}</h3>
        </div>      
    </div>
    
        <PostGrid posts={posts} user={user} removeLike={removeLike} addLike={addLike} deletePost={deletePost} isProfile={false} />
<Modal
                    dimmer='blurring'
                    onClose={handleModalClose}
                    onOpen={handleModalOpen}
                    open={active}
                    >
                    <Modal.Header>Update Profile</Modal.Header>
                    <Modal.Content>
                        <EditForm  user={user} />
                    </Modal.Content>
                </Modal>
    

</div>
        </>
    )
}