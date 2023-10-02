const about_us = require('../Models/about.model');
up = require('./upload.controller');
fs = require('fs');


exports.get_list = function(req,res){
    about_us.get_all(function(data){
        res.send({result: data })
    })
};