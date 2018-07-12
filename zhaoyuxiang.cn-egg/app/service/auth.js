const Service = require('egg').Service;

class AuthService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx
  }

  async createToken(data) {
    return this.ctx.app.jwt.sign(data, this.ctx.app.config.jwt.secret, {
      expiresIn: "12h"
    });
  }

  async verifyToken(token) {
    return new Promise((resolve, reject) => {
      this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret, function(err, decoded) {
        let result = {};
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }

  async getToken(code) {
    const result = await this.ctx.curl('https://github.com/login/oauth/access_token', {
      dataType: 'json',
      method: 'post',
      data: {
        code,
        client_id: this.ctx.app.config.github.client_id,
        client_secret: this.ctx.app.config.github.client_secret
      }
    });
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    return result.data.access_token;
  }

  async getUser(access_token) {
    const result = await this.ctx.curl('https://api.github.com/user', {
      dataType: 'json',
      data: {
        access_token
      }
    });
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    console.log(result.data)
    return result.data;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = AuthService;