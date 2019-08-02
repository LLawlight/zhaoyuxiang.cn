module.exports = {
  cors: {
    origin: '*'
  },

  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  },

  github: {
    client_id: '96d281e838dbce3f2d1d',
    client_secret: 'c67ee6823e4c31e15c88fd880f1e84ed8b56dc9b',
    node_id: 'MDQ6VXNlcjE3NTI1Mzc3'
  },

  graphql: {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: function* (ctx) {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: function* (ctx) {},
  },

  jwt: {
    enable: false,
    secret: "zhaoyuxiang"
  },

  keys: 'zhaoyuxiang',

  // 加载 errorHandler 中间件
  middleware: [ 'errorHandler', 'graphql' ],

  security: {
    csrf: {
      ignore: () => true,
    },
  },

  sequelize: {
    dialect: 'mysql',
    database: 'test',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 't57u!*@`63?ZoA2;1V',
  }
};