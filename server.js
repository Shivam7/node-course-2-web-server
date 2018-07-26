const express =require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT||3000;
var app=express();

//support to partilas for handle bar partials to run nodemon server.js -e js,hbs
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
return "till"+ new Date().getFullYear() 
});
app.set('view engine','hbs');
//middleware to serve html page
app.use(express.static(__dirname + '/public'));

//using middleware for performing task
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url} ${req}`;
    console.log(log);
    fs.appendFileSync('server.log',log+'\n');
next();

});

/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});*/



//http route handler  httpgetrequest

app.get('/',(req,res)=>{
   // res.send('<h1>Hello Express</h1>');
 /*  res.send({
       name:"Shivam",
       Likes:["Cricket","Coding"]
   })*/
   res.render('home.hbs',{
    pageTittle:"home page",
    currentDate:new Date().getFullYear() 
   })

});

app.get('/about',(req,res)=>{
//res.send("About we page");
res.render('about.hbs',{
    pageTittle:"About Us",
    currentDate:new Date().getFullYear()
});
})

app.get('/bad',(req,res)=>{
    res.send({
        "Error":"requested page not found"
    })
})
app.listen(port);