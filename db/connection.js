const Sequelize = require('sequelize')

const sequelize = new 
Sequelize('site_jobs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
    
})

module.exports = sequelize