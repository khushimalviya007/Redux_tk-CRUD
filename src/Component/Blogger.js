import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import axios from 'axios';

const Blogger = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  // Use useSelector to access the list of bloggers from Redux state
  const bloggers = useSelector((state) => state.users.users);

  const getName = (e) => {
    setName(e.target.value);
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const add = (name, email) => {
    let payload = { name, email };
    dispatch({ type: "SAVE", payload });
  };

  const handle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/blogger/save', { name, email });
      setName('');
      setEmail('');
      add(name, email);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <div class="my-div">
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
        <Button variant="primary" type="submit" onClick={() => add(name, email)}>
          ADD
        </Button>
      </Form>

      {/* Display the list of bloggers */}
      <div>
        <h2>Blogger List</h2>
        <ul>
          {bloggers.map((blogger) => (
            <li key={blogger.id}>
              Name: {blogger.name}, Email: {blogger.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogger;
