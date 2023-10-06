import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Article from './Component/Article';
import Blogger from './Component/Blogger';
import Tablee from './Component/showBloggers';
import Home from './Component/Home';
import './App.css';
import ShowArticles from './Component/showArticles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
<div className="App">
<BrowserRouter>
<Routes path="/">
<Route path="home" element={<Home/>}></Route>
<Route path="blogger" element={<Blogger/>}></Route>
<Route path="article/:id" element={<Article/>}></Route>
<Route path="showblogger" element={<Tablee/>}></Route>
<Route path="showArticles" element={<ShowArticles/>}></Route>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
