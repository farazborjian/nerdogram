import React from 'react';
import './PostGrid.css'
import PostCard from '../PostCard/PostCard';


export default function PostGrid({posts, isProfile, addLike, deletePost, removeLike, user}){
    return(
        <div id='grid-container'>
            {posts.map((post)=>{
                return(
                    <PostCard 
                            user={user}
                            post={post} 
                            key={post._id} 
                            isProfile={isProfile} 
                            addLike={addLike}  
                            removeLike={removeLike}
                            deletePost={deletePost}
                            />

                )
            }
            
            )}

        </div>

    )
}