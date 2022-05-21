const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.fprj4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('Practice assignment DB connected');

        const userCollection = client.db("practiceAssignment").collection("users");

        // add a new user
        app.post('/user', async (req, res) => {
            const user = req?.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });
    } finally {
        // await client.close();
    }
} run().catch(console.dir);


app.get('/', (req, res) => {
    console.log('body', req.body);
    res.send('Practice assignment server started!');
})

app.listen(port, () => {
    console.log('Practice assignment connected on port:', port);
})
