var util = require('util')
  , events = require('events');

function ElroyDriver(){
  events.EventEmitter.call(this);  
}
util.inherits(events.EventEmitter,ElroyDriver);

