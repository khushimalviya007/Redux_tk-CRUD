import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addArticleToBlogger, fetchData } from '../Slices/BloggerSlice';

const Article = () => {
  const {id}= useParams();
  const [articleName,setArticleName]= useState('');
  const [articleDes,setArticleDes]= useState('');

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleAddArticle=()=>{
    
    if(articleName){
      //console.log(articleName+'   '+articleDes);
      dispatch(addArticleToBlogger({articleName,id,articleDes}))
      .then(()=>{
        console.log('article added sucessfully'+ articleName);
      })
      .catch((error)=>{
        console.error(error);
      });
      setArticleName('');
      setArticleDes('');
      navigate("/showblogger");
    }};
    
  return (
    <div class="my-div1">
      <Navbar/>
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Id</Form.Label>
        <Form.Control type="text"value={id} readOnly placeholder="Id" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Article Name</Form.Label>
        <Form.Control type="text" onChange={(e)=>setArticleName(e.target.value)} placeholder="Article name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <div className="form-group ">
      <textarea
        className="form-control" style={{width:600}}placeholder='Enter description'
        id="exampleFormControlTextarea1" onChange={(e)=>setArticleDes(e.target.value)}
        rows="5"
      />
    </div>
      </Form.Group>
      <Button variant="primary"  onClick={handleAddArticle} type="submit">
       Add
      </Button>
    </Form>
    </div>
  )
}

export default Article;