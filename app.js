const express = require('express')
const app = express()
app.use(express.static('public'));
const port = 3000;
  var mongodb = require('mongodb');
var contador = 0;
var db = null;
var initDb = function(callback) {
  if (mongodb == null) return;
 var mongoDbUrl = 'mongodb://user:user@ds139942.mlab.com:39942/express';
  mongodb.connect(mongoDbUrl, function(err, conn) {
    if (err) {
		  console.log(err);
      callback(err);
      return;
    }
    db = conn;
  });
};
initDb(function(err){console.log(err);});
app.get('/api', function (req, res) {
  	  if (!db) {
initDb(function(err){console.log(err);});
  }
  if (db) {
        db.collection('banco', function (err, collection) {
            collection.update({nome : "views"},
		{ $inc: { views: 1 } });
		 db.collection('banco', function (err, collection) {
            collection.findOne({nome : "views"},function (err, item) {	
                res.send("Visitas : "+item.views);
            });
        });
		if (err) console.log(err);
  })} else {
    res.send('Error DB');
  }
})



app.listen(port, function () {
  console.log('Servidor rodando na porta : '+port);
})

