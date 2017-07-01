const express = require('express')
const app = express();
const fs = require('fs');
app.use(express.static('public'));

  var mongodb = require('mongodb');
  setInterval(function() {
    http.get("https://isrmicha.herokuapp.com/");
}, 60000*25); // every 25 minutes
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

app.get('/db', function (req, res) {
	var banco = JSON.parse(fs.readFileSync('banco.json', 'UTF-8'));
	let tempArr = [];
	var cont = 0;
	for (let a in banco.bares){
		cont++;
		tempArr.push(banco.bares[a]);
	}	
	var temp = tempArr[parseInt(Math.random()*cont)];
	res.jsonp(temp);
});

app.get('/dball', function (req, res) {
	var banco = JSON.parse(fs.readFileSync('banco.json', 'UTF-8'));
	res.jsonp(banco);
});
 


app.listen((process.env.PORT || 5000), function () {
  console.log('Servidor rodando na porta : '+(process.env.PORT || 5000));
})

