import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ArticleCard = ({ articleList }) => {
  return (
    <ul className="article-list">
      {articleList.map((article) => {
        return (
          <li key = {article.article_id}>
            <Card style={{ width: "24rem" }}>
              <Card.Img variant="top" src={article.article_img_url} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>Topic: {article.topic}</Card.Text>
                <Card.Text>Author: {article.author}</Card.Text>
                <Card.Text>Comment count: {article.comment_count}</Card.Text>
                <Card.Text>Votes: {article.votes}</Card.Text>
                <Button variant="primary">Read Article</Button>
              </Card.Body>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleCard;
