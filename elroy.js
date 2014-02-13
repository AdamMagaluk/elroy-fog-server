var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , titan = require('titan');

var titan = require('titan');
var siren = require('argo-formatter-siren');
var DevicesResource = require('./api_resources/devices');

module.exports = elroy;

function elroy(opts){

  this.deviceDrivers = {};
  
  this.scouts = [];

  this.apps = [];
  
  this.opts = opts || {};

  this._init();
};

elroy.prototype._init = function(){
  this.server = titan();

  this.server
    .allow('*')
    .compress()
    .logger()
    .format({ directory : path.join(__dirname,'api_formats'), engines: [siren], override: {'application/json': siren}})
    .add(DevicesResource, this.deviceDrivers)
    .listen(this.opts.port || 3000);
    
  // setup server

  // load all scouts
  this._initScouts(function(err){});

//  this._initApps(function(err){});
  
};

// expose a state machine as an api to the cloud.
elroy.prototype.expose = function(endPoint,stateMachine){};

// return a device driver for the key
elroy.prototype.device = function(deviceKey){
  return this.deviceDrivers[deviceKey];
};

// load a device driver into the fogserver
elroy.prototype.load = function(driver){
  var test = {on : function(){return this;}};
  driver.init(test /*config...*/ );

  // load device driver into devices
  this.deviceDrivers[driver.name] = driver;
};

// loads all scouts in /scouts dir
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

// loads all scouts in /scouts dir
elroy.prototype._initApps = function(callback){
  var self = this;

  var file = path.join(process.cwd(),'app.js');
  var app = require(file)(this);
  this.apps = [app];

  callback();
};
