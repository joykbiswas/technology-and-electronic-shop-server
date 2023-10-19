const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqpfzla.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const phoneCollection = client.db('phoneDB').collection('phone');

    // create
    app.post('/phone', async(req,res) =>{
        const newPhone = req.body;
        console.log(newPhone);
        const result = await phoneCollection.insertOne(newPhone)
        res.send(result)
    })

    // read
    app.get('/phone',async(req,res) =>{
        const cursor = phoneCollection.find();
        const result =await cursor.toArray()
        res.send(result);
    })

    app.get('/phone/:brandname',async(req,res) =>{
        const cursor = phoneCollection.find({ brandName : req.params.brandname });
        const result =await cursor.toArray()
        res.send(result);
    })
 
    



     
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('Technology and Electronics is running')
})

app.listen(port, () => {
    console.log(`Technology and Electronics is running on port: ${port}`);
})