var express = require("express");

var router = express.Router();

//Importing the (sushi.js) file from the model
var sushi = require("../models/sushi.js");

//Routes using Route.get
router.get("/", function(req, res) {
    sushi.all(function(data) {
      var hbsObject = {
        cats: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/cats", function(req, res) {
    sushi.create([
      "sushi", "prepared"
    ], [
      req.body.name, req.body.prepared
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/cats/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    sushi.update({
      prepared: req.body.prepared
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/cats/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    sushi.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;
