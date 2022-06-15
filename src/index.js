const app = require('./app')

const port = process.env.PORT 

//admin 


app.listen(port, () => {
    console.log(`Server is on port + ${port}`)
})