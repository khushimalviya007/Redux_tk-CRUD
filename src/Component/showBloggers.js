import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {fetchData} from '../Slices/BloggerSlice';

function Tablee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // const handleDelete = (itemId) => {
  //   dispatch(deleteU(itemId));
  // };

  // const handleUpdate = (id, name, email) => {
  //   setName(name);
  //   setEmail(email);
  //   setId(id);
  //   setShow(true);
  // };

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAdd = () => {
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handle=(e)=>{
e.preventDefault();
  }
  return (
    <Table striped bordered hover variant="dark">
      <thead> 
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Username</th>
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
              <td>
                <button className="tableButton2" onClick={handleAdd}>
                  Add
                </button>
              </td>
              <td>
                <button
                  className="tableButton1"
                  
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="tableButton"
                  
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      {/* Modal for editing user */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: '40%' }} onSubmit={handle}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                defaultValue={name}
                onChange={handleInputName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={email}
                onChange={handleInputEmail}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: '20px' }}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Table>
  );
}

export default Tablee;
