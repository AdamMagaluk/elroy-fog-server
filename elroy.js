var titan = require('titan');
var siren = require('argo-formatter-siren');
var DevicesResource = require('./api_resources/devices');


module.exports = elroy;

function elroy(opts){

  this.deviceDrivers = {};
  
  this.scouts = {};

  this.apps = {};

  this._init();

  this.opts = opts || {};
};

elroy.prototype._init = function(){
  this.server = titan();

  this.server
    .allow('*')
    .compress()
    .logger()
    .format({ engines: [siren], override: {'application/json': siren}})
    .add(DevicesResource, this.deviceDrivers)
    .listen(this.opts.port || 3000);
    
};

elroy.prototype.expose = function(endPoint,stateMachine){};

elroy.prototype.device = function(deviceKey){};

elroy.prototype.load = function(driver){};

elroy.prototype.scout = function(scout){};
