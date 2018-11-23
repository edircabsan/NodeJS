import kafka, { KafkaClient } from "kafka-node"
import uuid from "uuid";

const client = new kafka.Client("localhost:2181");

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function(){
    console.log("Kafka Producer is connected and ready.");
    KafkaService.sendRecord({
        type: "tipo",
        userId: "Edir",
        sessionId: uuid.v4,
        data: {
            customerId: 1,
            customerName: "Fidelia"
        }
    });
});

producer.on("error", function(){
    console.error(error);
});

const KafkaService = {
    sendRecord: ({ type, userId, sessionId, data }, callback = () => {}) => {
        if(!userId){
            return callback(new Error('A userId must be provided'));
        }

        const event = {
            id: uuid.v4,
            timestamp: Date.now(),
            userId: userId,
            sessionId: sessionId,
            type: type,
            data: data
        };

        const buffer = new Buffer.from(JSON.stringify(event));

        const record = [
            {
                topic: "webevents.dev",
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];

        producer.send(record, callback);
    }  
};

export default KafkaService;