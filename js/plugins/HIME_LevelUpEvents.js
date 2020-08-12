/*:
-------------------------------------------------------------------------
@title Level Up Events
@author Hime --> HimeWorks (http://himeworks.com)
@date Jun 15, 2020
@filename HIME_LevelUpEvents.js
@url http://himeworks.com/2015/10/level-up-events/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Allows you to run common events when an actor levels up
@help 
-------------------------------------------------------------------------
== Description ==

When an actor levels up, you may want to execute some custom logic.

Rather than writing a plugin to handle all of the possible behavior,
this plugin lets you build common events that will execute when an
actor levels up.

Each actor has their own level up common event, so you can easily
organize what should happen for each individual actor.

It is highly recommended that you install Common Event Queue as well
so that you can properly handle multiple level up's.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==
Jun 15, 2020
  - added support for adding level-up event to classes
Nov 30, 2015
  - added conditions where level up event should not be reserved
Nov 5, 2015
  - Fixed error where I cleared out Imported
Oct 27, 2015
  - Initial release
 
== Usage == 

Note-tag actors or classes with

  <level up event: COMMON_EVENT_ID>
  
Where the COMMON_EVENT_ID is the number of your common event.
For example you might say

  <level up event: 2>
  
To run the second common event in your database.
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} 
var TH = TH || {};
Imported.LevelUpEvents = 1;
TH.LevelUpEvents = TH.LevelUpEvents || {};

(function ($) {

  $.Regex = /<level[-_ ]up[-_ ]event:\s*(\d+)>/i;

  var TH_LevelUpEvent_GameActorLevelUp = Game_Actor.prototype.levelUp;
  Game_Actor.prototype.levelUp = function() {
    TH_LevelUpEvent_GameActorLevelUp.call(this);    
    this.onLevelUp();
  }
  
  /* New */
  Game_Actor.prototype.onLevelUp = function() {
    if (this.canRunLevelUpEvent()) {
      
      // run actor level up event
      $gameTemp.reserveCommonEvent(this.actorLevelUpEventId());
      
      // run actor's class level up event
      $gameTemp.reserveCommonEvent(this.classLevelUpEventId());
    }    
  }
  
  Game_Actor.prototype.canRunLevelUpEvent = function() {
    if (DataManager.isBattleTest()) {
      return false;
    }
    return true;
  }
  
  /* Returns level up event ID. Lazy-load as needed */
  Game_Actor.prototype.actorLevelUpEventId = function() {
    if (this._actorLevelUpEventId !== undefined) {
      return this._actorLevelUpEventId;
    }
    this._actorLevelUpEventId = 0;
    var res = $.Regex.exec(this.actor().note);
    if (res) {
      this._actorLevelUpEventId = Math.floor(res[1]);
    }
    return this._actorLevelUpEventId;
  }
  
  Game_Actor.prototype.classLevelUpEventId = function() {
    if (this._classLevelUpEventId !== undefined) {
      return this._classLevelUpEventId;
    }
    this._classLevelUpEventId = 0;
    var res = $.Regex.exec(this.currentClass().note);
    if (res) {
      this._classLevelUpEventId = Math.floor(res[1]);
    }
    return this._classLevelUpEventId;
  }
})(TH.LevelUpEvents);