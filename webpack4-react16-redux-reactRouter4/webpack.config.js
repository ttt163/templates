/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
const npmRun = process.env.npm_lifecycle_event;

if (npmRun === 'build') {
    module.exports = require('./config/webpack.config.prod');
    console.info('--> ./config/webpack.config.prod.js');
} else if (npmRun === 'dev' || !npmRun) {
    module.exports = require('./config/webpack.config.dev');
    console.info('--> ./config/webpack.config.dev.js');
}
