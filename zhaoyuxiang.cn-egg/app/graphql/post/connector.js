'use strict';

class PostConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async create(title, content) {
    let bearerToken = this.ctx.request.header.authorization.replace('Bearer ', '');
    let verifyResult = await this.ctx.service.auth.verifyToken(bearerToken);

    if (verifyResult.verify && verifyResult.message.node_id == this.ctx.app.config.github.node_id) {
      const post = await this.ctx.app.model.Post.create({ title, content });
      return post.toJSON();
    }
  }

  async delete(id) {
    const post = await this.ctx.app.model.Post.destroy({ where: { id } })
  }

  async fetchById(id) {
    const post = await this.ctx.app.model.Post.findOne({ where: { id } })
    return post;
  }

  async fetchList(page) {
    const posts = await this.ctx.app.model.Post.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10
    })
    return posts;
  }
}
module.exports = PostConnector;