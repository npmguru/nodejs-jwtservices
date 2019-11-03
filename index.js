const express       = require('express');
const http          = require('http');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const app           = express();
const router        = require('./router');
const mongoose      = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:27017/jwt',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
 })
.then(con => {
    console.log("DB Connection Successfully");
}).catch(e => {
    console.log("DB Connection Error ",e); 
});
  
// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type : '*/*'}));

router(app);

//Server Setup
const port          = process.env.PORT || 3090;
const server        = http.createServer(app);
server.listen(port);

console.log('Server running port',port); 




















