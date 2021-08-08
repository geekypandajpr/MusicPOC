var express = require('express');
const path = require('path');
var app = express();

const fs = require('fs')
let csv= require('fast-csv');

app.use(express.static(path.join(__dirname, "/public")));

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});


var tracks = [];
var artists = [];
var stream = fs.createReadStream("tracks.csv");
csv.parseStream(stream, {headers : true})
.on("data", function(data){
    tracks.push(data);
    eval(data.artists).forEach(element => {
      if (artists.indexOf(element) == -1){
        artists.push(element);
      }
    });
})
.on("end", function(){
  // console.log(artists);
});

app.get('/',function(req,res) {
  res.sendFile(__dirname+'/public/index.html');
});
app.get('/index',function(req,res) {
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/artist',function(req,res) {
  res.sendFile(__dirname+'/public/artist.html');
});

app.get('/add-artist',function(req,res) {
  res.sendFile(__dirname+'/public/add-artist.html');
});

app.get('/add-song',function(req,res) {
  res.sendFile(__dirname+'/public/add-song.html');
});


app.get('/tracks', function (req, res) {
   try {
      res.json(tracks)
    } catch (err) {
      console.error(err)
    }
});

app.get('/artists', function (req, res) {
  try {
     res.json(artists)
   } catch (err) {
     console.error(err)
   }
});

app.get('/artists/:artistName/tracks', function (req, res) {
  try {
    console.log(req.params.artistName);
     res.json(tracks.filter(t => eval(t.artists).indexOf(req.params.artistName) > -1));
   } catch (err) {
     console.error(err)
   }
});



