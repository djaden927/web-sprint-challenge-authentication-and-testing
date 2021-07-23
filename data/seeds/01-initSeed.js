exports.seed = function(knex, Promise) {
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { username: 'jaden', password: "1234"},
          { username: 'walker', password: "1234"},
        ]);
      });
  };