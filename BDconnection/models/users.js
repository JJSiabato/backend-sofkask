const {model, Schema} = require('mongoose')

//definiendo esquema

const userSchema = new Schema({
    name: String,
    score: Number,
    password: String
})

// transformar la respuesta de la BD

userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
}})

//definiendo modelo

const User = model('User', userSchema)

module.exports = User