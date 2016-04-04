/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

config['authn-did'] = {};
config['authn-did'].routes = {
  login: '/authn-did/login'
};

// pseudo bower package
var rootPath = path.join(__dirname, '..');
config.requirejs.bower.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'bower.json')
});
