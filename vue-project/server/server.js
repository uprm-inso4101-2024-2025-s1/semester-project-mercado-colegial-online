import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'; 
import crypto from 'crypto'; 
import { connect } from './db.js'; 


/** Routes */
import itemsRouter from './routes/items.js'

/** Express App setup */
const app = express();
const port = 3000;

/** For temporary stored user data */
const users = [];   


/** Parses incoming JSON request bodies to make it easier to handle data */
app.use(bodyParser.json());     

/** Enables Cross-Origin Resoruce Sharing, which allows the backend to handle requests from other domains */
app.use(cors());    

/** Password Hashing Utilities */
function hashPassword(password, salt){
    return crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
}
function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

/** Mongodb Connection */

/**
 * MongoClient connects to our MongoDB Atlas cluster
 */
import { MongoClient, ServerApiVersion } from "mongodb";

// dotenv.config(); 
// const uri = process.env.MONGODB_URI; 

const uri = "mongodb://mercadocolegial:M.Colegio9@cluster0-shard-00-00.vcnew.mongodb.net:27017,cluster0-shard-00-01.vcnew.mongodb.net:27017,cluster0-shard-00-02.vcnew.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/**
 * Handles the connection to MongoDB, this sends a "ping" to confirm a successful 
 * connection, and closes the connection
 */
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function addUser(newUser) {
    try {
        await client.connect();
        const database = client.db("sample_mflix");
        const users = database.collection("users");
        const result = await users.insertOne(newUser);
        console.log(`New user created with the following id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

async function getUser(username) {
    try {
        await client.connect();
        const database = client.db("sample_mflix");
        const users = database.collection("users");
        const user = await users.findOne({ username: username });
        await client.close();
        return user;
    } catch (e) {
        console.error(e);
    }
}

/** Signup Route */

/**
 * Handles user signup, hashes the user password before storing it with a unique 
 * salt, and then adds the user to the 'users' array stored globally above.
 * 
 * A response is then sent back confirming successful signup.
 */
app.post('/signup', (req, res) => {
    const receivedData = req.body;

    const { password } = receivedData;
    if(!password){
        return res.status(400).json({message: 'Password is required'});
    }
    const salt = generateSalt();
    const hashedPass = hashPassword(password,salt);


    //test
    console.log(`Original Password: ${password}`);
    console.log(`Hashed Password: ${hashedPass}`);
    console.log(`Salt: ${salt}`);

    addUser({ ...receivedData, password: hashedPass, salt }).then(() => {
      res.json({ message: 'Signed Up successfully', data: receivedData });
    }).catch((e) => {
      res.status(500).json({ message: 'Failed to sign up', error: e });
    });
});


/** Login Route */

/**
 * Handles user login ,checks if the username exists and hashes the provided
 * password with the stored salt. 
 * 
 * If the hashed password mathces, the suer is successfully logged in; 
 * 
 */
app.post('/login', (req, res) => {
    const receivedData = req.body;

    const { password } = receivedData;

    getUser(receivedData.username).then((user) => {

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const hashedPass = hashPassword(password,user.salt);

      console.log(user);
      console.log(`Original Password: ${password}`);
      console.log(`Hashed Password: ${hashedPass}`);
      console.log(`Salt: ${user.salt}`);

      if (user.password !== hashedPass) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'Logged In successfully', data: receivedData });
    }).catch((e) => {
      res.status(500).json({ message: 'Failed to login', error: e });
    });
})

/** Starting the Server */

/**
 * Server starts here, and listens for requests on port 3000
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
