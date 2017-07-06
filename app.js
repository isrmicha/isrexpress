var cluster = require('cluster');

if (cluster.isMaster) {
	let cpuCont = require('os').cpus().length;
    for (var i = 0; i < cpuCont; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Trabalhador %d morreu :(', worker.id);
        cluster.fork();
    });
} else {
const express = require('express')
const app = express();
const fs = require('fs');
const http = require('http');
var cors = require('cors');
app.use(cors());
app.set('views', 'public');
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.engine('html', require('ejs').renderFile);
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
                res.jsonp(item);
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
	res.json(temp);
});
app.get('/dball', function (req, res) {
	var banco = JSON.parse(fs.readFileSync('banco.json', 'UTF-8'));
	res.jsonp(banco);
});
 app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Aconteceu algo errado!');
})
 app.use((req, res, next)=> {
	res.render('index.html');
})
app.listen(app.get('port'), app.get('host'), function () {
  console.log('Servidor rodando no : '+app.get('host')+":"+app.get('port')+ " com trabalhador "+process.pid);
})
}
