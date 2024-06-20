import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Spinner from "react-bootstrap/Spinner";
import api from "../utils/api";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getArticleList()
      .then((articles) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
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
