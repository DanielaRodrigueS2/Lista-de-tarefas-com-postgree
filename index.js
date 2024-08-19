const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const engine = mustache();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tarefas', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'template.html'));
});

app.get('/teste',(req,res)=>{
});

app.listen(3000, () =>
    console.log("Server foi inciado")
);