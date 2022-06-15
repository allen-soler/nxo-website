const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')
const userRouter = require('./routers/users')
const adminRouter = require('./routers/admin')

const app = express();

//Define hbs paths
const pwd = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//hbs engines and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

//set up static viewer / expressjson
app.use(express.static(pwd))
app.use(express.json())
app.use(userRouter)
app.use(adminRouter)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jorge Allen'
    });
})

module.exports = app