import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api from "../utils/api";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);

  let { article_id } = useParams();

  useEffect(() => {
    api.getArticle(article_id).then((data) => {
      setArticle(data.article);
      setArticleVotes(data.article.votes);
    });
    api.getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  const handleUpvote = () => {
    setArticleVotes((currentVotes) => currentVotes + 1);
    axios
      .patch(
        `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}`,
        { inc_votes: 1 }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownvote =()=>{
    setArticleVotes((currentVotes) => currentVotes - 1);
    axios
      .patch(
        `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}`,
        { inc_votes: -1 }
      )
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <div className="article">
        <h2>{article.title}</h2>
        <p>{article.created_at}</p>
        <p>Topic: {article.topic}</p>
        <p>{article.author}</p>
        <img src={article.article_img_url} />
        <p>{article.body}</p>

        <p>Votes: {articleVotes}</p>
        <button onClick={handleUpvote}>Up vote</button>

        <button onClick={handleDownvote}>Down vote</button>
      </div>

      <div className="comment">
        <h3>Comments:</h3>

        {comments.map((comment) => {
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
