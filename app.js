var cluster = require('cluster');

if (cluster.isMaster) {
	const https = require('https');
		setInterval(function() {
		console.log("Pingando para não dormir");
		https.get("https://isrexpress.herokuapp.com/");
		}, 1000 * 60 * 5); // every 5 minutes

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
const request = require('request');

var servidorAtual = "http://189.60.212.59/";
var cors = require('cors');
const mongodb = require('mongodb');
app.use(cors());
app.set('views', 'public');
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.engine('html', require('ejs').renderFile);
var db = null;
var initDb = (callback) =>{
  if (mongodb == null) return;
 var mongoDbUrl = 'mongodb://user:user@ds139942.mlab.com:39942/express';
  mongodb.connect(mongoDbUrl, function(err, conn) {
    if (err) {
		  console.log(err);
      callback(err);
      return;
    }
	console.log(process.pid+ " Connectou Database");
    db = conn;
  });
};
initDb(function(err){console.log(err);});
app.use((req, res, next) =>{ //Middleware Logger
 next();
});
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
app.get('/online', function (req, res) { //Verifica status do servidor
	res.send(true);
	});
app.use(express.static('public'));
app.use((req, res, next)=> { //Middleware 404
	console.log("404 não encontrado");
	res.redirect('/');
})
app.listen(app.get('port'), app.get('host'), function () {
  console.log('Servidor rodando no : '+app.get('host')+":"+app.get('port')+ " com trabalhador "+process.pid);
  // process.stdout.clearLine();
  // process.stdout.cursorTo(0);
  // process.stdout.write("Servidor ONLINE com "+workerConnected+"/"+cpuCont+" trabalhadores. \n");


//process.stdout.write("\n"); // end the line
})
}


//{ HTTP REQUEST
  // request({
	// uri : 'http://189.60.212.59/online',
	// timeout :1000
// },(error, response, body) =>{})
  // .on('data', function(data) {
		// console.log("Server OK");
		// res.redirect('http://189.60.212.59/');
		// })
		// .on('error', function(err) {
	// console.log("Server DOWN");
    // console.log(err);

  // })
//}

