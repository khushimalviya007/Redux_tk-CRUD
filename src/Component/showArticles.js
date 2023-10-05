// import React, { useEffect } from 'react'
// import { Button, Modal, Table } from 'react-bootstrap'
// import Navbar from './Navbar'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteArticleId, fetchDataSuccess } from '../Slices/articleSlice'
// import {fetchDataarticle} from '../Slices/articleSlice';


// const ShowArticles=()=> {
//   const { users, isLoading, error } = useSelector((state) => state.users);
//  const dispatch = useDispatch();
//   // const nevigate = useNavigate();
//   // const [show, setShow] = useState(false);
//   // const [updateBlogger, setUpdateBlogger] = useState({});
//   console.log(users, " Article Page");

// useEffect(()=>{
//   dispatch(fetchDataarticle())
// })


//  const  deleteArticle=(articleid, blogentityid)=>{
//   console.log(articleid+"   "+blogentityid);
// dispatch(deleteArticleId(articleid,blogentityid));
//  }
//   return (
//     <>
//     <div>
//      <Navbar/>
//     </div>
//     <h1>Article Table</h1>
//       <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Article Name</th>
//             <th>Article Description</th>
//             <th>Delete</th>

//           </tr>
//         </thead>
//         <tbody>
//           {users !== undefined && users.map((user) =>
//             user.articlelist.map((article) => (
//               <tr key={article.id}>
//                 <td>{article.id}</td>
//                 <td>{article.articleName}</td>
//                 <td>{article.description}</td>
//                 <td><button onClick={()=> deleteArticle(article.id,user.id)}> Delete</button></td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>  
//      </>
//   )
// }

// export default ShowArticles;


import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleId, fetchDataarticle } from '../Slices/articleSlice';

const ShowArticles = () => {
  const { articles, isLoading, error } = useSelector((state) => state.articles); // Use the 'articles' state
  const dispatch = useDispatch();

  const deleteArticle = (articleid, blogentityid) => {
    console.log(articleid + '   ' + blogentityid);
    dispatch(deleteArticleId(articleid, blogentityid));
  };

  useEffect(() => {
    // Fetch article data when the component mounts (or is reloaded)
    dispatch(fetchDataarticle());
  }, [dispatch]); // Pass an empty dependency array to ensure it runs once on component mount

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
                  <button onClick={() => deleteArticle(article.id, article.blogentityid)}> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShowArticles;
