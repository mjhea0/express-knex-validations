(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const peopleRoutes = require('../routes/people');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/people', peopleRoutes);

  };

})(module.exports);
