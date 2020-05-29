const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const logger = require('koa-logger')

const cors = require('koa2-cors')
const index = require('./routes/index')
const users = require('./routes/users')

const { RedisConf } = require("./db/conf")
// error handler
onerror(app)

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://192.168.1.116:3000'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))



// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


app.keys = ['DShdjka_^&shkahdu$'];
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
  ttl: 1000 * 60 * 60 * 24,
  store: redisStore({
    all: `${RedisConf.url}:${RedisConf.port}`
  })
}))

// logger
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*")
// const start = new Date()
// await next()
// const ms = new Date() - start
// console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
