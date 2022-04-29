require('dotenv').config()
require('./BDconnection/mongo')
const mongoose = require('mongoose')
const UserSchema = require('./BDconnection/models/users')
const QuestionSchema = require('./BDconnection/models/question')
const {request, response} = require('express');
const express = require('express')
const cors = require('cors');
const bodyParser =  require('body-parser');
const app = express();





//integración de CORS 
app.use(cors())
app.use(express.json())

app.get('/users', (request, response)=>{
    UserSchema.find({})
    .then(user => response.json(user))
    
})
//endpoint preguntas
app.get('/api/questions', (request, response)=>{
    QuestionSchema.find({})
    .then(question =>response.json(question))
})
// parseador de body

const urlEncodeParser = bodyParser.urlencoded({extended:false})

//endpoint POST preguntas

app.post('/api/questions', urlEncodeParser, (request, response)=>{
    const obj = JSON.parse(JSON.stringify(request.body)); 
    let newQuestion = new QuestionSchema(
        {
            pregunta: obj.pregunta,
            res1: obj.res1,
            res2: obj.res2,
            res3: obj.res3,
            res4: obj.res4,
            correcta: obj.correcta,
            categoria: obj.categoria,
            scope:obj.escope,
            img:obj.img
        }        
    )
    newQuestion.save()
    .then(result=>
        res.redirect(req.get('referer')))
})

//endpoint POST usuarios
app.post('/ini',urlEncodeParser, (request, response)=>{   
    const obj = JSON.parse(JSON.stringify(request.body));
    let {name, pass} = obj;    
    let newUser = new UserSchema(
        {
            name: obj.name,
            score: 0,
            password: obj.pass
        }        
    )
    
    UserSchema.find({name}).then(result=>{
       if(result.password === pass && result.name === name){ 
           response.redirect(`http://127.0.0.1:5500/#/${name}`)
        }
        else if(result.password !== pass && result.name === name){
            response.send("usuario o contraseña invalida")
        }
        else if(result.name !== name){
            newUser.save()
                .then(result => {
                    response.redirect(`http://127.0.0.1:5500/#/${name}`)
                  
                }).catch(err =>console.error(err))
        }}
    )

    

    /* response.redirect('http://127.0.0.1:5500/#/categories') */

})



const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`El servidor está corriendo en el puerto ${PORT}`))