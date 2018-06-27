module.exports = (app) => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    name: STRING,
    email: STRING,
    bio: STRING,
    access_token: STRING,
    node_id: STRING,
    avatar_url: STRING
  });

  return User;
};