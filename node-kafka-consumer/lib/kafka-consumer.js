"use strict";

var _kafkaNode = require("kafka-node");

var kafka = _interopRequireWildcard(_kafkaNode);

var _mongoose = require("mongoose");

var mongoose = _interopRequireWildcard(_mongoose);

var _eventModel = require("./models/eventModel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var client = new kafka.Client("localhost:2181");

var topics = [{
    topic: "webevents.dev"
}];

var options = {
    autoCommit: true,
    fetchMaxWaitsMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "buffer"
};

var consumer = new kafka.HighLevelConsumer(client, topics, options);

consumer.on("message", function (message) {
    var buf = new Buffer(message.value, "binary");
    var decodedMessage = JSON.parse(buf.toString());

    console.log(decodedMessage.data);

    var evento = mongoose.model('Evento', _eventModel.EventoSchema);
    mongoose.connect('mongodb://nodeUser:nodePassword@localhost:27017/Kafka-Events').then(function () {
        return evento.create({
            id: decodedMessage.id,
            type: decodedMessage.type,
            userId: decodedMessage.userId,
            sessionId: decodedMessage.sessionId,
            data: JSON.stringify(decodedMessage.data),
            createdAt: new Date()
        });
    }, function (err) {
        console.log(err);
    });
});

consumer.on("error", function (err) {
    console.log("error", err);
});

process.on("SIGINT", function () {
    consumer.close(true, function () {
        process.exit();
    });
});