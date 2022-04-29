const mongoose = require('mongoose');
const connectionString = process.env.BD_URI

// conexión a mongoDB

mongoose.connect(connectionString)
.then(()=>{
    console.log("BD OK")
}).catch(err => console.error(err))





