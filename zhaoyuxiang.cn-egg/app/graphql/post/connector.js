'use strict';

const GraphQLError = require('graphql').GraphQLError;

class PostConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async create(title, content, id) {
    let token = this.ctx.request.header.authorization.replace('Bearer ', '');
    let verifyResult = await this.ctx.service.auth.verifyToken(token);

    if (verifyResult.verify && verifyResult.message.node_id == this.ctx.app.config.github.node_id) {
      let post = null

      if (id) {
        await this.ctx.app.model.Post.update({
          title,
          content
        }, { where: { id } });
        post = await this.ctx.app.model.Post.findOne({ where: { id } });
      }
      else {
        post = await this.ctx.app.model.Post.create({ title, content });
      }

      return post.toJSON();
    }
    else {
      throw new GraphQLError({
        code: 401,
        msg: '当前用户没有权限执行该操作！'
      })
    }
  }

  async delete(id) {
    let token = this.ctx.request.header.authorization.replace('Bearer ', '');
    let verifyResult = await this.ctx.service.auth.verifyToken(token);

    if (verifyResult.verify && verifyResult.message.node_id == this.ctx.app.config.github.node_id) {
      const post = await this.ctx.app.model.Post.findOne({ where: { id } })
      const ret = post.toJSON()
      await post.destroy()
      return ret
    }
    else {
      throw Error('用户未登录')
    }
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