const express = require('express')
const app = express()
const colors = require('colors')
const bodyParser =  require('body-parser')
const cookieParse = require('cookie-parser')

app.use('/img',express.static('./assets/img'))
app.use(cookieParse())
app.use(bodyParser.json())
app.use(bodyParser.raw())
const userRouter = require('./routes/v1/user')

app.use('/v1/user',userRouter)

app.listen(3001, () => {
    console.log('app is started at http://localhost:3001'.green)
})