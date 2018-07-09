'use strict';

class AuthConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async login(code) {
    const access_token = await this.ctx.service.auth.getToken(code)
    const { name, email, bio, node_id, avatar_url } = await this.ctx.service.auth.getUser(access_token)

    let user = await this.ctx.app.model.User.findOne({ where: { node_id } })

    const userInfo = {
      name,
      email,
      bio,
      access_token,
      node_id,
      avatar_url
    }
    
    if (!user) {
      await this.ctx.app.model.User.create(userInfo);
    }
    else {
      await this.ctx.app.model.User.update(userInfo, { where: { node_id } })
    }

    user = await this.ctx.app.model.User.findOne({ where: { node_id } })

    user.token = this.ctx.service.auth.createToken({
      id: user.id,
      name: user.name,
      node_id: user.node_id
    });

    return user;
  }
}
module.exports = AuthConnector;