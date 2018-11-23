import KafkaService from "./kafka-producer";

KafkaService.sendRecord({
    "type": "tipo", 
    "userId": "Edir",
    "sessionId": "1234",
    "data": {
        "id": "9999",
        "name": "Kaproxenifrobol"
    }
}, function(err){
    console.log("callback: " + err);
});