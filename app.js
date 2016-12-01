var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/template');

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000, function(){
  console.log("The server is running on localhost:3000")
})
