const express = require('express');
const app = express();
const server = require("http").Server(app);
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const config = require("./config");
const router = require("./router");

mongoose.set('useCreateIndex', true); //this to fix a deprecation

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.use('/api', router);
app.get('/', (req, res) => {
   res.send('Hello this is CHATTER application!');
});
let PORT = config.PORT;
server.listen(PORT, ()=>{
    console.log("server listen on port "+PORT+" with "+config.HOST);
});


