
const jsf = require('json-schema-faker');
var express = require('express');
var router = express.Router();

const fakeStructure = {
    "type": "array",
    "minItems": 10,
    "maxItems": 20,
    "items": {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "faker": "name.firstName"
            },
            "lastName": {
                "type": "string",
                "faker": "name.lastName"
            },
            "lastLogin": {
                "type": "string",
                "faker": "date.past"
            }
        },
        "required": [
            "firstName",
            "lastLogin"
        ]
    }
}
let fakeData;
router.route('')
    .get(function (req, res) {
        fakeData = fakeData || (fakeData = jsf(fakeStructure));
        res.json(fakeData);
    })
    .post(function (req, res) {
        fakeData = null;
        res.send('dataCleared');
    });

module.exports = router;