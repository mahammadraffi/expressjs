// load express module

const express=require('express');
const mongoose=require('mongoose');
var exphbs=require('express-handlebars');//loading express handle bar module
var bodyParser = require('body-parser');//load module
const app=express();
//load schema model here
require('./model/post') //loading schema
const post=mongoose.model('posts') //mangoose collection name
//middleware
// express handlebars middleware here
app.engine('handlebars', exphbs()); // what is the template engine we are going to set here
app.set('view engine', 'handlebars');
// end express handlebars middleware here
// app.use((req,res,next)=>{
//     console.log(new Date().toString());//middleware
//     console.log(new Date().toLocaleTimeString());
//     next();
// });

// connection b/w node and mangodb use library mangoose this mangoose ODM install mangoose  
// to install npm install mongoose --save or yarn add mangoose
const mangodburl=
"mongodb+srv://jspiders:8978735686@Sr@cluster0-ngcyd.mongodb.net/test?retryWrites=true&w=majority"
// connect to database
mongoose.connect(mangodburl,{useNewUrlParser:true},err =>{
    if(err)throw err;
    else console.log("database is connected");
    
})

// serve static files like html css js bootstrap fonts ex
app.use(express.static(__dirname+'/public'));

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


//express routing
app.get('/',(req,res)=>{
    // res.send(`<h1>hello expressjs</h1>`)
    res.render('home.handlebars');
});

//addpost route get method here because getting template
app.get('/posts/addpost',(req,res)=>{
    res.render('posts/addpost')
});
// crete form data using http post method
app.post('/posts/addpost',(req,res)=>{
// res.send('ok');
// const title=req.body.title;
// const email=req.body.email;
// const phonenumber=req.body.phonenumber;
// const details=req.body.details;
// console.log(title,email,phonenumber,details);

//server side validation
const errors=[];
if(!req.body.title){
    errors.push({text:"title is required"});
}
if(!req.body.details){
    errors.push({text:"details is required"});
}
if(!req.body.email){
    errors.push({text:"email is required"});
}
if(!req.body.phone){
    errors.push({text:"phonenumber is required"});
}
if(errors.length>0){
    res.render('posts/addpost',{
        errors:errors,
        title:req.body.title,
        phone:req.body.phone,
        email:req.body.email,
        details:req.body. details
    });
}else{
    const newposts={
        title:req.body.title,
        phone:req.body.phone,
        email:req.body.email,
        details:req.body.details
    }
    new post(newposts)
    .save()
    .then(post =>{
console.log(post);
res.redirect("/")

    }).catch(err =>console.log(err));
    
}
});


const port=process.env.PORT||5555;
app.listen(port,(err)=>{
    if(err)throw err;
    console.log('express js is running on port number '+port);
});