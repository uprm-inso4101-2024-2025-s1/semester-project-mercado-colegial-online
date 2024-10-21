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
connect()


/** Routes */
app.use('/items', itemsRouter); 



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

    users.push({ ...receivedData, password: hashedPass, salt });

    res.json({ message: 'Signed Up successfully', data: receivedData });
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

    const user = users.find(user => user.username === receivedData.username);

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
})

/** Starting the Server */

/**
 * Server starts here, and listens for requests on port 3000
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
