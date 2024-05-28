// Importa o módulo Express para criar o servidor
const express = require('express')

// Importa o módulo express-handlebars para gerenciar templates
const exphbs = require('express-handlebars')

// Importa o módulo path para trabalhar com caminhos de diretórios
const path = require('path')

// Cria uma instância do aplicativo Express
const app = express()

// Importa o módulo de conexão com o banco de dados
const db = require('./db/connection')

// Importa o módulo body-parser para processar dados do corpo da requisição
const bodyParser = require('body-parser')

const Job = require('./models/Job')

const Sequelize = require('sequelize')

const Op = Sequelize.Op

// Define a porta em que o servidor vai rodar
const PORT = 3000

// Inicia o servidor na porta definida e exibe uma mensagem no console
app.listen(PORT, function(){
    console.log(`Está rodando na porta ${PORT}`)
})

// Configura o body-parser para processar dados do corpo da requisição com URL encoded
app.use(bodyParser.urlencoded({ extended: false }))

// Configura o handlebars como motor de visualização e define o diretório de views
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Conecta ao banco de dados e exibe uma mensagem no console conforme o resultado
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco de dados")
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar o banco de dados")
    })

// Define uma rota raiz que envia uma resposta simples
app.get('/', (req, res) => {

    let search = req.query.job
    let query = '%'+search+'%'

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            })
        })
        .catch(err => console.log(err))
    } else{
        Job.findAll({
           where: {title: {[Op.like]: query}}, 
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            })
        })
    }

    
})

// Define as rotas para /jobs, utilizando um roteador externo
app.use('/jobs', require('./routes/jobs'))
