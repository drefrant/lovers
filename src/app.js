// Imports needed modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const LoversGo = require('./utils/lovers')

// Loads env variables
require('dotenv').config()

// Creates app
const app = express()

// Initializes application port
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Creates base URL route "/" and render index view
app.get('', (req,res) => {
    res.render('index', {
        title: 'AsLoversGo',
    })
})

// Creates lover meter endpoint
app.post('/lovers', async (req, res) => {
    const {
        yourName,
        theirName
    } = req.body

    if (!yourName || !theirName) {
        return res.status(404).send({
            error: "Please provide all information"
        })
    }

    try {
        const meter = await LoversGo.getLovers(yourName, theirName)
        //const fname = meter.data.fname
        //const sname = meter.data.sname
        const percentage = meter.data.percentage
        const result = meter.data.result

        return res.json({
            result,
            percentage: percentage
        })
    } catch(e) {
        console.log(e)
        
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
})


// Catch all route, renders 404 page
app.get('*', (req, res) => {
    res.render('404', {
        search: 'page'
    })
})

// Directs app to listen on port specified previously
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})