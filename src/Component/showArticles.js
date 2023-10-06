import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleId, fetchDataarticle } from '../Slices/articleSlice';
import axios from 'axios';

const ShowArticles = () => {
  const { articles, isLoading, error } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [updateArt, setUpdateArt] = useState({ id: '', articleName: '', description: '' });

  useEffect(() => {
    dispatch(fetchDataarticle());
  }, [dispatch]);

  const deleteArticle = (articleId) => {
    console.log(articleId);
    dispatch(deleteArticleId(articleId));
  };

  const handleUpdate = (articleId) => {
    console.log(articleId);
    const selectedArticle = articles.find((article) => article.id === articleId);
    setUpdateArt(selectedArticle);
    handleShow();
  };

  const handleUpdateSave = () => {
    axios
      .put(`http://localhost:8080/blogger/articles/${updateArt.id}`, updateArt,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Article updated successfully:', response.data);
        dispatch(fetchDataarticle());
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateArt({
      ...updateArt,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Article Name</th>
            <th>Article Description</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.articleName}</td>
                <td>{article.description}</td>
                <td>
                  <button className="tableButton" onClick={() => deleteArticle(article.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="tableButton1" onClick={() => handleUpdate(article.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Articles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="div1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="articleName">Article Name:</label>
                <input
                  type="text"
                  name="articleName"
                  value={updateArt.articleName}
                  onChange={handleInputChange}
                  placeholder="Edit Article Name"
                  id="articleName"
                  required
                />
              </div>
              <div>
                <label htmlFor="articleDescription">Article Description:</label>
                <textarea
                  name="description"
                  value={updateArt.description}
                  onChange={handleInputChange}
                  id="articleDescription"
                  placeholder="Edit Article Description"
                  required
                />
              </div>
              <div>
                <button type="btn btn-primary" onClick={handleUpdateSave}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowArticles;
