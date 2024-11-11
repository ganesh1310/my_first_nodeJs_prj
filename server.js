// // console.log('srver file is created');

// // function add(a,b){
// //     return a+b;
// // }

// // var add = function(a,b){
// //     return a+b;
// // }

// // var add = (a,b) => a+b;
// // var result = add(40,20);
// // console.log(result);

// //autocalled function
// (function(){
//     console.log('autocalled function');
// })();

// //callback function

// // function callback(){
// //     console.log('Sum is calculated');
// // }

// const add = function (a,b,callback){ //function takes another function as a parameter
//     console.log('Sum is :',a+b);  //main function executeed
//     callback();                   //callback function called
// }   
// // add(10,20,callback);

// // add(2,3,function(){
// //     console.log('Add completed!');
// // })
 
// add(10,20,()=>{console.log('Add completed!')});

//---------------------------------------------------------Modules use---------------------------------------------------------------------------------

//to use any package in our code or file we have to import that package using below code
// var fs = require('fs');
// var os = require('os');

//user their inbuilt function
// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// can create a file to send the data and when we run the file it will create a file with the data
// calback function is used to check the error and its mandatory to use it
// fs.appendFile('greetings.txt','Hello '+user.username+'!\n',(err)=> {console.log('Data is appended!')});

// built in methods in 'fs' and 'os' packages
// console.log(fs);
// console.log(os); 

//to import any file we have to use require function
// const notes = require('./notes.js');
// console.log('server file is here!');
// var age = notes.age;
// console.log(age);

// var result = notes.addNumber(age+10,20);
// console.log('result is', result);


// //npm loadash - to deal with data and perform operation to process it    
// var _ = require('lodash');
// var uniqueData = _.uniq([1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]);
// console.log(uniqueData); //[1,2,3,4,5,6,7,8,9]
// console.log(_.isString('Hello')); //true
// console.log(_.isString(10)); //false


//------------------------------------------------------JSON DATA -------------------------------------------------------------

// const jastring = '{"name":"Rahul","age":25}';
// //convert json data to to object
// const person = JSON.parse(jastring);
// console.log(person.age); //O/P: 25
// //convert jason object to string
// const personString = JSON.stringify(person);
// console.log(personString);//O/P: {"name":"Rahul","age":25}


//------------------------------------------------------creating our own server using express-------------------------------------------------------------

//we need to install express package using npm - npm install express --save

// const express = require('express'); //importing express package
// const app = express();              //creating an instance of express to desing our server

// app.get('/',(req,res)=>{            //creating a route ('/') and a callback function
//     res.send('Welcome to my Hotel... What I can serve you sir!');     //sending a response
// });

// app.get('/chicken',(req,res)=>{       
//     res.send('Will deliver you in 5 mins!');   
// });     

// app.get('/beef',(req,res)=>{   
//     var customize_beef = {
//         name : 'Beef Burger',
//         price : 10, 
//         is_souce : true,
//         is_fries : false
//     }      
//     // res.send('Will deliver you in 10 mins!');   
//     res.send(customize_beef);  //sending a json object   
// });

// app.listen(3000 , ()=>{   //creating a server on port 3000
//     console.log('Server is running on port 3000');
// });   

//to get data from client and save it use post

// app.post('/personData' , (req, res)=>{
//     res.send('Data is saved!');
// })


//------------------------------------------------------MongoDB-------------------------------------------------------------

//DB always have server to store , retrive and manage the data
//Node.js server handles HTTP Clients request connects with DB server and gives res. to client


const express = require('express');
const app = express();
const db = require('./db');   //importing MongoDB Object to use

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //to give data in proper format in req.body

const person = require('./models/person'); //import model created from schema
const menuModel = require('./models/menue')

app.get('/', (req , res)=>{
    res.send('Server is running....!');
})


//import route here && //allow server to use person route
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes); 

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})



//commented