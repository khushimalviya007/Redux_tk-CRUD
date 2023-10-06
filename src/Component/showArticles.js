import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleId, fetchDataarticle } from '../Slices/articleSlice';
import { Form } from 'react-router-dom';
import axios from 'axios';


const ShowArticles = () => {
  const { articles, isLoading, error } = useSelector((state) => state.articles); 
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
const [updateArt, SetUpdateArt]= useState({});

useEffect(() => {
  dispatch(fetchDataarticle());
}, [dispatch]);

  const deleteArticle = (articleid, blogentityid) => {
    console.log(articleid + '   ' + blogentityid);
    dispatch(deleteArticleId(articleid, blogentityid));
  };
  // const handleUpdate = (article) => {
  //   SetUpdateArt(article);
  //   handleShow();
  // };

  // const handleUpdateSave=()=>{
  //     axios.put(`http://localhost:8080/blogger/${updateArt.blogentityId}/${updateArt.id}/art`, updateArt)
  //       .then((response) => {
  //         console.log("article updated successfully:", response.data);
  //         dispatch(fetchDataarticle());
  //       })
  //       .catch((error) => {
  //         console.error("Error updating article:", error);
  //       });

  //     handleClose();
    
  // }
  const handle=(e)=>{
    e.preventDefault();
  }


  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* <h1>Article Table</h1> */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Article Name</th>
            <th>Article Description</th>
            <th>Delete</th>
            {/* <th>Update</th> */}
          </tr>
        </thead>
        <tbody>
          {articles !== undefined &&
            articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.articleName}</td>
                <td>{article.description}</td>
                <td>
                  <button className="tableButton" onClick={() => deleteArticle(article.id, article.blogentityId)}> Delete</button>
                </td>
                {/* <td>
                  <button  className="tableButton1"  onClick={()=> handleUpdate(articles)}> Update</button>
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handle}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={updateArt ? updateArt.article:""}  onChange={(e) => SetUpdateArt({ ...updateArt, article: e.target.value })}
          placeholder="Enter article" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter description" defaultValue={updateArt ? updateArt.description:""} 
          onChange={(e) => SetUpdateArt({ ...updateArt, description: e.target.value })}/>
        </Form.Group>
        <Button variant="primary"  type="submit" >
          Update 
        </Button>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};
export default ShowArticles;