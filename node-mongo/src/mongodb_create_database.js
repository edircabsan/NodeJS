var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nodeUser:nodePassword@localhost:27017/CRMdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("NodeMongo");
  console.log("Database created!");
  db.close();
});