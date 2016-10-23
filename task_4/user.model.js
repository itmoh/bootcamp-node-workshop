var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, { collection: 'user' });


UserSchema
    .virtual('fullName')
    .set(function (name) {
        var names = name.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
    })
    .get(function () {
        return [this.firstName, this.lastName].join(' ');
    });

module.exports = mongoose.model('user', UserSchema);