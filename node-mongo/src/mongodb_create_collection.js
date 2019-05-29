var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nodeUser:nodePassword@localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("NodeMongo");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});