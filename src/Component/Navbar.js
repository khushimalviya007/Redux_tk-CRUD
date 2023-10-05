import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const[state, setState] = useState("Home");
  return (
    <>
    <nav className='navbar-container'>
      <ul>
      <Link to="/home" className="btn bd-primary">Home</Link>
      <Link to="/blogger" className="btn bd-primary">Blogger</Link>
      <Link to="/showblogger" className="btn bd-primary">Blogger List</Link>
      <Link to="/showArticles" className="btn bd-primary">Article List</Link>
      </ul>
    </nav>
    {/* <div>{state === "Blogger"?(<div className='parentBlog'><Blogger/></div>):state=== "Article"?(<div className='parentBlog'><Article/></div>):state ==="list"?(<div><Tablee/></div>):(<div><Home/></div>)}</div> */}
    </>
  );
};
export default Navbar;