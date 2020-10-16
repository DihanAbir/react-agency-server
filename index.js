var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;


const password = 'agency71 agency';
const uri = "mongodb+srv://agency:agency71@cluster0.nngak.mongodb.net/agency?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



client.connect(err => {
  const agencyCollection = client.db("agency").collection("service");
  app.post("/addReview", (req, res) => {
      const review = req.body;
      agencyCollection.insertOne(review)
      .then(res =>{
          console.log(res);
          res.send(res.insertedCount > 0 );
      })
      // console.log("review:",review)
  })

  app.get("/review", (req, res) => {
    agencyCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    }
    )

  })  

  console.log("e db successful");
});



client.connect(err => {
  const agencyCollection = client.db("agency").collection("order");
  app.post("/addOrder", (req, res) => {
      const order = req.body;
      agencyCollection.insertOne(order)
      .then(res =>{
          console.log(res);
          res.send(res.insertedCount > 0 );
      })
      // console.log("order:",order)
  })

  // email wise order  
  app.get("/order", (req, res) => {
    agencyCollection.find({email: req.query.email})
    .toArray((err, documents) => {
      res.send(documents)
    }
    )

  })  

  // all order 

  app.get("/all-order", (req, res) => {
    agencyCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    }
    )

  })  

});

console.log(" order db successful");



app.get('/', function (req, res) {
    res.send('hello from heroku server')
  })
  
  // app.listen(5000)
  app.listen(process.env.PORT || 5000)