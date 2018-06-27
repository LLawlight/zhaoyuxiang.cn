'use strict';
module.exports = {
  Query: {
    user(root, { code }, ctx) {
      return ctx.connector.auth.login(code);
    }
  }
};