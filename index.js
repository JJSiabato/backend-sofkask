const {request, reponse} = require('express');
const express = require('express')
const cors = require('cors')
const app = express();
let questions = require('./questions')

//integración de CORS 
app.use(cors())
app.use(express.json())

//endpoint preguntas
app.get('/api/questions', (request, response)=>{
    response.json(questions)
}
)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`El servidor está corriendo en el puerto ${PORT}`))