const app = require('./app')

const port = process.env.PORT
app.listen(port, () => {
    console.log('Service is up on port ' + port)  ;
})