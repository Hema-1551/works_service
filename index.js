const express = require('express')
const cors = require('cors')
const app = express()
const Middleware = require('./middleware/index')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
dotenv.config()

app.use(helmet())
app.use(morgan('common'))

const port = process.env.PORT ||3200

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.get('/', (req, res) =>{
    res.send('<h1> Works Service</h1>')
})

const worksRoutes = require('./routes/work.routes')

app.use('/api/v1/works',worksRoutes)



// verify token before serving 

// app.use(Middleware.decodeToken)

// using user routes as middleware


mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, () => {
            console.log(`works Service microservice running on port ${port}`)
        })
    }).catch((error) => {
        console.log(`${error} \n Cannot connect to database!` )
    })