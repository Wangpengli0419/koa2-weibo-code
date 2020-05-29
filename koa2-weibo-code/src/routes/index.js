const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg:"I`m Nasus",
    isMe:true,
    blogList:[
      {
        id:1,
        title:'aaa'
      },
      {
        id:2,
        title:'bbb'
      },
      {
        id:3,
        title:'ccc'
      }
    ]

  })
})
router.get('/rrwebRecording', async (ctx, next) => {
  await ctx.render('rrwebRecording', {
    title: 'Hello Koa 2!',
  })
})
router.get('/rrwebReplay', async (ctx, next) => {
  await ctx.render('rrwebReplay', {
    title: 'Hello Koa 2!',
  })
})


router.get('/mongo', async (ctx, next) => {
  await ctx.render('mongo', {
    title: 'Hello Koa 2!',
  })
})


router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/profile/:userName', async (ctx, next) => {
  const {userName} =ctx.params 
  ctx.body = {
    title: 'profile userName is',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const {userName,pageIndex} =ctx.params 
  ctx.body = {
    title: 'loadMore',
    userName,
    pageIndex
  }
})

module.exports = router
