
const MongoClient = require('mongodb');
const { MongoConf } = require('./conf');

const DB_URL = `${MongoConf.url}${MongoConf.port}`;
let table;
MongoClient.connect(
    DB_URL,
    {
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) return console.error(err);
        let DB = client.db('test');
        table = DB.collection('vip');
    });

/**
 * 插入数据
 * @param data 要插入的数据  { "name": "Ltt", "age": 25, "addr": "ZuoQuan", "addTime": new Date() };
 */
let insertData = async (data) => {
    return await new Promise((resolve, reject) => {
        table.insertOne(data, function (error, result) {
            if (error) {
                console.log('Error:' + error);
                reject(error);
            } else {
                console.log(result.result.n);
                resolve(result);
            }
        });
    });
};






/**
 * 替换
 * @param  whereData 条件   { "name": 'Nasus' }
 * @param updateData 要替换的数据 {'age':26}
 */
let updateData = async (whereData, updateData) => {
    return await new Promise((resolve, reject) => {
        let updateDat = { $set: updateData }; //如果不用$set，替换整条数据
        table.updateOne(whereData, updateDat, function (error, result) {
            if (error) {
                console.log('Error:' + error);
                reject(error);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};




/**
 * 删除
 * @param whereStr 删除条件 { "name": 'Nasus' }
 */
let deleteData = async (whereStr) => {
    return await new Promise((resolve, reject) => {
        table.deleteOne(whereStr, function (error, result) {
            if (error) {
                console.log('Error:' + error);
                reject(error);
                return;
            } else {
                resolve(result);
            }
        });
    });
};




/**
 * selectData
 * @param whereStr 查询条件 { "name": 'Nasus' }
 */
let selectData = async (whereStr) => {
    return await new Promise((resolve, reject) => {
        table.find(whereStr, function (error, cursor) {
            cursor.each(function (error, doc) {
                if (doc) {
                    // console.log(doc);
                    if (doc.addTime) {
                        console.log('addTime: ' + doc.addTime);
                    }
                    resolve(doc);
                } else {
                    reject(error);
                }
            });
        });
    });
};

let add = (a, b) => {
    return a + b;
};
module.exports = {
    insertData,
    updateData,
    deleteData,
    selectData,
    add
};