var logger = require('./logger');
var DB = // todo: get local module 'db'
var dataBase = new DB();
dataBase.set('key_1', 'value_1');
dataBase.set('key_2', 'value_2');
dataBase.set('key_3', 'value_3');
dataBase.set('key_4', 'value_4');
logger.log('finish: program finished');