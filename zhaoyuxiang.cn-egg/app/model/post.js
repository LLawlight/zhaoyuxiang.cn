module.exports = (app) => {
  const { STRING, TEXT } = app.Sequelize;

  const Post = app.model.define('post', {
    title: STRING,
    cover: STRING,
    content: TEXT,
  });

  return Post;
};