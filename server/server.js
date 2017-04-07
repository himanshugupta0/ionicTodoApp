var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var connect = require('connect');

var temp = [];


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost/todo',function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb');
    }
});
var todoSchema = mongoose.Schema({
    // username: String,
    message: String
});

var Todo = mongoose.model('Todo',todoSchema);

app.get('/connect', function(req, res){
    Todo.find({}, function(err, docs){
        if(err){
            return console.log(err);
        } else{
            for(var i=0; i<docs.length; i++){
                temp[i] = docs[i];                
            }
            res.send(temp);
            temp = [];
        }
    });
});

app.post('/connect', function (req, res) {
    var obj = {message: req.body.msg}
    Todo.create(obj, function(err, docs){
        if(err){
            res.send(err);
            console.log(err);
        } else{
            res.json(docs);
        }
    });
});

// Editing by Id
app.put('/connect/:id', function(req, res){
    Todo.find({_id: req.params.id}, function(err, docs){
        if(err){
            console.log(err);
        } else{
            docs[0].message = req.body.message;
            docs[0].save(function(err){
                console.log(err);
            });
            res.json(docs);
        }
    });
});

// Delete by Id
app.delete('/connect/:id', function(req, res){
    Todo.findOneAndRemove({_id: req.params.id}, function(err, docs){
        if(err){
            return console.log(err);
        } else{
            res.sendStatus(200);
        }
    });
});


app.listen(3000, function () {
  console.log('Listening on port 3000!')
});