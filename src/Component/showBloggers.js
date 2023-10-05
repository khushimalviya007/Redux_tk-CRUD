import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {deleteBloggerrById, fetchData} from '../Slices/BloggerSlice';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function Tablee() {
  const { users, isLoading, error } = useSelector((state) => state.users);
  console.log(users);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [show, setShow] = useState(false);
  const [updateBlogger, setUpdateBlogger] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteBlogger = (id) => {
    dispatch(deleteBloggerrById(id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleUpdate = (users) => {
    setUpdateBlogger(users);
    handleShow();
  };

  const handleUpdateSave = () => {
    if (updateBlogger.id) {
      axios.put(`http://localhost:8080/blogger/${updateBlogger.id}`, updateBlogger)
        .then((response) => {
          console.log("Employee updated successfully:", response.data);
          dispatch(fetchData());
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });

      handleClose();
    }
  };
  const handle=(e)=>{
    e.preventDefault();
  }

  return (
   <>
   <div>
    <Navbar/>
   </div>
    <Table striped bordered hover variant="dark">
      <thead> 
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Username</th>
          <th>All articles</th>
          <th>Add Article</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users !== undefined &&
          users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td><ul>
                    {item.articlelist.map((article) => (
                      <li key={article.id}>{article.articleName}</li>
                    ))}
                  </ul></td>
              <td>
              <Link to={`/article/${item.id}`} className="btn-bd-primary add-article-link">Add Article</Link>
              </td>
              <td>
                <button
                  className="tableButton1"    onClick={()=> handleUpdate(item)} >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="tableButton"  onClick={()=>deleteBlogger(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handle}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={updateBlogger ? updateBlogger.name:""}  onChange={(e) => setUpdateBlogger({ ...updateBlogger, name: e.target.value })}
          placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" defaultValue={updateBlogger ? updateBlogger.email:""} 
          onChange={(e) => setUpdateBlogger({ ...updateBlogger, email: e.target.value })}/>
        </Form.Group>
        <Button variant="primary" onClick={handleUpdateSave}type="submit" >
          Update 
        </Button>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Tablee;
