import React, { useState, useEffect } from 'react'
import Nav from '../../components/Nav/Nav'
import * as postService from '../../utils/postService'
import PostFeed from '../../components/PostFeed/PostFeed'
import {  Grid } from 'semantic-ui-react'
import * as likesApi from '../../utils/likesService';
import './Home.css'

export default function Home ({ user }) {
    const [posts, setPosts] = useState([]);
    async function getPosts(){
        try {
            const data = await postService.getAll();
            setPosts([...data.posts])
        } catch(err){
            console.log(err, ' this is the error')
        }
    }

    async function addLike(postId){
      try {
        const data = await likesApi.create(postId)
        console.log(data, ' response from addLike')
        getPosts() // get the updated posts
      } catch(err){
        console.log(err)
      }
    }
    async function removeLike(likeId){
      try{  
        const data = await likesApi.removeLike(likeId);
        console.log(data, ' response from removeLike')
        getPosts()
      } catch(err){
        console.log(err)
      }
    }
    async function deletePost(postID){
      try{  
        const data = await postService.removePost(postID);
        getPosts()
      } catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <>
            <Nav />
            <Grid centered >
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                <PostFeed 
                    deletePost={deletePost}
                    user={user}
                    posts={posts}  
                    numPhotosCol={1} 
                    isProfile={false} 
                    addLike={addLike} 
                    removeLike={removeLike}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </>
      )
}