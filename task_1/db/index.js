function DB() {
    this._data = {};
}

DB.prototype.get = function get(key) {
    return this._data[key];
};

DB.prototype.set= function set(key, value) {
    this._data[key] = value;
    // todo: log any changes using logger
};

module.exports = DB;
