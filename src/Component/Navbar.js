import React, { useState } from 'react';
import Home from './Home';
import Blogger from './Blogger';
import Article from './Article';
import Tablee from './showBloggers';
const Navbar = () => {
  const[state, setState] = useState("Home");
  return (
    <>
    <nav>
      <ul>
        {/* <li>Home</li> */}
        <button onClick={()=>setState("Home")}>Home</button>
        <button onClick={()=>setState("Blogger")}>Blogger</button>
        <button onClick={()=>setState("Article")}>Article</button>
        <button onClick={()=>setState("list")}>Blogger's List</button>
      </ul>
    </nav>
    <div>{state === "Blogger"?(<div className='parentBlog'><Blogger/></div>):state=== "Article"?(<div className='parentBlog'><Article/></div>):state ==="list"?(<div><Tablee/></div>):(<div><Home/></div>)}</div>
    </>
  );
};
export default Navbar;