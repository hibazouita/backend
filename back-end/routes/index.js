var express = require('express');
var router = express.Router();
const multer=require("multer");
const fileUpload=multer();
let {PythonShell}=require("python-shell")
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/fileUpload',fileUpload.single('file1'),function(req,res,next){
  res.status(200).json({
    sucess:"Trueeee"
})
  let options ={
  args :[req.body],
  scriptPath:"C:/Users/Hiba Zouita/projetpfe/scriptPython"
  
   //scriptPath : "C:/Users/Hiba Zouita/projetpfe/back-end/routes",  
};
  PythonShell.run("scriptpython.py",options,function(err,res){
  if (res) console.log(res);
  if (err) console.log(err);
 })
  //console.log(req.file);
});

module.exports = router;
