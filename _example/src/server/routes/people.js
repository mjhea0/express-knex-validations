const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const validations = require('./validations');

router.get('/', (req, res, next) => {
  // grab all the people from the database
  knex('people').select()
  .then((results) => {
    const renderObject = {};
    renderObject.people = results;
    // send the people with the res.render
    res.render('people', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', validations.verify, (req, res, next) => {
  // grab the values to add to the db via req.body
  const username = req.body.username;
  const hobby = req.body.hobby;
  // add values to database
  knex('people').insert({
    username: username,
    hobby: hobby
  })
  .then((results) => {
    // redirect user
    res.redirect('/people');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
