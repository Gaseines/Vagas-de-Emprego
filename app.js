const express    = require('express')
const app        = express()
const db         = require('./db/connection')
const bodyParser = require('body-parser')


const PORT = 3000

app.listen(PORT, function(){
    console.log(`Está rodando na porta ${PORT}`)
})

// body parser

app.use(bodyParser.urlencoded({  extended: false  }))

//db connection

db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco de dados")
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar o banco de dados")
    })


//Routes
app.get('/', (req, res) => {
    res.send("Está funcionando!")
})

//jobs routes

app.use('/jobs', require('./routes/jobs'))