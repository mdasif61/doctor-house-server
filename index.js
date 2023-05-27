const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Doctor House Server Running')
});

// doctor-house
// j6ny2hq5LV5EQHKl


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://doctor-house:j6ny2hq5LV5EQHKl@cluster0.kuomool.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

    const serviceCollection=client.db('doctor_house').collection('services')

    app.get('/allservice',async(req,res)=>{
        const result=await serviceCollection.find().toArray();
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port,()=>{
    console.log('server running port', port)
})