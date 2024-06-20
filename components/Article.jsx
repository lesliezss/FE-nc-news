import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api from "../utils/api";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Article = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [articleVotes, setArticleVotes] = useState(0);
  const [newCommentText, setNewCommentText] = useState("");

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
    api.patchUpvote(article_id).catch((error) => {
      console.log(error);
    });
  };

  const handleDownvote = () => {
    setArticleVotes((currentVotes) => currentVotes - 1);
    api.patchDownvote(article_id).catch((error) => {
      console.log(error);
    });
  };

  const handleChange = (event) => {
    setNewCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setComments((currentComments) => [
      { body: newCommentText, author: "grumpy19" },
      ...currentComments,
    ]);

    api.postComment(article_id, newCommentText)
    .catch((error) => {
      console.error("Failed to post comment:", error);
      alert("Failed to post comment. Please try again.");
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.body !== newCommentText)
      );
    });
    
    setNewCommentText("");
  };

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

      <div className="post-comment">
        <h3>Comments:</h3>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Post your comment:"
          >
            <Form.Control
              required
              type="text"
              onChange={handleChange}
              value={newCommentText}
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <button>Submit</button>
        </Form>
      </div>

      <div className="comment">
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
