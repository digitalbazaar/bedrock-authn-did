/*
 * Bedrock DID login module.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
/* jshint node: true */
'use strict';

var bedrock = require('bedrock');
var brPassport = require('bedrock-passport');
var BedrockError = bedrock.util.BedrockError;
var config = bedrock.config;

require('bedrock-requirejs');
require('./config');

// module API
var api = {};
module.exports = api;

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  var routes = config['authn-did'].routes;
  app.post(routes.login, api.login);
});

/**
 * Attempt to establish an authorized session for the user that sent the
 * request. Upon success, a status code of 200 and the identity that was
 * authenticated are sent to the client.
 *
 * @param req the request.
 * @param res the response.
 * @param next the next route handler.
 */
api.login = function(req, res, next) {
  brPassport.authenticate('did', function(err, user) {
    if(!user) {
      // user not authenticated
      err = new BedrockError(
        'The given decentralized identity could not be authenticated.',
        'NotAuthenticated', {'public': true, httpStatusCode: 400}, err);
    }
    if(err) {
      return next(err);
    }
    req.login(user, function(err) {
      if(err) {
        return next(err);
      }
      res.status(200).send(user.identity);
    });
  })(req, res, next);
};
