var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , titan = require('titan');

module.exports = elroy;

function elroy(opts){

  this.deviceDrivers = {};
  
  this.scouts = [];

  this.apps = {};

  this._init();
}

elroy.prototype._init = function(callback){

  // setup server

  // load all scouts
  this._initScouts(function(err){

  })
};

// expose a state machine as an api to the cloud.
elroy.prototype.expose = function(endPoint,stateMachine){};

// return a device driver for the key
elroy.prototype.device = function(deviceKey){};

// load a scout into the fogserver
elroy.prototype.load = function(driver){
  // load device driver into devices
  this.deviceDrivers[driver.name] = driver;
};

elroy.prototype._initScouts = function(callback){
  var self = this;
  var dir = path.join(process.cwd(), 'scouts');

  function initScout(file,done){
    var scout = require(path.join(dir,file));
    self.scout(scout,done);
  }

  // search dir /scouts
  var files = fs.readdirSync(dir);
  async.map(files,initScout,callback);
};

// load a scout into the fogserver
elroy.prototype.scout = function(scoutType,callback){
  var scout = new scoutType(this);
  this.scouts.push(scout);
  scout.init(callback);
};
