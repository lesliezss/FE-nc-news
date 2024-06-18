import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";

const Article = () => {
  const [article, setArticle] = useState({});

  let { article_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}`
      )
      .then((response) => {
        setArticle(response.data.article);
        console.log(article);
      });
  }, []);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <p>{article.created_at}</p>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
    </div>
  );
};

export default Article;
