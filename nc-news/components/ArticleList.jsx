import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-server-utuo.onrender.com/api/articles")
      .then((response) => {
        setArticleList(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ArticleCard articleList={articleList} />
    </div>
  );
};

export default ArticleList;
