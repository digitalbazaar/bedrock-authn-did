/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($http) {
  var service = {};

  service.login = function(authData) {
    return Promise.resolve($http.post('/authn-did/login', authData))
      .then(function(response) {
        return response.data;
      });
  };

  return service;
}

return {brDidService: factory};
});
