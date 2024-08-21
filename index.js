const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//banco de dados
const {Client} = require('pg');
const client = new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password: "postgres",
    database:"lista"
})


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tarefas', (req,res) =>{
    res.render("template")
});

app.get('/teste',(req,res)=>{
});

app.listen(3000, () =>
    console.log("Server foi inciado")
);