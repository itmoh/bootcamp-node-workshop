var logger = require('../logger');

function DB() { 
    this._data = {};
}

DB.prototype.get = function get(key) {
    return this._data[key];
};

DB.prototype.set= function set(key, value) {
    this._data[key] = value;
    logger.log('data set: \nKey: ' + key + '\tValue: ' + value);
};

module.exports = DB;