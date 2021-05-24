import React, { useState } from 'react';
import * as postService from '../../utils/postService';
import { Button, Form, Grid, Header, Image,  Segment } from 'semantic-ui-react'
export default function NewPost({ handleModalClose }){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    caption: ''
  })
  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleAddPost(post){
        console.log('hanlde add Post')
        try {
            const data = await postService.create(post)
            console.log(data, ' the response from the create route')
            
        } catch(err){
            console.log(err)
        }
    }

  function handleSubmit(e){
    e.preventDefault()
    console.log('is handlesUbmit being called?')
    // Why do we need to create FormData
    // what type of request are we making?
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    // Have to submit the form now! We need a function!
    handleAddPost(formData)
    handleModalClose()
  }
  return (
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
            <Form  autoComplete="off" onSubmit={handleSubmit}>
                <Form.Input
                  className="form-control"
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                />   
              <Form.Input
                  className="form-control"
                  name="caption"
                  value={state.caption}
                  placeholder="what's new?"
                  onChange={handleChange}
                  required
              />   
              <Button
                type="submit"
                className="btn"
              >
                ADD
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
  ); 
}