/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(brAlertService, brDidService, config) {
  return {
    restrict: 'E',
    scope: {
      sysIdentifier: '@brIdentity',
      callback: '&brCallback'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-authn-did/did-directive.html'),
    link: Link
  };

  function Link(scope, element, attrs) {
    var model = scope.model = {};
    model.loading = false;

    model.login = function() {
      scope.loading = true;
      navigator.credentials.get({
        query: {
          '@context': 'https://w3id.org/identity/v1',
          id: scope.sysIdentifier || '',
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
        return scope.callback({identity: identity});
      }).catch(function(err) {
        brAlertService.add('error', err);
      }).then(function() {
        scope.loading = false;
        scope.$apply();
      });
    };
  }
}

return {brAuthnDid: factory};

});
