const knex = require('../db/knex');

function verify(req, res, next) {
  // container for all errors
  const errors = [];
  // grab values from req.body
  const username = req.body.username;
  const hobby = req.body.hobby;
  // is username blank?
  if (username === '') {
    errors.push('Username cannot be blank');
  }
  // is hobby blank?
  if (hobby === '') {
    errors.push('Hobby cannot be blank');
  }
  // is username unique?
  isUnique('username', username, (err, response) => {
    if (err) {
      return next(err);
    }
    if (response) {
      errors.push('Sorry that username is taken!');
    }
    // send back errors, if applicable
    if (errors.length) {
      // re-render page if there are errors
      const renderObject = {};
      renderObject.errors = errors;
      return res.render('new', renderObject);
    } else {
      // send to next middle if there are no errors
      return next();
    }
  });
}

// helper function

function isUnique(column, value, callback) {
  knex('people')
  .select()
  .where(column, value)
  .then((results) => {
    if (results.length) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  })
  .catch((err) => {
    callback(err);
  });
}

module.exports = {
  verify
};
