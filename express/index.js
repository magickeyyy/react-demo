const app = require('express')()
const colors = require('colors')

const userRouter = require('./routes/user')

app.use('/user',userRouter)

app.listen(3001, () => {
    console.log('app is started at http://localhost:3001'.green)
})