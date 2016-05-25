/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

config['authn-did'] = {};
config['authn-did'].routes = {
  login: '/authn/did/login'
};
