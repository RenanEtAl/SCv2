const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ren:cLkcMkK1lWRw6szF@cluster0-eaovm.mongodb.net/kickstart?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})