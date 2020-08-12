/*:
-------------------------------------------------------------------------
@title Common Event Queue
@author Hime
@date Nov 5, 2015
-------------------------------------------------------------------------
@plugindesc Allows you to reserve multiple common events.
@help 
-------------------------------------------------------------------------
== Description ==

By default, if you try to reserve multiple common events, the engine
will only execute the last one.

This plugin allows you to call multiple common events and make sure that
the engine executes every one of them.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==
Nov 5, 2015
  - Fixed error where I cleared out Imported
Oct 27, 2015
  - Initial release
 
== Usage == 

Plug-and-play
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} 
var TH = TH || {};
Imported.CommonEventQueue = 1;
TH.CommonEventQueue = TH.CommonEventQueue || {};

(function ($) {

  var TH_CommonEventQueue_GameTemp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    TH_CommonEventQueue_GameTemp_initialize.call(this);
    this._commonEventQueue = [];
  };
  
  Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    if (commonEventId > 0) {
      this._commonEventQueue.push(commonEventId);
    }
  };
  
  Game_Temp.prototype.isCommonEventReserved = function() {
    return this._commonEventQueue.length > 0;
  };
  
  Game_Temp.prototype.reservedCommonEvent = function() {
    var id = this._commonEventQueue.shift()    
    return $dataCommonEvents[id];
};
})(TH.CommonEventQueue);