const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const crypto = require('crypto');

const app = express();
const port = 3001;

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

    res.json({ message: 'Signed Up successfully', data: receivedData });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
