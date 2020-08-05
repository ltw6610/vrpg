'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//=============================================================================
// EISPersistentSwitches.js
//=============================================================================

/*:
* @author Kino
* @plugindesc This plugin allows you to setup persisten switches and variables
* in your RPGMakerMV Game <EISPersistentSwitch>.
*
*
* @help
* version 1.0.0
//=============================================================================
//  Introduction
//=============================================================================
*
* This plugin allows you to set switches and variables that will be
* saved outside of the game's save data. This allows you to maintain
* watch over important switches in your RPGMakerMV game.
* The file data is stored in your data/ folder, and is in a file called
* "persistent.json".
* The file is encoded in deployment to remain small and also unreadable
* to the player. (Don't want them messing with your switches right?!)
* In development, the file output is readable.
//=============================================================================
//  Script Calls
//=============================================================================
*
* $persistentSwitches.setValue(idNumber, boolean)
* Example: $persistenSwitches.setValue(1, true);
*
* $persistentVariables.setValue(idNumber, anything);
* Examples:
* $persistentVariables.setValue(1, 1);
* $persistentVariables.setValue(2, "Hello World");
* $persistentVariables.setValue(3, {name: "Tim"});
* $persistentVariables.setValue(4, null);
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Website Link: http://endlessillusoft.com/
* Twitter Link: https://twitter.com/EISKino
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/

(function () {
  var params = $plugins.filter(function (plugin) {
    return (/<EISPersistentSwitch>/ig.test(plugin.description)
    );
  })[0].parameters;

  function setup() {
    //=============================================================================
    //  Functions & Constants
    //=============================================================================
    var FS = require('fs');
    var PATH = require('path');
    var FILENAME = "persistent.json";

    var setBasedOnType = function setBasedOnType(type) {
      return function (id, value, array) {
        if (type.some(function (element) {
          return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === element;
        })) {
          array[id] = value;
        } else console.error('Invalid Type: ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
      };
    };

    var writeCompressedJSON = function writeCompressedJSON(path, filename, json) {
      var data = "";
      data = Utils.isOptionValid("test") ? JSON.stringify(json) : LZString.compressToBase64(JSON.stringify(json));
      var base = PATH.dirname(process.mainModule.filename);
      var filePath = PATH.join(base, path);
      if (!FS.existsSync(filePath)) {
        FS.mkdirSync(filePath);
      }
      FS.writeFileSync(filePath + '/' + filename, data);
    };

    var readCompressedJSON = function readCompressedJSON(path, filename) {
      var data = "";
      var base = PATH.dirname(process.mainModule.filename);
      var filePath = PATH.join(base, path);
      if (FS.existsSync(filePath + '/' + filename)) {
        data = FS.readFileSync(filePath + '/' + filename, 'utf8');
        return Utils.isOptionValid("test") ? JSON.parse(data) : JSON.parse(LZString.decompressFromBase64(data));
      } else return false;
    };

    var setBasedOnBoolean = setBasedOnType(["boolean"]);
    var setBasedOnAnyType = setBasedOnType(["undefined", "object", "number", "string", "boolean"]);

    var TEMPLATE = {
      _data: []
    };

    var METHODS = {
      clear: function clear() {
        this._data = [];
      },
      onChange: function onChange() {
        $gameMap.requestRefresh();
      }
    };
    //=============================================================================
    //  PersistenSwitches
    //=============================================================================
    var PersistentSwitches = JSON.parse(JSON.stringify(Object.assign({}, TEMPLATE)));
    Object.assign(PersistentSwitches, METHODS, {
      setValue: function setValue(id, value) {
        setBasedOnBoolean(id - 1, value, this._data);
        this.onChange();
      },
      value: function value(id) {
        return this._data[id - 1] || false;
      }
    });

    //=============================================================================
    //  PersistenVariables
    //=============================================================================    
    var PersistentVariables = JSON.parse(JSON.stringify(Object.assign({}, TEMPLATE)));
    Object.assign(PersistentVariables, METHODS, {
      setValue: function setValue(id, value) {
        setBasedOnAnyType(id - 1, value, this._data);
        this.onChange();
      },
      value: function value(id) {
        return this._data[id - 1] || 0;
      }
    });
    //=============================================================================
    //  DataManager
    //=============================================================================
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
      var contents = _DataManager_makeSaveContents.call(this);
      writeCompressedJSON("data/", FILENAME, {
        switches: PersistentSwitches._data,
        variables: PersistentVariables._data
      });
      return contents;
    };
    //=============================================================================
    //  Scene_Boot
    //=============================================================================
    var _SceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
      _SceneBoot_start.call(this);
      var contents = readCompressedJSON("data/", FILENAME);
      if (contents !== false) {
        PersistentSwitches._data = contents.switches || [];
        PersistentVariables._data = contents.variables || [];
      }
    };
    //=============================================================================
    //  Exports
    //=============================================================================
    Object.assign(window, {
      $persistentSwitches: PersistentSwitches,
      $persistentVariables: PersistentVariables
    });
  }
  if (Utils.isNwjs()) setup();
})();