const Sequelize = require('sequelize')

const sequelize = new 
Sequelize('vagas_de_emprego', 'vagas_de_emprego_user', 'Kop74pr7D6EMT4NEb0pe9c4EsrFcuQpJ', {
    host: 'dpg-cpb54e5ds78s73epaq30-a',
    dialect: 'psql'
    
})

module.exports = sequelize