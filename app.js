var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(express.static('static'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/static/" + "index.html" );
})

app.listen(3000, function () {
  console.log('sch001 listening on port 3000!');
});
