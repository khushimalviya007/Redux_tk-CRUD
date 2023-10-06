import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import { fetchData } from '../Slices/BloggerSlice';
import { useNavigate } from 'react-router-dom';

const Blogger = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [blogger,setBloggers]= useState([]);
  const dispatch = useDispatch();
  const nevigate= useNavigate();

  const bloggers = useSelector((state) => state.users.users);
  const getName = (e) => {
    setName(e.target.value);
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const add= ()=>{
    try {
    axios.post('http://localhost:8080/blogger/save', { name, email }).
      // setName('');
      // setEmail('');
    then((response)=>{
      console.log(response.data);
      setBloggers([...blogger,response.data])
      dispatch(fetchData())
    nevigate("/showblogger");
    }
    );
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }
  const handle =  (e) => {
    e.preventDefault();
  };

  return (
    <>
    <div class="my-div">
    <Navbar/>
      <Form onSubmit={handle}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={getName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={getEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => add()}>
          ADD
        </Button>
      </Form>
    </div>
    </>
  );
};

export default Blogger;
