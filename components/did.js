/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './did-directive'
], function(angular, passwordDirective) {

'use strict';

var module = angular.module('bedrock.authn-did', []);

module.directive(passwordDirective);

/* @ngInject */
module.run(function(brAuthnService) {
  var options = {
    template: requirejs.toUrl('bedrock-authn-did/did.html')
  };
  brAuthnService.register('authn-did', options);
});

return module.name;

});
