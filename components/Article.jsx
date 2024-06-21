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
    const newComment = {
      body: newCommentText,
      author: "grumpy19",
      votes: 0,
      comment_id: 9999999,
    };
    setComments((currentComments) => [newComment, ...currentComments]);

    api
      .postComment(article_id, newCommentText)
      // .then((response) => {
      //   console.log(response);
      // //   //replace the hard coded comment with the real comment object from database
      // //   setComments((currentComments) => {
      // //     const updatedComments = currentComments.filter(
      // //       (comment) => comment.comment_id !== 9999999
      // //     );
      // //     return [...updatedComments, response];
      // //   });
      // })
      .catch((error) => {
        console.error("Failed to post comment:", error);
        alert("Failed to post comment. Please try again.");
        setComments((currentComments) =>
          //need to add more verification, ie. comment.author
          currentComments.filter((comment) => comment.body !== newCommentText)
        );
      });

    setNewCommentText("");
  };

  const handleDelete = (comment_id) => {
    console.log(comment_id); //click delete after post-shows the hard coded comment_id: 9999; click delete after refresh- shows the generated comment_id

    //setComments((currentComments) => {
    //   return currentComments.filter((comment) => comment.comment_id !== comment_id);
    // })
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.comment_id !== comment_id)
    );
    api.deleteComment(comment_id).catch((error) => {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment, please try again.");
      setComments((currentComments) => {
        // Add the comment back to the state
        const findCommentById = (id) => {
          return comments.find((comment) => comment.comment_id === id);
        };
        const deletedComment = { comment_id, ...findCommentById(comment_id) };
        return [...currentComments, deletedComment];
      });
    });
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
                <Card.Text>Votes: {comment.vote}</Card.Text>

                {comment.author === "grumpy19" && (
                  <button
                    onClick={() => {
                      handleDelete(comment.comment_id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Article;

//delete:
