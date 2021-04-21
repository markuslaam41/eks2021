
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require("../models/user");

exports.user_signup =(req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
               name: req.body.name,
               lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                age: req.body.age,
               
 
              });
              user
                .save()
                .then(user => {
                  console.log(user);
                  res.status(201).json({
                    message: "User created"
                  });
                 
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  };
  
  exports.user_login = (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result){
              const token =  jwt.sign({
                    email : user[0],
                    userId:user[0]._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
                )
                return res.status(200).json({
                    message:"Auth successful",
                    token:token,
                   // userId:userId
                });
            }
        });

    } )
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

exports.user_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.user_find_user =  (req, res, next) => {
    User.find()
    .select('name lastname age imageUser ')
    .exec()
    .then(docs =>{
        const response = {
            count : docs.length,
            users: docs.map(doc => {
                return{
                    name: doc.name,
                    lastname: doc.lastname,
                    age:doc.age,
                    imageUser: doc.imageUser
                   
                }
            })

        };
       // if(docs.length>=0){
            res.status(200).json(response);
       // }
      //  else
      //  {
        //    res.status(404).json({
         //       message: "No entries"
        //    });
      //  }
       

    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};
  
exports.update_user =(req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for(const ops of req.body){
      updateOps[ops.propName] = ops.value;
  }
  Product.update({_id:id}, {$set:updateOps})
  .exec()
  .then(result => {
      
      res.status(200).json({
          message:"User updated",
          request:{
             type: "GET",
             url:"http://localhost:3001/user/" + id 
          }

      });

      })
      
  
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
  
};
