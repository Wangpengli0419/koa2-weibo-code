const router = require('koa-router')();
const dbServer = require('../db/dbServer'); 
router.prefix('/users');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response';
});

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    console.log(userName, password);
    let newPwd = password + 100;
    ctx.body = {
        tag: 100,
        userName,
        newPwd
    };
});
let eventList = [];
router.post('/rrwebRecording', async (ctx, next) => {
    const { token, motion } = ctx.request.body;
    eventList.push(motion);
    ctx.body = {
        code: 1,
        token,
        motion
    };
});


router.get('/getrrweb', function (ctx, next) {
    ctx.body = {
        title: 'getrrweb',
        motion: eventList[eventList.length - 1],
        time: new Date()
    };
});


router.post('/mongoselectData', async function (ctx, next) {
    const { name } = ctx.request.body;
    console.log(name);
    await dbServer.selectData({ 'name': name }).then((val) => {
    // console.log('val', val);
        ctx.body = {
            code: 1,
            name,
            val
        };
    }).catch((err) => {
        console.error('err', err);
        ctx.body = {
            code: 0,
            msg: `${name} not find`
        };
    });
});

router.post('/mongoInsertData', async function (ctx, next) {
    const data = ctx.request.body;
    console.log(data);
    await dbServer.insertData(data).then((val) => {
    // console.log('val', val);
        ctx.body = {
            code: 1,
            val
        };
    }).catch((err) => {
        console.error('err', err);
        ctx.body = {
            code: 0,
        };
    });
});

router.post('/mongoDeleteData', async function (ctx, next) {
    const data = ctx.request.body;
    console.log(data);
    await dbServer.deleteData(data).then((val) => {
    // console.log('val', val);
        ctx.body = {
            code: 1,
            val
        };
    }).catch((err) => {
        console.error('err', err);
        ctx.body = {
            code: 0,
        };
    });
});




router.post('/mongoUpataData', async function (ctx, next) {
    const data = ctx.request.body;
    console.log(data);
    await dbServer.updateData(data, { name: 'Nasus1' }).then((val) => {
    // console.log('val', val);
        ctx.body = {
            code: 1,
            val
        };
    }).catch((err) => {
        console.error('err', err);
        ctx.body = {
            code: 0,
        };
    });
});


module.exports = router;
