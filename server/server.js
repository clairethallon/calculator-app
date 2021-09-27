// requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// globals
const port = 5000;
let mathAnswers = [];

// spin up server
app.listen(port, () => {
    console.log('server is up: ', port);
})

//routes
app.get('/', (req, res) => {
    console.log('get route hit');
    res.send('meow');
})

app.get('/calculator', (req, res) => {
    console.log('/calculator GET hit', mathAnswers);
    res.send(mathAnswers);
})

app.post('/calculator', (req, res) => {
    console.log('/calculator POST hit', req.body);
    let el = req.body;
    if (el.operation === '+') {
        console.log(Number(el.firstNum), Number(el.secondNum));
        el.answer = (Number(el.firstNum) + Number(el.secondNum));
        console.log(el.answer);

    } else if (el.operation === '-') {
        el.answer = (Number(el.firstNum) - Number(el.secondNum));

    } else if (el.operation === '*') {
        el.answer = (Number(el.firstNum) * Number(el.secondNum));
    } else if (el.operation === '/') {
        el.answer = (Number(el.firstNum) / Number(el.secondNum));
    }
    mathAnswers.push(el);
    res.sendStatus(200);
})