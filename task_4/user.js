var User = require('./user.model');
var express = require('express');
var router = express.Router();

var OK = 200;
var CREATED = 201;
var NOT_FOUND = 404;

router.route('')
    .get(function get(req, res) {
        return User.find(req.params)
            .then(function (result) {
                res.status(OK).json({
                    status: 'success',
                    total: result.length,
                    responses: result
                });
            })
            .catch(function (err) {
                res.status(NOT_FOUND).json(err);
            });
    })
    .post(function add(req, res) {
        var modelInstance = new User(req.body);
        return modelInstance.save()
            .then(function (result) {
                res.status(CREATED).json({
                    status: 'success',
                    response: result
                });
            })
            .catch(function (err) {
                res.send(err);
            });
    });


router.route('/:id')
    .get(function getById(req, res) {
        return User.findById(req.params.id)
            .then(function (result) {
                res.status(OK).json(result);
            })
            .catch(function (err) {
                res.status(NOT_FOUND).json(err);
            });
    })
    .post(function update(req, res) {
        return User.update({ _id: req.params.id }, { $set: req.body })
            .then(function (result) {
                res.status(OK).json({
                    status: 'success',
                    response: result
                });
            })
            .catch(function (err) {
                res.status(NOT_FOUND).json(err);
            });
    })
    .delete(function remove(req, res) {
        return User.remove({ _id: req.params.id })
            .then(function (result) {
                res.json({
                    status: 'success',
                    response: result
                });
            })
            .catch(function (err) {
                res.send(err);
            });
    });

module.exports = router;
