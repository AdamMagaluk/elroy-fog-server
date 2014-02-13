var titan = require('titan');

module.exports = elroy;

function elroy(opts){

  this.deviceDrivers = {};
  
  this.scouts = {};

  this.apps = {};

  this._init();
}

elroy.prototype._init = function(){};

elroy.prototype.expose = function(endPoint,stateMachine){};

elroy.prototype.device = function(deviceKey){};

elroy.prototype.load = function(driver){};

elroy.prototype.scout = function(scout){};