import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from '../components/Header'
import User from '../components/User'
import Home from '../components/Home'
import TopicList from '../components/TopicList'
import ArticleList from "../components/ArticleList";
import Article from "../components/Article"

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <User />
        <TopicList />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<TopicList />} />
          <Route path="/articles" element={<ArticleList/>} />
          <Route path="/articles/:article_id" element={<Article />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
