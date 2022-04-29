const {model, Schema} = require('mongoose')

//definiendo esquema

const questionSchema = new Schema({
    pregunta: String,
    res1: String,
    res2: String,
    res3: String,
    res4: String,
    correcta: Number,
    categoria: Number,
    scope:String,
    img:String
})

// transformar la respuesta de la BD

questionSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
}})

//definiendo modelo

const Question = model('Question', questionSchema)

module.exports = Question