const express = require("express");
const router = express.Router();
const multer = require('multer');


const chechAuth= require('../middleware/check-auth');

const UserController = require('../controllers/user');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
  }
});
const fileFilter = (req, file, cb)=>{
  // reject a file
      if(file.mimetype === 'image/jpeg'|| file.mimetype==='image/png'){
          cb(null,true);
      }
      else{
          cb(null,false);
      }
  
  
  };
  
  const upload= multer({
      storage: storage,
      limits:{
      fileSize: 1024*1024*5
  },
  fileFilter:fileFilter
  });


router.post('/signup', upload.single('imageUser'),UserController.user_signup);

  router.post('/login', UserController.user_login);
  
  router.patch('/:userId', UserController.update_user);

  router.delete("/:userId",chechAuth,UserController.user_delete_user);

  router.get("/", UserController.user_find_user);
  

  module.exports = router;

  