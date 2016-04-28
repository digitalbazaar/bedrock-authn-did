/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brAuthnDid', {
    bindings: {
      sysIdentifier: '@brIdentity',
      callback: '&brCallback'
    },
    controller: Ctrl,
    templateUrl:
      requirejs.toUrl('bedrock-authn-did/did-component.html')
  });
}

/* @ngInject */
function Ctrl($scope, brAlertService, brDidService, config) {
  var self = this;
  self.loading = false;

  self.login = function() {
    self.loading = true;
    navigator.credentials.get({
      query: {
        '@context': 'https://w3id.org/identity/v1',
        id: self.sysIdentifier || '',
        publicKey: ''
      },
      agentUrl: config.data['authorization-io'].agentUrl
    }).then(function(identity) {
      if(!identity || !identity.id) {
        throw new Error('DID not provided.');
      }
      return brDidService.login(identity);
    }).then(function(identity) {
      if(!identity) {
        return;
      }
      return self.callback({identity: identity});
    }).catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    }).then(function() {
      self.loading = false;
      $scope.$apply();
    });
  };
}

return register;

});
