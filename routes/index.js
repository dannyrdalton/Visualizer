var app = require('../app');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index');
};

exports.join = function(req, res) {
    res.render('join');
};

exports.create = function(req, res) {
    res.render('create');
};

exports.display = function(req, res) {
    res.render('display', { name : req.params.name });
};

exports.input = function(req, res) {
    res.render('input', { name : req.params.name });
};