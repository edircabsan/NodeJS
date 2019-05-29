import * as kafka from "kafka-node";
import * as mongoose from "mongoose";
import {EventoSchema} from "./models/eventModel"

const client = new kafka.Client("localhost:2181");

const topics = [
    {
        topic: "webevents.dev"
    }
];

const options = {
    autoCommit: true,
    fetchMaxWaitsMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "buffer"
};

const consumer = new kafka.HighLevelConsumer(client, topics, options);

consumer.on("message", function(message){
    var buf = new Buffer(message.value, "binary");
    var decodedMessage = JSON.parse(buf.toString());

    console.log(decodedMessage.data);

    const evento = mongoose.model('Evento', EventoSchema);
    mongoose.connect('mongodb://nodeUser:nodePassword@localhost:27017/Kafka-Events').then(
        () => {
            return evento.create({
                id: decodedMessage.id,
                type: decodedMessage.type,
                userId: decodedMessage.userId,
                sessionId: decodedMessage.sessionId,
                data: JSON.stringify(decodedMessage.data),
                createdAt: new Date()
            });
        }, 
        err => {
            console.log(err);
        }
    );
});

consumer.on("error", function(err){
    console.log("error", err);
});

process.on("SIGINT", function(){
    consumer.close(true, function(){
        process.exit();
    });
});

