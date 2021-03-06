import React from 'react';
import { Card, Icon, Image, Header } from 'semantic-ui-react'

function PostCard({post, isProfile, addLike, removeLike, user, deletePost }) { 
  // as the logged in the user when I add a like I want the heart to turn red
  // find out if the logged in user has liked the card
  const likedIndexNumber = post.likes.findIndex(like => like.username === user.username);
  // if one of the likes in post.likes is has the same username as are logged in user
  // it will return the index of that particular object in the post.likes array
  // if not it will return -1
  const clickHandler = likedIndexNumber > - 1 ? () => removeLike(post.likes[likedIndexNumber]._id) : () => addLike(post._id);
  const likeColor = likedIndexNumber > -1 ? 'red' : 'grey';
  // as the logged in the user when I click on the heart and it is red I want 
  // to remove the like and turn heart grey

function handleDeletePost(){
    deletePost(post._id)
}

  return (
    <Card key={post._id}>
     {isProfile ? ''
        : 
          <Card.Content textAlign='left'>
              <Card.Header floated='right'>
                <Image
                    floated='right'
                    size='large'
                    avatar
                    src={post.user.photoUrl ? post.user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                />
                <Header as='h3' floated='right'>{post.user.username}</Header>
              </Card.Header>
              <Card.Header floated="right">
                {user.username === post.user.username ?  
                <Icon name={'delete'} size='large' onClick={handleDeletePost} />
                 : ''}
              </Card.Header>
          </Card.Content>
      }
      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Description>
        {post.caption}
      </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={'right'}>
        <Icon name={'heart'} size='large' onClick={clickHandler} color={likeColor} />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}
export default PostCard;