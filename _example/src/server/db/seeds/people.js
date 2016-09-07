
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('people').insert({
          username: 'mherman',
          hobby: 'hike'
        }),
        knex('people').insert({
          username: 'bhasara',
          hobby: 'stuff'
        }),
        knex('people').insert({
          username: 'rhajek',
          hobby: 'phish'
        }),
        knex('people').insert({
          username: 'wreid',
          hobby: 'emoji'
        })
      ]);
    });
};
