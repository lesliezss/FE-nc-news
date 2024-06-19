import axios from "axios";

const getArticleList = () => {
  return axios
    .get("https://nc-news-server-utuo.onrender.com/api/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getArticle = (article_id) => {
  return axios
    .get(`https://nc-news-server-utuo.onrender.com/api/articles/${article_id}`)
    .then((response) => {
      return response.data;
    });
};

const getComments = (article_id) => {
  return axios
    .get(
      `https://nc-news-server-utuo.onrender.com/api/articles/${article_id}/comments`
    )
    .then((response) => {
      return response.data.comments;
    });
};



export default {
  getArticleList,
  getArticle,
  getComments,
};
