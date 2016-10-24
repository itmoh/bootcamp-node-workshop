var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// todo: create schema with 'firstName', 'lastName', 'lastLogin'.
// Mongoose should fail if 'firstName' or 'lastName' is empty.
// fill 'lastLogin' with current date on create.
// save items to 'users' collection

var UserSchema = new Schema();

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