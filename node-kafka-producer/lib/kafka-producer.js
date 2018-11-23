"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kafkaNode = require("kafka-node");

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _kafkaNode2.default.Client("localhost:2181");

var producer = new _kafkaNode2.default.HighLevelProducer(client);
producer.on("ready", function () {
    console.log("Kafka Producer is connected and ready.");
    KafkaService.sendRecord({
        type: "tipo",
        userId: "Edir",
        sessionId: _uuid2.default.v4,
        data: {
            customerId: 1,
            customerName: "Fidelia"
        }
    });
});

producer.on("error", function () {
    console.error(error);
});

var KafkaService = {
    sendRecord: function sendRecord(_ref) {
        var type = _ref.type,
            userId = _ref.userId,
            sessionId = _ref.sessionId,
            data = _ref.data;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if (!userId) {
            return callback(new Error('A userId must be provided'));
        }

        var event = {
            id: _uuid2.default.v4,
            timestamp: Date.now(),
            userId: userId,
            sessionId: sessionId,
            type: type,
            data: data
        };

        var buffer = new Buffer.from(JSON.stringify(event));

        var record = [{
            topic: "webevents.dev",
            messages: buffer,
            attributes: 1 /* Use GZip compression for the payload */
        }];

        producer.send(record, callback);
    }
};

exports.default = KafkaService;