let isDev = process.env.NODE_ENV === 'dev';
let notDev = process.env.NODE_ENV !== 'dev';
let isProd = process.env.NODE_ENV !== 'production';
let notProd = process.env.NODE_ENV !== 'production';

module.exports = {
    isDev,
    notDev,
    isProd,
    notProd
}
