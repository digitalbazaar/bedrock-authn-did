/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './did-directive',
  './did-service'
], function(angular, didDirective, didService) {

'use strict';

var module = angular.module('bedrock.authn-did', []);

module.directive(didDirective);
module.service(didService);

/* @ngInject */
module.run(function(brAuthnService) {
  var options = {
    template: requirejs.toUrl('bedrock-authn-did/did.html')
  };
  brAuthnService.register('authn-did', options);
});

return module.name;

});
