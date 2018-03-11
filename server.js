const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
