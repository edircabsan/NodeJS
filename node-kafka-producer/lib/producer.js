"use strict";

var _kafkaProducer = require("./kafka-producer");

var _kafkaProducer2 = _interopRequireDefault(_kafkaProducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_kafkaProducer2.default.sendRecord({
    "type": "tipo",
    "userId": "Edir",
    "sessionId": "1234",
    "data": {
        "id": "9999",
        "name": "Kaproxenifrobol"
    }
}, function (err) {
    console.log("callback: " + err);
});