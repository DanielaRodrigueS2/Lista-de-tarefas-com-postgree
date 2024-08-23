const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//banco de dados
const {Pool} = require('pg');
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password: "postgres",
    database:"Lista"
})

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.render("template");
});

// Rota para obter todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tarefas');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro select');
    }
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', async (req, res) => {
    const { nome, desc, data, valor } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tarefas (nome, descricao, data, valor) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, desc, data, valor]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro insert');
    }
});

// Rota para atualizar uma tarefa
app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, desc, data, valor } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tarefas SET nome = $1, descricao = $2, data = $3, valor = $4 WHERE id = $5 RETURNING *',
            [nome, desc, data, valor, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro uṕdate');
    }
});

// Rota para deletar uma tarefa
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro delete');
    }
});

app.listen(3000, () =>
    console.log("Server foi inciado")
);