const express = require('express')
const router  = express.Router()
const Job     = require('../models/Job')


// rota de teste
router.get('/test', (req, res) => {
    res.send("Rotas estão funcionando")
})

// add job via post

router.post('/add', (req, res) =>{

    let {title, description, salary, company, email, new_job} = req.body

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    }) 
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

module.exports = router