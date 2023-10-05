import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleId, fetchDataarticle } from '../Slices/articleSlice';

const ShowArticles = () => {
  const { articles, isLoading, error } = useSelector((state) => state.articles); 
  const dispatch = useDispatch();

  const deleteArticle = (articleid, blogentityid) => {
    console.log(articleid + '   ' + blogentityid);
    dispatch(deleteArticleId(articleid, blogentityid));
  };

  useEffect(() => {
    dispatch(fetchDataarticle());
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Article Table</h1>
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
          {articles !== undefined &&
            articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.articleName}</td>
                <td>{article.description}</td>
                <td>
                  <button onClick={() => deleteArticle(article.id, article.blogentityId)}> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
export default ShowArticles;