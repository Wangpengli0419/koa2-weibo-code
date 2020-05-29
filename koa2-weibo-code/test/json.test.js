const server = require("./server");

test('json 接口返回正确格式', async () => {
    const res = await server.get("/json");
    // expect(res.body).toEqual({ title: 'koa2 json' });
    expect(res.body.title).toBe('koa2 json');

})



test('post请求 接口返回正确格式', async () => {
    const res = await server.post("/users/mongoselectData").send({
        name: "Nasus"
    });
    console.log(res.body);
    
    // expect(res.body).toEqual({
    //     "code": 1,
    //     "name": "Nasus",
    //     "val": {
    //         "_id": "5ecf4880a8eb3f2220d6be3e",
    //         "name": "Nasus",
    //         "age": 25,
    //         "addr": "BeiJing",
    //         "addTime": "2020-05-28T05:13:36.304Z"
    //     }
    // });
    expect(res.body.code).toBe(0);

})
