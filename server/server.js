const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    const receivedData = req.body;
    console.log('Login data received from client:', receivedData);

    res.json({ message: 'Logged in successfully', data: receivedData });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
