/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

config['authn-did'] = {};
config['authn-did'].routes = {
  login: '/authn/did/login'
};
