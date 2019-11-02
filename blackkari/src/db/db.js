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

mongoDb.prototype.save = function save(fact) {
    db.connect(url, function(err, db) {
        if (err) throw err
        const dbo = db.db("mydb")
        let factObj = { date: new Date(), fact: fact}
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

module.exports = mongoDb