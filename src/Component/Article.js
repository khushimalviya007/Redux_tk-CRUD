import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Article = () => {
  const [articleName, setArticleName]=useState('');
  const [description, setDescription]=useState('');
   
  const getArticleName=(e)=>{
    setArticleName(e.target.value);
  }

    
  const getDescription=(e)=>{
    setDescription(e.target.value);
  }

  const addArticle=(articleName,description)=>{
    let payLoad={articleName,description}
   // dispatch ({type: "SAVE_ARTICLE" , payLoad});
  }

  return (
    <div class="my-div">
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Article Name</Form.Label>
        <Form.Control type="text"value={articleName}  onChange={getArticleName} placeholder="Article name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <div className="form-group ">
      <textarea
        className="form-control" style={{width:600}}placeholder='Enter description'
        id="exampleFormControlTextarea1" value={description} onChange={getDescription}
        rows="5"
      />
    </div>
      </Form.Group>
      <Button variant="primary"onClick={()=>addArticle(articleName,description)} type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Article
