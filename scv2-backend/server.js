const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const campaignRouter = require('./routers/campaign')

const app = express()
const port = process.env.PORT || 8080
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3001']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)
app.use(campaignRouter)

// Then pass them to cors:
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})