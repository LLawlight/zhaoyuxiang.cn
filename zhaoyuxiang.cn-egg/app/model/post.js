module.exports = (app) => {
  const { STRING, TEXT } = app.Sequelize;

  const Post = app.model.define('post', {
    title: STRING,
    content: TEXT,
  });

  return Post;
};