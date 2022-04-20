var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//const fileUpload = require('express-fileupload');
var logger = require('morgan');
const cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer=require('multer')
let {PythonShell}=require("python-shell")

var app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage })
var uploadMultiple = upload.fields([{ name: 'file1' }, { name: 'file2'}])
app.post('/uploadfile', uploadMultiple, function (req, res, next) {

  if(req.files){
      name1=req.files['file1'][0]['filename'];
      path1=`${__dirname}/public/uploads/${name1}`
      name2=req.files['file2'][0]['filename'];
      path2=`${__dirname}/public/uploads/${name2}`
      let options ={
        args :[path1,path2],
        scriptPath:"C:/Users/Hiba Zouita/projetpfe/scriptPython"
        
         //scriptPath : "C:/Users/Hiba Zouita/projetpfe/back-end/routes",  
      };
        PythonShell.run("scriptpython.py",options,function(err,res){
        if (res){
          console.log(res);
          let resulat=res
          console.log(resulat[0])
        } 
        if (err) console.log(err);
       })
      

      console.log("files uploaded")
      res.json({"filePath1":resulat[0],"filePath2":resultat[1]})
  }
  else{
    console.log("errrrrr")
  }
  
})

//test
//app.use(fileUpload());
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  
  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `${file.name}` });
    place=`${__dirname}/uploads/${file.name}`
    let options ={
      args :[place],
      scriptPath:"C:/Users/Hiba Zouita/projetpfe/scriptPython"
      
       //scriptPath : "C:/Users/Hiba Zouita/projetpfe/back-end/routes",  
    };
      PythonShell.run("scriptpython.py",options,function(err,res){
      if (res) console.log(res);
      if (err) console.log(err);
     })

    //hounii toud

  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

