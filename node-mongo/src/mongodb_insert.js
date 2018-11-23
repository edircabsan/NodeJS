var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nodeUser:nodePassword@localhost:27017/";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("NodeMongo");
    var myObj = {name: "Edir", address: "José da Silva Ribeiro, 576"};
    dbo.collection("customers").insertOne(myObj, function(err, res){
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    })
});