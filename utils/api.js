import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-server-utuo.onrender.com/api",
});

const getArticleList = () => {
  return ncNewsApi
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getArticle = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data;
  });
};

const getComments = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

const patchUpvote = (article_id) => {
  return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: 1 });
};

const patchDownvote = (article_id) => {
  return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: -1 });
};

const postComment = (article_id, newCommentText) => {
  const postBody = { body: newCommentText, username: "grumpy19" };
  console.log('Sending request with payload:', postBody);

  return ncNewsApi
    .post(`/articles/${article_id}/comments`, postBody)
    .then(({ data }) => {
      //new generated comment object
      return data
    });
};

export default {
  getArticleList,
  getArticle,
  getComments,
  patchUpvote,
  patchDownvote,
  postComment,
};
