'use strict';
module.exports = {
  Query: {
    post(root, { id }, ctx) {
      return ctx.connector.post.fetchById(id);
    },

    posts(root, { page = 1 }, ctx) {
      const posts = ctx.connector.post.fetchList(page);
      return posts;
    }
  },

  Mutation: {
    createPost(root, {
      title,
      cover,
      content,
      id
    }, ctx) {
      return ctx.connector.post.create(title, cover, content, id);
    },

    deletePost(root, { id }, ctx) {
      return ctx.connector.post.delete(id);
    }
  }
};