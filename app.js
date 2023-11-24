const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const app = express()

app.use(express.json())

const { eAdmin } = require("./middlewares/auth")


app.get('/', eAdmin, async (req, res) => {

   return res.json({
    "erro": false,
    "msg": "Listar usuários",
    userLogado: {
        "id": req.userId,
        "user": req.body.user,
    }
   })

})


app.post('/signUp', async (req, res) => {

    return res.json({
        "erro": false,
        "msg": "Cadastrar usuário"
    })

})

app.post('/signIn', async (req, res) => {

    console.log(req.body)

    if( req.body.user != 'Miguel') {
        return res.status(400).json({
            "erro": true,
            "msg": "Nome ou senha incorretos!"
        })
    }

    if(!(await bcrypt.compare(req.body.password, "$2a$08$7rSLHPdqiHXC/e8Fz8pKKeFJ2YpyG5b9ApehZ02uymrZa4dndYd.K"))) {
        return res.status(400).res.json({
            "erro": true,
            "msg": "Nome ou senha incorretos!"
        })
    }

    const token = jwt.sign({ id: 1 }, "ASCVB#$BCNWDFAJSASD$%FD", {
        // expiresIn: '7d' // 7 dias
        expiresIn: 10 // 1min
    })


    return res.json({
        "erro": false,
        "msg": "Login",
        token
    })

})


const PORT = 3000
app.listen(PORT, () => console.log("Servidor rodando na porta: "+PORT ))
