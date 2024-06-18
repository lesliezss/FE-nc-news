import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  let { article_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}`
      )
      .then((response) => {
        setArticle(response.data.article);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setComments(response.data.comments);
        console.log(comments);
      });
  }, []);

  return (
    <>
      <div className="article">
        <h2>{article.title}</h2>
        <p>{article.created_at}</p>
        <p>Topic: {article.topic}</p>
        <p>{article.author}</p>
        <img src={article.article_img_url} />
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>
      </div>

      <div className="comment">
        <h3>Comments:</h3>

        {comments.map((comment) => {
          console.log(comment);
          return (
            <Card key={comment.comment_id}>
              <Card.Body>
                <Card.Title>{comment.author}</Card.Title>
                <Card.Text>{comment.body}</Card.Text>
                <Card.Text>Votes: {comment.votes}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Article;
