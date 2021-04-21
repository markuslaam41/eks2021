const mongoose = require("mongoose");

const Match = require("../models/match");
const Product = require("../models/product");


exports.matches_get_all =(req, res, next) => {
    Match.find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          matches: docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3001/matches/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }

  exports.matches_create_match = (req, res, next) => {
    Product.findById(req.body.productId)
      .then(name => {
        if (!name) {
          return res.status(404).json({
            message: "Name not found"
          });
        }
        const match = new Match({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          name: req.body.productId
        });
        return match.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Match",
          createdMatch: {
            _id: result._id,
            name: result.name,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3001/matches/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  
  exports.matches_get_match = (req, res, next) => {
    Match.findById(req.params.matchId)
      .exec()
      .then(match => {
        if (!match) {
          return res.status(404).json({
            message: "Match not found"
          });
        }
        res.status(200).json({
          match: match,
          request: {
            type: "GET",
            url: "http://localhost:3001/matches"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
  
  exports.delete_match = (req, res, next) => {
    Match.remove({ _id: req.params.matchId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Match deleted",
          request: {
            type: "POST",
            url: "http://localhost:3001/matches",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }