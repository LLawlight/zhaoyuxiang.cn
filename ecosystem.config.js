module.exports = {
  apps : [
    {
      name: "egg",
      script: "npm",
      cwd: "/zhaoyuxiang.cn-egg",
      watch: true,
      args: "start"
    },
    {
      name: "nuxt",
      script: "npm",
      cwd: "/zhaoyuxiang.cn-nuxt",
      watch: true,
      args: "start"
    }
  ]
}