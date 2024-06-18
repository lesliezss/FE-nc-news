import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Spinner from 'react-bootstrap/Spinner';

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://nc-news-server-utuo.onrender.com/api/articles")
      .then((response) => {
        setArticleList(response.data.articles);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if(isLoading){
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
  }

  return (
    <div>
      <ArticleCard articleList={articleList} />
    </div>
  );
};

export default ArticleList;
