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

router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('people')
  .del()
  .where('id', id)
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].username} is gone!`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

router.put('/update/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const updatedUsername = req.body.username;
  const updatedHobby = req.body.hobby;
  knex('people')
  .update({
    username: updatedUsername,
    hobby: updatedHobby
  })
  .where('id', id)
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].username} has been updated!`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

module.exports = router;
