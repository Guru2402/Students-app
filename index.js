var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose	= require("mongoose"),
	ejs          = require("ejs");

mongoose.connect("mongodb://localhost/hackathon");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var teacherSchema = new mongoose.Schema({
    name:String,
    address:String,
    Email:String,
    position:String
});
var teachers = mongoose.model('teacher',teacherSchema);

var schoolSchema = new mongoose.Schema({
    schoolName:String,
    address:String,
    Email:String
});
var schools = mongoose.model('school',schoolSchema);

app.get('/', (req,res)=>{
    res.render('index');
})

app.get('/teachers', (req,res)=>{
    res.render('teachers');
})

app.post('/teachers',(req,res)=>{
    var name = req.body.firstName,
        address = req.body.address,
        Email = req.body.Email,
        position = req.body.position;
    
    var teacher = {
        name:name,
        address:address,
        Email:Email,
        position:position
    }
    
    teachers.create(teacher,(err,newUser)=>{
        if(err){
            console.log(err);
        }
        console.log(teacher);
    });
})

app.get('/school', (req,res)=>{
    res.render('school');
})

app.post('/school',(req,res)=>{
    var schoolName = req.body.schoolName,
        address = req.body.address,
        Email = req.body.Email,
        position = req.body.position;
    
    var school = {
        schoolName:schoolName,
        address:address,
        Email:Email,
        position:position
    }
    schools.create(school,(err,newUser)=>{
        if(err){
            console.log(err);
        }
        console.log(school);
    });
})




app.listen(8084 , ()=>{
    console.log("started")
});