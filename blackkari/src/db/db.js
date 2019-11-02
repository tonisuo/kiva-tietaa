const db = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

function mongoDb() {
    db.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("facts", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

mongoDb.prototype.save = function save(factEn, factFi, imgBase64) {
    db.connect(url, function(err, db) {
        if (err) throw err
        const dbo = db.db("mydb")
      const date = new Date()
      date.setDate(1)
        let factObj = { date: date, factEn: factEn, factFi: factFi, image: imgBase64}
        dbo.collection("facts").insertOne(factObj, function(err, res) {
            if(err) {
                console.log("Error inserting object")
                throw err;
            }
            console.log("1 fact inserted")
            db.close()
        })
    })
}

mongoDb.prototype.fetchImage = function fetchImage(cb) {
  db.connect(url, function(err, db) {
    if (err) throw err
    const dbo = db.db("mydb")
    const startDate = new Date()
    startDate.setHours(0)
    const endDate = new Date()
    endDate.setHours(23)
    dbo.collection("facts").findOne({"date": {"$gte": startDate, "$lte": endDate}}, function(err, result) {
      if (err) throw err;
      db.close();
      cb(result)
    })
  })
}

module.exports = mongoDb
