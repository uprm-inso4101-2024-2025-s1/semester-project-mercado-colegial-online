const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const crypto = require('crypto');

const app = express();
const port = 3000;

const users = [];

app.use(bodyParser.json());
app.use(cors());

function hashPassword(password, salt){
    return crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
}
function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
