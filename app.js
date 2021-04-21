const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/products');
const matchRoutes = require('./api/routes/matches');
const userRoutes= require('./api/routes/users');

const { MONGO_URI } = require('./config')

const postsRoutes = require('./api/routes/products')

//connect to MongoDB

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;


//User routes

app.use('/api/products', postsRoutes)
  
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Controll-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods',
        'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});




// localhost:3001/user/signup

app.post('addUser', (req,res)=>{
    
    const firstName= req.body.name;
    const lastnam=  req.body.lname;
    const phone=  req.body.phone;
    const email = req.body.email;
    const password = req.body.email;
    const age=  req.body.age;

    

res.end();

});



//routes which should handle requests


app.use(express.static("./Frontend/HTML"));
app.use('/products', productRoutes);
app.use('/matches',matchRoutes);
app.use('/user',userRoutes);

app.use((req,res,next)=>{
const error = new Error ('Not found');
error.status = 404;
next(error);

});

app.use((error, req,res,next)=>{
res.status(error.status||500);
res.json({
    error:{
        message: error.message

    }
});
});

module.exports = app;