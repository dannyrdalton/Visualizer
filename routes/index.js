var app = require('../app');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index');
};

exports.join = function(req, res) {
    res.render('join'/* , { layout : false } */);
};

exports.create = function(req, res) {
    res.render('create'/* , { layout : false } */);
};

exports.display = function(req, res) {
    res.render('display'/* , { layout : false } */);
};

exports.input = function(req, res) {
    res.render('input'/* , { layout : false } */);
};