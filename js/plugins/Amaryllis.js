"use strict";
//=============================================================================
// Amaryllis.js
//=============================================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*:
* @author Kino
* @plugindesc Core plugin for EIS for ease of development.
*
* @help
* version 1.6.0
//=============================================================================
//  Changelog
//=============================================================================
* - Updated and Improved Timers
* - Added State Machine Class
* - Fixed some functions that had the wrong output
* - Added more utility functions
* - Added plugin command add function
* - Improved escape character processing
* - Added Stacks
* - Added Queues
//=============================================================================
//  Introduction
//=============================================================================
* A core plugin written in Typescript to maximize safety and compatability in
* all browsers using the latest es6 style code.
*
* There are also two aliases, but you can also make your own.
* Aliases
* amyl - Alias for all Amaryllis namespaces
* amryl - alias for all functions in the library.
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
/**
 * @namespace Amaryllis
 */
var Amaryllis;
(function (Amaryllis) {
    Amaryllis.IMPORTED = true;
    Amaryllis.VERSION = '1.3.5';
    Amaryllis.MV_NAME = Utils.RPGMAKER_NAME;
    Amaryllis.MV_VERSION = Utils.RPGMAKER_VERSION;
    /**
     * Creates a new State Machine with the given array of information.
     * @param {any[][]} buffer
     * @returns {Amaryllis.StateMachine}
     */
    function createStateMachine(buffer) {
        return new Amaryllis.StateMachine(buffer);
    }
    Amaryllis.createStateMachine = createStateMachine;
    function createBox(contents) {
        return new Amaryllis.Container(contents);
    }
    Amaryllis.createBox = createBox;
    /** Alias for createStateMachine */
    Amaryllis.createSM = createStateMachine;
    /**
     * @returns {PIXI.utils.EventEmitter}
     */
    function createEventEmitter() {
        return new PIXI.utils.EventEmitter;
    }
    Amaryllis.createEventEmitter = createEventEmitter;
    /**
     * Creates a stream with the given array of information.
     * @param {any[]} buffer
     * @returns {Amaryllis.Stream}
     */
    function createStream(buffer) {
        return new Amaryllis.Stream(buffer);
    }
    Amaryllis.createStream = createStream;
    /**
     * Creates a stack with the given array of information.
     * @param {any[]} [buffer=[]]
     * @returns {Amaryllis.Stack}
     */
    function createStack(buffer) {
        if (buffer === void 0) { buffer = []; }
        return new Amaryllis.Stack(buffer);
    }
    Amaryllis.createStack = createStack;
    /**
     * Creates a new queue with the given array of information.
     * @param {any[]} [buffer=[]]
     * @returns {Amaryllis.Queue}
     */
    function createQueue(buffer) {
        if (buffer === void 0) { buffer = []; }
        return new Amaryllis.Queue(buffer);
    }
    Amaryllis.createQueue = createQueue;
    /**
     * Creates an array of arrays as an Amaryllis Matrix.
     * You can add an array of arrays as the initial of the matrix also.
     * @param {number} [rows]
     * @param {number} [columns]
     * @param {any[][]} [initial=[[]]
     * @returns {Amaryllis.Matrix}
     */
    function createMatrix(rows, columns, initial) {
        if (initial === void 0) { initial = [[]]; }
        return new Amaryllis.Matrix(rows, columns, initial);
    }
    Amaryllis.createMatrix = createMatrix;
    /**
     * Creates a new timer that can be used to track events in your code
     * or in game.
     * @param {number} seconds
     * @returns {Amaryllis.Timer}
     */
    function createTimer(seconds) {
        return new Amaryllis.Timer(seconds);
    }
    Amaryllis.createTimer = createTimer;
    /**
     * Creates a new die with a set number of sides that will
     * return a random number.
     * @param {number} sides
     * @returns {Amaryllis.Die}
     */
    function createDie(sides) {
        return new Amaryllis.Die(sides);
    }
    Amaryllis.createDie = createDie;
    /**
     * Returns a function that can cache the results passed to it;
     * this works well for pure functions.
     * @param {Function} f
     * @returns {Function}
     */
    function memoize(f) {
        var cache = {};
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = JSON.stringify(arguments);
            if (cache[key])
                return cache[key];
            else {
                var val = f.apply(this, arguments);
                cache[key] = val;
                return val;
            }
        };
    }
    Amaryllis.memoize = memoize;
    /**
     * Returns plugin parameters using regular expression
     * matching on plugin description.
     * @param {RegExp} regex
     * @returns {object}
     */
    function getParams(regex) {
        return $plugins.filter(function (plugin) { return regex.test(plugin.description); })[0].parameters;
    }
    Amaryllis.getParams = getParams;
    /**
     * Parses a plugin parameters and replaces the
     * values with their primitive types (boolean, number, string).
     * @param {object} object
     * @returns {object}
     */
    function parseParams(object) {
        'use strict';
        var names = Object.getOwnPropertyNames(object);
        names.forEach(function (prop) {
            var value = object[prop];
            if (!Number.isNaN(Number(value))) {
                if (value.trim !== undefined && value.trim().length > 0)
                    object[prop] = Number(value);
                else
                    object[prop] = value;
            }
            else if (/true|false/i.test(value) && (value.trim().length < 6)) {
                object[prop] = /true/i.test(value) ? true : false;
            }
            else {
                try {
                    var obj = JSON.parse(value);
                    if (typeof obj === 'object') {
                        object[prop] = parseParams(obj);
                    }
                }
                catch (err) {
                    // console.log(err);
                }
            }
        });
        return object;
    }
    Amaryllis.parseParams = parseParams;
    /** @namespace Amaryllis.Game */
    Amaryllis.Game = {
        /**
         * Sets a range of game switches to the given value.
         * @param {number} start
         * @param {number} end
         * @param {boolean} value
         */
        setSwitches: function (start, end, value) {
            for (var i = start; i <= end; i++) {
                $gameSwitches.setValue(i, value);
            }
        },
        /**
         * Sets a range of game variables to the given value.
         * @param {number} start
         * @param {number} end
         * @param {*} value
         */
        setVariables: function (start, end, value) {
            for (var i = start; i <= end; i++) {
                $gameVariables.setValue(i, value);
            }
        },
        getEventSprite: function (event) {
            if (SceneManager._scene instanceof Scene_Map) {
                var scene = SceneManager._scene;
                var charSprites = scene['_spriteset']['_characterSprites'];
                var sprite = charSprites.filter(function (sprite) {
                    return sprite['_character'] === event;
                });
                if (sprite.length > 0) {
                    return sprite[0];
                }
                else {
                    return null;
                }
            }
        },
        /**
         * Returns a list of item effects.
         * @param {RPG.Item} item
         * @returns {any[]}
         */
        itemEffects: function (item) {
            var effects = item.effects
                .map(function (effect) { return Object.assign(effect, {
                code: effect.code,
                percentage: effect.value1,
                integer: effect.value2
            }); });
            return effects;
        },
        /**
         * Applies an item's effects to a Game_Battler.
         * @param {Game_Battler} target
         * @param {RPG.Item} item
         */
        applyEffects: function (target, item) {
            Amaryllis.Game.itemEffects(item)
                .forEach(function (effect) {
                var action = new Game_Action(target, true);
                action.applyItemEffect(target, effect);
            });
        },
        /**
         * Returns true if the item has the specific
         * item effect code.
         * @param {number} code
         * @param {RPG.Item} item
         * @returns {boolean}
         */
        hasItemCode: function (code, item) {
            return item.effects.some(function (effect) { return effect.code === code; });
        },
        partyHasSkill: function (skillId) {
            return $gameParty.members()
                .some(function (member) {
                return member.hasSkill(skillId);
            });
        }
    };
    /** @namespace Amaryllis.Str */
    Amaryllis.Str = {
        /**
         * Returns a trimmed lowercase string.
         * @param {string} string
         * @returns {string}
         */
        lowerCase: function (string) {
            return string.toLowerCase().trim();
        },
        /**
         * Returns a capitalized version of the string.
         * @param {string} string
         * @returns {string}
         */
        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        /**
         * Returns a version of the string with all words capitalized.
         * @param {string} string
         * @returns {string}
         */
        title: function (string) {
            return string.split(/\s/g).map(function (word) { return Amaryllis.Str.capitalize(word); }).join(" ");
        },
        /**
         * Returns a multiline string trimmed on each line.
         * @param {string} string
         * @returns {string}
         */
        trimLines: function (string) {
            return string.split(/\r\n|\n/)
                .map(function (x) { return x.trim(); }).join("\n");
        },
        /**
         * Splits a string into multiple
         * trimmed lines and returns an array.
         * @param {string} string
         * @returns {string[]}
         */
        splitLines: function (string) {
            return string.split(/\r\n|\n/);
        },
        /**
         * Returns the word count of a string.
         * @param {string} string
         * @returns {number}
         */
        wordCount: function (string) {
            return string.trim().split(/\s+/ig).length;
        },
        /**
         * Replaces double backslashes with escape codes
         * to recreate escape sequences.
         * @param {string} string
         */
        x1breplace: function (string) {
            return string.replace(/\\\\/ig, "\x1b");
        },
        x1breplace2: function (string) {
            return string.replace(/\\/ig, "\x1b");
        },
        /**
         * Removes lines from the string.
         * @param {string} string
         * @returns {string}
         */
        removeLines: function (string) {
            return string.replace(/\\n\\r|\n/ig, "");
        },
        /**
         * Returns the string spaced evenly.
         * @param {string} string
         * @returns {string}
         */
        monoSpace: function (string) {
            return string.replace(/\s{2,}/gi, " ");
        },
        leadingSpaces: function (string) {
            return string.search(/\S|$/);
        },
        spaceCount: function (string) {
            return string.split(" ").length - 1;
        }
    };
    /** @namespace Amaryllis.Num */
    Amaryllis.Num = {
        /**
         * Clamps the number between the specified min and max.
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: function (min, max) {
            return Math.min(Math.max(min), max);
        },
        /**
         * Returns a floored random number.
         * @param {number} number
         * @returns {number}
         */
        floorRand: function (number) {
            return Math.floor(Math.random() * number);
        },
        /**
         * Returns a ceil random number.
         * @param {number} number
         * @returns {number}
         */
        ceilRand: function (number) {
            return Math.ceil(Math.random() * number);
        },
        toHex: function (number) {
            return "0x" + number.toString(16).toUpperCase() + ")";
        },
        toBinary: function (number) {
            return number.toString(2);
        }
    };
    /** @namespace Amaryllis.Vector2 */
    Amaryllis.Vector2 = {
        /**
         * A function for moving smoothly between two points.
         *  amount is a number between 0 and 1.
         * @param {number} start
         * @param {number} end
         * @param {number} amount
         * @returns {number}
         */
        lerp: function (start, end, amount) {
            return (1 - amount) * start + amount * end;
        },
        normalize: function (x, y) {
            return { x: x, y: y };
        },
        normalizePlayerDirection: function (direction) {
            switch (direction) {
                case 2:
                    return { x: 0, y: 1 };
                case 4:
                    return { x: -1, y: 0 };
                case 8:
                    return { x: 0, y: -1 };
                case 6:
                    return { x: 1, y: 0 };
                default:
                    return { x: 0, y: 0 };
            }
        },
        magnitude: function (x, y) {
            return Math.sqrt((x * x) + (y * y));
        },
        magnitudeSquared: function (x, y) {
            return (x * x) + (y * y);
        },
        degreeToRadians: function (degree) {
            return (degree * Math.PI) / 180;
        },
        radiansToDegrees: function (radians) {
            return 180 * radians / Math.PI;
        },
        dotProduct: function (x1, y1, x2, y2) {
            return x1 * x2 + y1 * y2;
        },
        scalar: function (x1, y1, x2, y2) {
            return { x: x1 * x2, y: y1 * y2 };
        },
        withinRadius: function (x, y, radius) {
            return Amaryllis.Vector2.magnitude(x, y) <= radius;
        },
    };
    /** @namespace Amaryllis.Draw */
    Amaryllis.Draw = {
        drawColorRect: function (x, y, width, height, color, contents) {
            contents.fillRect(x, y, width, height, color);
        },
        drawBorder: function (x, y, width, height, borderWidth, color, contents) {
            contents.fillRect(x - borderWidth, y - borderWidth, width + borderWidth * 2, height + borderWidth * 2, color);
            contents.clearRect(x, y, width, height);
        }
    };
    /** @namespace Amaryllis.Filters
     * Alias for PIXI filters.
    */
    Amaryllis.Filters = {
        Blur: PIXI.filters.BlurFilter,
        Displacement: PIXI.filters.DisplacementFilter,
        FXAA: PIXI.filters.FXAAFilter,
        Noise: PIXI.filters.NoiseFilter,
        ColorMatrix: PIXI.filters.ColorMatrixFilter,
        Void: PIXI.filters.VoidFilter,
        addFilter: function (sprite, filter) {
            sprite.filters = sprite.filters === null ? [filter] :
                sprite.filters.concat([filter]);
        },
        addFilters: function (sprite, filters) {
            filters.forEach(function (filter) {
                Amaryllis.Filters.addFilter(sprite, filter);
            });
        },
        removeFilter: function (sprite, index) {
            if (sprite.filters !== null) {
                sprite.filters.splice(index - 1, 1);
            }
        }
    };
    /** @namespace Amaryllis.Request */
    Amaryllis.Request = {
        /**
         * Returns a promise after loading data via http GET request.
         * @param {string} url
         * @param {string} [mimeType='plain/text']
         * @returns {Promise}
         */
        loadData: function (url, mimeType) {
            if (mimeType === void 0) { mimeType = 'plain/text'; }
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = function () {
                    if (xhr.status < 400) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject("Failed to load: " + url);
                    }
                };
                xhr.send(null);
            });
        }
    };
    /** @namespace Amaryllis.Util */
    Amaryllis.Util = {
        isImagePath: function (path) {
            return path.split("/").length > 2 ? true : false;
        },
        /**
         * Returns whether input has been cancelled via touch or regular controls.
         * @returns {boolean}
         */
        inputCancelled: function () {
            return Input.isTriggered('cancel') || TouchInput.isCancelled();
        },
        /**
         * Adjusts a string to the specified type of number or string.
         * @param {string} value
         * @returns {string | number}
         */
        properType: function (value) {
            var temp = value.trim();
            var num = Number(temp);
            return Number.isNaN(num) ? temp : num;
        },
        /**
         * Returns a function that can be used to execute a
         * regular expression on a string.
         * If the value is null, returns null,
         * otherwise returns data.
         * @param {RegExp} regex
         * @returns {Function}
         */
        regExec: function (regex) {
            return function (string) {
                var data = regex.exec(string);
                regex.lastIndex = 0;
                if (data !== null) {
                    return data;
                }
                else {
                    return null;
                }
            };
        },
        /**
         * Returns a function that can be used to compare
         * an object if it's an instance of another.
         * @param {any} gameClass
         * @returns {Function}
         */
        isInstance: function (gameClass) {
            return function (object) {
                return object instanceof gameClass;
            };
        },
        /**
         * Runs the provide JavaScript code regardless of if it's a
         * function or a string.
         * @param {(string | Function)} code
         */
        executeCode: function (code) {
            if (typeof code === 'function')
                code();
            if (typeof code === 'string')
                Function(code)();
        },
        /**
         * Returns the current SceneManager._scene.
         * @returns {Scene}
         */
        currentScene: function () {
            return SceneManager._scene;
        },
        /**
         * Splits a path into a folder and file property object.
         * @param {string} path
         * @returns {object}
         */
        splitPath: function (path) {
            var splitPath = path.split("/");
            var folder = splitPath.slice(0, splitPath.length - 1).join("/") + "/";
            var file = splitPath[splitPath.length - 1].trim();
            return { folder: folder, file: file };
        },
        /**
         * Stringifys the data and compresses it in production mode.
         * @param {*} data
         * @returns {string}
         */
        stringify: function (data) {
            var compress = JSON.stringify(data);
            if (Amaryllis.Util.isTest()) {
                return compress;
            }
            else {
                return LZString.compressToBase64(compress);
            }
        },
        safeStringify: function (data) {
            try {
                return JSON.stringify(data);
            }
            catch (err) {
                return err;
            }
        },
        /**
         * Parses the data; if it's it production mode it will be decompressed.
         * @param {string} string
         * @returns {object}
         */
        parse: function (string) {
            try {
                if (Amaryllis.Util.isTest()) {
                    return JSON.parse(string);
                }
                else {
                    return JSON.parse(LZString.decompressFromBase64(string));
                }
            }
            catch (err) {
                return err;
            }
        },
        /**
         * Parses the data safely without crashing the game.
         * @param {string} string
         * @returns {object}
         */
        safeParse: function (string) {
            try {
                return JSON.parse(string);
            }
            catch (err) {
                return err;
            }
        },
        loadImage: function (path, hue) {
            if (hue === void 0) { hue = 0; }
            return Amaryllis.Util.isImagePath(path) ?
                ImageManager.loadNormalBitmap(path + ".png", hue) : null;
        },
        /**
         * Returns a number based on the game's default lineHeight.
         * @param {number} number
         * @returns {number}
         */
        lines: function (number) {
            return Window_Base.prototype.lineHeight() * number;
        },
        /**
         * Returns a rgb in css format string.
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @returns {string}
         */
        rgbToCss: function (red, green, blue) {
            return Utils.rgbToCssColor(red, green, blue);
        },
        /**
         * Returns rgb as a css hex string.
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         * @returns {string}
         */
        rgbToHex: function (red, green, blue) {
            var hex = PIXI.utils.rgb2hex([red, green, blue].map(function (x) { return x / 255; }));
            return PIXI.utils.hex2string(hex);
        },
        /**
         * Returns true if the game is running on desktop(nwjs).
         * @returns {boolean}
         */
        isNwjs: function () {
            return Utils.isNwjs();
        },
        /**
         * Returns true if the game is running on mobile.
         * @returns{boolean}
         */
        isMobile: function () {
            return Utils.isMobileDevice();
        },
        /**
         * Returns true if the game is in test mode.
         * @returns {boolean}
         */
        isTest: function () {
            return Utils.isOptionValid("test");
        },
        /**
         * Returns true if the game is in play test mode.
         * @returns {boolean}
         */
        isPlaytest: function () {
            return $gameTemp.isPlaytest();
        },
        /**
         * Shows an error msg if the game is on desktop and in play test
         * opening the Dev Console.
         * @param {string} msg
         */
        showError: function (msg) {
            console.error(msg);
            if (Utils.isNwjs() && Amaryllis.Util.isTest()) {
                var gui = require('nw.gui');
                gui.Window.get().showDevTools();
            }
        },
        /**
         * Logs information to the console only in test mode;
         * surppressed in production mode.
         * @param {string} msg
         */
        logt: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (Amaryllis.Util.isTest()) {
                return (_a = console.log).bind.apply(_a, [console].concat(args));
            }
            else {
                return function () { };
            }
        },
        /**
         * Creates a stack trace to the only on in test mode;
         * suppressed in production mode.
         * @param {any} args
         */
        tracet: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (Amaryllis.Util.isTest())
                (_a = console.trace).bind.apply(_a, [console].concat(args));
        },
        /**
         * Creates a warn message only in test mode;
         * suppressed in production mode.
         * @param {any} args
         */
        warnt: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (Amaryllis.Util.isTest())
                (_a = console.warn).bind.apply(_a, [console].concat(args));
        },
        /**
         * Logs an error message in test mode.
         * @param {any} args
         */
        errort: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            if (Amaryllis.Util.isTest())
                (_a = console.error).bind.apply(_a, [console].concat(args));
        },
        /**
         * Asserts a log if the boolean value is false;
         * suppressed in production mode.
         * @param {boolean} boolean
         * @param {string} msg
         */
        assert: function (boolean, msg) {
            if (Amaryllis.Util.isTest())
                console.assert.bind(console, boolean, msg);
        },
        /**
         * Logs a count message with a label;
         * suppressed in production mode.
         * @param {string} label
         */
        count: function (label) {
            if (Amaryllis.Util.isTest())
                console.count(label);
        },
        nullOrUndefined: function (item) {
            if (item === null || item === undefined)
                return true;
            else
                return false;
        },
        pluginCommands: [],
        addPluginCommand: function (command, f) {
            Amaryllis.Util.pluginCommands[command] = f;
        }
    };
    /** @namespace Amaryllis.Functional */
    Amaryllis.Functional = {
        /**
         * Returns the first element of an array.
         * @template T
         * @param {T[]} array
         * @returns {*}
         */
        peekFront: function (array) {
            return array.slice(0)[0];
        },
        /**
         * Returns the last element of an array.
         * @template T
         * @param {T[]} array
         * @returns {*}
         */
        peekLast: function (array) {
            return array.slice(-1)[0];
        },
        /**
         * Creates a function that only be run once.
         * @param {Function} f
         * @returns {Function}
         */
        once: function (f) {
            var count = 0;
            return function () {
                if (count > 0)
                    return null;
                else {
                    count++;
                    return f();
                }
            };
        },
        /**
         * Repeats the code a set number of times
         * similar to a for loop.
         * @param {number} iterations
         * @param {Function} f
         */
        times: function (iterations, f) {
            for (var i = 0; i < iterations; i++) {
                f();
            }
        },
        /**
         * Returns the number of times the element appears
         * in the specified array.
         * @template T
         * @param {*} item
         * @param {T[]} array
         * @returns {number}
         */
        occurences: function (item, array) {
            return array.filter(function (element) { return element === item; }).length;
        },
        /**
         * Creates a function with the specified array of arrays that
         * will return a value when given the key.
         * @param {any[][]} array
         * @returns {Function}
         */
        keymap: function (array) {
            var keymap = new Map(array);
            return function (key) {
                return keymap.get(key);
            };
        },
        intersect: function (array1, array2) {
            return array1.filter(function (element) { return array2.includes(element); });
        },
        /**
         * Clears an array of all values.
         * @param {any[]} array
         */
        clear: function (array) {
            array.length = 0;
        },
        /**
         * Returns the index of an element of the same
         * class type. If none is found, returns -1.
         * @template T
         * @param {*} type
         * @param {T[]} array
         * @returns {number}
         */
        indexOfType: function (type, array) {
            return array.findIndex(function (element) {
                return element.constructor.name === type.constructor.name;
            });
        },
        /** Clones an object removing it's dependencies.
         * @returns {object}
         */
        clone: function (obj) { return JSON.parse(JSON.stringify(obj)); },
        /** Freezes an object preventing it from being modified.
         * @returns {object}
        */
        freeze: function (obj) { return Object.freeze(obj); },
        /** Freezes and clones an object.
         * @returns object
        */
        freezeClone: function (obj) {
            return Amaryllis.Functional.freeze(Amaryllis.Functional.clone(obj));
        },
        /**
         * Flattens an array of arrays into a single array.
         * @template T
         * @param {T[][]} array
         * @returns {any[]}
         */
        flatten: function (array) {
            return array.reduce(function (initial, current) {
                return initial.concat(current);
            }, []);
        },
        /**
         * Allows you to trace information through a function call.
         * @param {any} label
         * @param {any} val
         */
        trace: function (label, val) {
            console.log(label + " - " + val);
        },
        curry: function (f) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                return f.apply(null, args.concat(args2));
            };
        },
        /**
         * Returns a function that is a combination of all the entered functions.
         * Processing is done left to right.
         * @param {any} fns
         * @returns {Function}
         */
        pipe: function () {
            var fns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fns[_i] = arguments[_i];
            }
            return function (data) { return fns
                .reduce(function (value, fn) { return fn(value); }, data); };
        },
        /**
         * Returns a function that is a combination of all entered functions.
         * Processing is done right to left.
         * @param {any} fns
         */
        compose: function () {
            var fns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fns[_i] = arguments[_i];
            }
            return function (data) {
                return fns.reduceRight(function (value, fn) { return fn(value); }, data);
            };
        },
        /** Returns a function that can be executed later. */
        task: function (f) { return function () { return f; }; },
        /** Creates a function prototype that extends
         * the other function prototype.
         * @returns {Function}
         */
        make: function (Fn, prototype) {
            Fn.prototype = Object.create(prototype);
            Fn.prototype.constructor = Fn;
            return Fn;
        },
        /**
         * General purpose map; works on all iterable objects.
         * @template T
         * @param {Function} f
         * @param {T} object
         * @returns {T}
         */
        map: function (f, array) {
            var copy = Amaryllis.Functional.clone(array);
            var props = Amaryllis.Functional.values(array).map(f);
            var i = 0;
            for (var prop in copy) {
                copy[prop] = props[i];
                i++;
            }
            return copy;
        },
        mapCl: function (f, array) {
            var obj = {};
            var props = Amaryllis.Functional.values(array).map(f);
            var names = Object.keys(array);
            var i = 0;
            for (var prop in array) {
                obj[names[i]] = props[i];
                i++;
            }
            return obj;
        },
        values: function (object) {
            var arr = [];
            for (var prop in object) {
                arr.push(object[prop]);
            }
            return arr;
        },
        toJSON: function (object) {
            var arr = [];
            for (var prop in object) {
                arr.push(prop);
                arr.push(object[prop]);
            }
        },
        toJSONMap: function (object) {
            var values = object.values();
            var keys = object.keys();
            var condition = true;
            var arr = [];
            while (condition) {
                var val = keys.next();
                var val2 = values.next();
                arr.push([val.value, val2.value]);
                condition = !val.done;
            }
            return arr;
        },
        /**
         * General purpose filter; works on all iterable objects.
         * @template T
         * @param {Function} f
         * @param {T} object
         * @returns {T}
         */
        filter: function (f, array) {
            var copy = Amaryllis.Functional.clone(array);
            var obj = new copy.constructor();
            var props = Object.entries(array)
                .filter(function (element) {
                return f(element[1]);
            }).forEach(function (element) {
                obj[element[0]] = element[1];
            });
            return obj;
        },
        filterCl: function (f, array) {
            if (!Amaryllis.Util.nullOrUndefined(array)) {
                var obj_1 = {};
                var props = Object.entries(array)
                    .filter(function (element) {
                    return f(element[1]);
                }).forEach(function (element) {
                    obj_1[element[0]] = element[1];
                });
                return obj_1;
            }
            else {
                return null;
            }
        },
        /**
         * Returns an array of numbers of the given range.
         * @param {number} start
         * @param {number} end
         * @returns {array}
         */
        range: function (start, end) {
            var arr = [];
            var diff = end - start;
            arr.length = diff;
            return arr.fill(start).map(function (x, index) { return x + index; });
        },
        /**
         * Takes a set amount of elements from the start of an array.
         * @param {number} amount
         * @param {any[]} list
         * @returns {any[]}
         */
        take: function (amount, list) {
            return list.slice(0, amount);
        },
        /**
         * Takes a set amount of elements from the end of an array.
         * @param {number} amount
         * @param {any[]} list
         * @returns {any[]}
         */
        drop: function (amount, list) {
            return list.slice(amount * -1);
        },
        arrayEquals: function (arr1, arr2) {
            return arr1.length === arr2.length &&
                arr1.every(function (el, index) { return el === arr2[index]; });
        },
        /**
         * Negates a number
         * @param {number} number
         * @returns {number}
         */
        negate: function (number) {
            return number * -1;
        },
        /**
         * Turns the string into a boolean.
         * @param {string} string
         * @returns {boolean}
         */
        toBoolean: function (string) {
            if (/true/ig.test(string))
                return true;
            if (/false/ig.test(string))
                return false;
            return false;
        },
        /**
         * Takes the value of a key from an object.
         * @param {string} key
         * @returns {Function}
         */
        pluck: function (key) {
            return function (object) { return object[key]; };
        },
        /**
         * Returns an element from an array by index;
         * if no index is provided return a random element.
         * @template T
         * @param {T[]} list
         * @param {number} [index]
         * @returns {T}
         */
        pick: function (list, index) {
            if (index === undefined) {
                return list[Amaryllis.Num.floorRand(list.length)];
            }
            else
                return list[index];
        },
        /**
         * Returns the element entered.
         * @template T
         * @param {T} variable
         * @returns {T}
         */
        identity: function (variable) {
            return variable;
        },
        /**
         * Returns true if the element given is empty.
         * @template T
         * @param {T} variable
         * @returns {boolean}
         */
        isEmpty: function (variable) {
            if (variable === null || variable === undefined)
                return false;
            if (variable['length'] !== undefined) {
                if (variable['length'] <= 0)
                    return true;
                if (variable['length'] > 0)
                    return false;
            }
            for (var prop in variable) {
                if (variable['hasOwnProperty'](prop))
                    return false;
            }
            return JSON.stringify(variable) === JSON.stringify({});
        }
    };
    /**
     * A Timer class for utility purposes and timing events in frames.
     * @class Amaryllis.Timer
     */
    var Timer = /** @class */ (function () {
        function Timer(seconds) {
            this._originalTime = this.frames() * seconds;
            this._timer = this.frames() * seconds;
            this._pause = true;
            this.requestUpdate();
        }
        /**
         * Starts the timer; resetting it if its been used.
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.startTimer = function () {
            this._pause = false;
        };
        /**
         * Sets the timer to the specified number in seconds.
         * @param {number} value
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.setTimer = function (value) {
            this._timer = this.frames() * value;
            this._originalTime = this.frames() * 60;
        };
        /**
         * Resets the timer.
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.resetTimer = function () {
            this._timer = this._originalTime;
            this._pause = true;
        };
        Timer.prototype.pauseTimer = function () {
            this._pause = true;
        };
        /**
         * The update function of the timer;
         * this is called every frame.
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.update = function () {
            if (this._pause === false) {
                this.updateTimer();
            }
            this.requestUpdate();
        };
        Timer.prototype.updateTimer = function () {
            if (this._timer > 0)
                this._timer--;
        };
        Timer.prototype.requestUpdate = function () {
            requestAnimationFrame(this.update.bind(this));
        };
        /**
         * Returns true iff the timer is out of time.
         * @returns {boolean}
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.timeUp = function () {
            if (this._timer <= 0)
                return true;
            else
                return false;
        };
        /**
         * Number of frames of the timer; defaults to 60.
         * @returns {number}
         * @memberof Amaryllis.Timer
         */
        Timer.prototype.frames = function () {
            return 60;
        };
        return Timer;
    }());
    Amaryllis.Timer = Timer;
    /**
     * A die class for rolling for random numbers.
     * @class Amaryllis.Die
     */
    var Die = /** @class */ (function () {
        function Die(sides) {
            this._sides = Amaryllis.Functional.range(1, sides + 1);
        }
        /**
         * Rolls the die, picking a random face on the die.
         * @returns {number}
         * @memberof Die
         */
        Die.prototype.roll = function () {
            return Amaryllis.Functional.pick(this._sides);
        };
        return Die;
    }());
    Amaryllis.Die = Die;
    /**
     * A stack class for convenience over arrays.
     * @export
     * @class Amaryllis.Stack
     */
    var Stack = /** @class */ (function () {
        function Stack(array) {
            if (array === void 0) { array = []; }
            this._internalBuffer = array;
        }
        /**
         * Adds an element to the stack.
         * @template T
         * @param {T} element
         * @memberof Amaryllis.Stack
         */
        Stack.prototype.push = function (element) {
            this._internalBuffer.push(element);
        };
        /**
         * Returns the element at the top of the stack;
         * removing it from the stack.
         * @returns {*}
         * @memberof Amaryllis.Stack
         */
        Stack.prototype.pop = function () {
            return this._internalBuffer.pop();
        };
        /**
         * Peeks at the top of the stack, returning the
         * element at the top of the stack.
         * @returns {*}
         * @memberof Amaryllis.Stack
         */
        Stack.prototype.top = function () {
            if (this._internalBuffer.length > 0)
                return this._internalBuffer[this._internalBuffer.length - 1];
            else
                return null;
        };
        /**
         * Returns the size of the stack.
         * @returns {number}
         * @memberof Amaryllis.Stack
         */
        Stack.prototype.size = function () {
            return this._internalBuffer.length;
        };
        /**
         * Returns true or false, depending on if
         * the stack is empty.
         * @returns {boolean}
         * @memberof Amaryllis.Stack
         */
        Stack.prototype.isEmpty = function () {
            return this._internalBuffer.length === 0;
        };
        return Stack;
    }());
    Amaryllis.Stack = Stack;
    /**
     * A queue class for convenience over using arrays.
     * @class Amaryllis.Queue
     */
    var Queue = /** @class */ (function () {
        function Queue(array) {
            if (array === void 0) { array = []; }
            this._internalBuffer = array;
        }
        /**
         * Adds an element to the queue.
         * @template T
         * @param {T} element
         * @memberof Amaryllis.Queue
         */
        Queue.prototype.enqueue = function (element) {
            this._internalBuffer.push(element);
        };
        /**
         * Returns the element at the end of the queue;
         * removes that element from the queue.
         * @returns {*}
         * @memberof Amaryllis.Queue
         */
        Queue.prototype.dequeue = function () {
            var element = this._internalBuffer.reverse().shift();
            this._internalBuffer.reverse();
            return element;
        };
        /**
         * Returns the element at the end of the queue.
         * @returns
         * @memberof Amaryllis.Queue
         */
        Queue.prototype.peek = function () {
            return this._internalBuffer[0];
        };
        /**
         * Returns the size of the queue.
         * @returns {number}
         * @memberof Amaryllis.Queue
         */
        Queue.prototype.size = function () {
            return this._internalBuffer.length;
        };
        /**
         * Returns true if the queue is empty; otherwise false.
         * @returns {boolean}
         * @memberof Amaryllis.Queue
         */
        Queue.prototype.isEmpty = function () {
            return this._internalBuffer.length === 0;
        };
        return Queue;
    }());
    Amaryllis.Queue = Queue;
    /**
     * Matrix class for 2D arrays.
     * @class Amaryylis.Matrix
     */
    var Matrix = /** @class */ (function () {
        function Matrix(rows, columns, initial) {
            if (initial === void 0) { initial = [[]]; }
            if (rows !== undefined && columns !== undefined) {
                this._internalBuffer = this.createMatrix(rows, columns);
            }
            this._internalBuffer = initial;
        }
        Matrix.prototype.identity = function () {
            return this._internalBuffer;
        };
        Matrix.prototype.element = function (row, column) {
            return this._internalBuffer[row - 1][column - 1];
        };
        Matrix.prototype.transformRow = function (f, index) {
            this._internalBuffer[index - 1] = this.row(index).map(f);
        };
        Matrix.prototype.row = function (index) {
            return this._internalBuffer[index - 1];
        };
        Matrix.prototype.rows = function () {
            return this._internalBuffer.length;
        };
        Matrix.prototype.columns = function () {
            //return longest column
        };
        Matrix.prototype.createMatrix = function (rows, columns) {
            var matrix = [];
            for (var i = 0; i < rows; i++) {
                var row = [];
                row.length = columns;
                matrix.push(row);
            }
            return matrix;
        };
        return Matrix;
    }());
    Amaryllis.Matrix = Matrix;
    var StateMachine = /** @class */ (function (_super) {
        __extends(StateMachine, _super);
        function StateMachine(buffer) {
            var _this = _super.call(this) || this;
            _this._states = {};
            _this.setupStateMachine(buffer);
            return _this;
        }
        StateMachine.prototype.setupStateMachine = function (buffer) {
            var _this = this;
            buffer.forEach(function (pair) {
                var key = pair[0], value = pair[1];
                _this._states[key] = value;
            });
        };
        StateMachine.prototype.addState = function (name, value) {
            if (value === void 0) { value = null; }
            this._states[name] = value;
            this.emit('stateAdd', name, value);
        };
        StateMachine.prototype.setState = function (name, value) {
            this._states[name] = value;
            this.emit("update:" + name, name, value);
            this.emit("updateState", name, value);
        };
        StateMachine.prototype.state = function (name) {
            return this._states[name];
        };
        StateMachine.prototype.removeState = function (name) {
            delete this._states[name];
            this.emit('stateRemove', name);
        };
        return StateMachine;
    }(PIXI.utils.EventEmitter));
    Amaryllis.StateMachine = StateMachine;
    /**
     * Stream class for dealing with large
     * amounts of data.
     * @class Amaryllis.Stream
     * @extends {PIXI.utils.EventEmitter}
     */
    var Stream = /** @class */ (function (_super) {
        __extends(Stream, _super);
        function Stream(buffer) {
            var _this = _super.call(this) || this;
            _this._buffer = buffer;
            _this._index = 0;
            _this._internalGenerator = stream(_this._index, _this._buffer);
            _this._tempBuffer = [];
            _this._bufferLimit = 1000;
            return _this;
        }
        /**
         * Attaches an event handler to the current stream and returns it for
         * chaining function calls.
         * @param {string} eventName
         * @param {Function} handler
         * @param {*} context
         * @returns {Stream}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.on = function (eventName, handler, context) {
            var emittance = _super.prototype.on.call(this, eventName, handler, context);
            this.resume();
            return emittance;
        };
        Stream.prototype.startsWith = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.push(args);
        };
        Stream.prototype.resume = function () {
            this._pause = false;
        };
        Stream.prototype.pause = function () {
            this._pause = true;
        };
        Stream.prototype.push = function () {
            var _this = this;
            var dataArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                dataArgs[_i] = arguments[_i];
            }
            dataArgs.forEach(function (data) {
                _this._buffer.push(data);
                _this.emit('data', data);
                if (_this.size() > _this._bufferLimit)
                    _this._buffer.shift();
            });
        };
        /**
         * Returns the next value in the stream.
         * @returns {T}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.next = function () {
            var _a = this._internalGenerator.next(), value = _a.value, done = _a.done;
            if (value !== undefined)
                return value;
        };
        Stream.prototype.value = function () {
            return this._internalGenerator.next().value;
        };
        /**
         * Returns a new stream with the filter function
         * used on all elements.
         * @param {Function} f
         * @returns {Amaryllis.Stream}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.filter = function (f) {
            var clone = Amaryllis.Functional.clone(this.array().filter(f));
            return new Amaryllis.Stream(clone);
        };
        /**
         * Returns a new stream with the map function
         * used on all elements.
         * @param {Function} f
         * @returns {Amaryllis.Stream}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.map = function (f) {
            var clone = Amaryllis.Functional.clone(this.array().map(f));
            return new Amaryllis.Stream(clone);
        };
        /**
         * Returns an array of the streams elements
         * from the specified staring point.
         * @param {number} start
         * @param {Function} f
         * @returns {any[]}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.reduce = function (start, f) {
            return this.array().slice(start).reduce(f);
        };
        Stream.prototype.pick = function (amount) {
            var clone = Amaryllis.Functional.clone(this.array().slice(0, 100));
            return new Amaryllis.Stream(clone);
        };
        /**
         * Runs the function for each element in the
         * stream.
         * @param {Function} f
         * @returns {any[]}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.each = function (f) {
            return this.array().forEach(f);
        };
        /**
         * Returns the size of the stream's internal buffer.
         * @returns {number}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.size = function () {
            return this._buffer.length;
        };
        /**
         * Returns the stream's internal buffer as an array.
         * @returns {any[]}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.array = function () {
            this._index = 0;
            var arr = this._tempBuffer.concat([]);
            var complete = false;
            while (complete === false) {
                var _a = this._internalGenerator.next(), value = _a.value, done = _a.done;
                if (value !== null && value !== undefined)
                    arr.push(value);
                complete = done;
            }
            this._tempBuffer = arr;
            return arr;
        };
        /**
         * Returns the internal buffer.
         * @returns {any[]}
         * @memberof Amaryllis.Stream
         */
        Stream.prototype.read = function () {
            return this._buffer;
        };
        return Stream;
    }(PIXI.utils.EventEmitter));
    Amaryllis.Stream = Stream;
    function stream(index, buffer) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(index < buffer.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, buffer[index]];
                case 1:
                    _a.sent();
                    index++;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    }
    var Node = /** @class */ (function () {
        function Node(data) {
            this._data = data;
        }
        Node.prototype.setNext = function (next) {
            this._next = next;
        };
        Node.prototype.setPrev = function (prev) {
            this._prev = prev;
        };
        /**
         * Returns the data contained in the node.
         * @returns {*}
         * @memberof Amaryllis.Node
         */
        Node.prototype.data = function () {
            return this._data;
        };
        /**
         * Returns the next node.
         * @returns {Amaryllis.Node}
         * @memberof Amaryllis.Node
         */
        Node.prototype.next = function () {
            return this._next;
        };
        /**
         * Returns the previous node.
         * @returns {Amaryllis.Node}
         * @memberof Amaryllis.Node
         */
        Node.prototype.prev = function () {
            return this._prev;
        };
        return Node;
    }());
    Amaryllis.Node = Node;
    var Container = /** @class */ (function () {
        function Container(content) {
            this.set(content);
        }
        Container.prototype.set = function (content) {
            this._value = content;
        };
        Container.prototype.val = function () {
            return this._value;
        };
        Container.prototype.empty = function () {
            return this._value === undefined || this._value === null ? true : false;
        };
        Container.prototype.clear = function () {
            this._value = null;
        };
        return Container;
    }());
    Amaryllis.Container = Container;
    /** @namespace Amaryllis.Windows */
    Amaryllis.Windows = {
        titleWindow: function () {
        }
    };
    /**
     * A class that allows you to create a window title.
     * @export
     * @class Amaryllis.Window_AmaTitle
     * @extends {Window_Base}
     */
    var Window_AmaTitle = /** @class */ (function (_super) {
        __extends(Window_AmaTitle, _super);
        function Window_AmaTitle(x, y, width, height) {
            return _super.call(this, x, y, width, height) || this;
        }
        Window_AmaTitle.prototype.refresh = function () {
            if (this.contents) {
                this.contents.clear();
                this.drawTitle();
            }
        };
        Window_AmaTitle.prototype.drawTitle = function () {
            this.drawText(this._text, 0, 0, this.contentsWidth(), "center");
        };
        Window_AmaTitle.prototype.setText = function (text) {
            this._text = text;
            this.refresh();
        };
        return Window_AmaTitle;
    }(Window_Base));
    Amaryllis.Window_AmaTitle = Window_AmaTitle;
})(Amaryllis || (Amaryllis = {}));
/* Rewrite of Plugin Command for easy aliasing */
var pCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =
    function (command, args) {
        if (Amaryllis.Util.pluginCommands[command] !== undefined)
            Amaryllis.Util.pluginCommands[command].apply(null, args);
        else
            pCommand.call(this, command, args);
    };
/* Rewrite Window_Obtain Escape Pram for more robust  codes */
var _WindowObtainEscapeParam = Window_Base.prototype.obtainEscapeParam;
Window_Base.prototype.obtainEscapeParam =
    function (textState) {
        var arr3 = /^\[([A-Za-z]+)\]/.exec(textState.text.slice(textState.index));
        var arr2 = /^\[(\w+-\w+|\w+-\w+-\d+|-.+)\]/
            .exec(textState.text.slice(textState.index));
        if (arr3) {
            var string = arr3[1].trim();
            textState.text = textState.text.replace(/\[|\]/ig, "");
            return string;
        }
        else if (arr2) {
            var string = String(arr2[1]);
            var regex = new RegExp("\\[" + string + "\\]", 'ig');
            textState.text = textState.text.replace(/\[|\]/ig, "");
            return string;
        }
        else {
            return _WindowObtainEscapeParam.call(this, textState);
        }
    };
/** Alias for Amaryllis */
var amyl = Amaryllis;
/** Alias for Amaryllis functions */
/**
 * Returns an alias containing all of the functions of the API.
 * @returns {object}
 */
function createAmaAlias() {
    var prt1 = Object.assign(Amaryllis.Functional, Amaryllis.Util, Amaryllis.Str);
    var prt2 = Object.assign(Amaryllis.Draw, Amaryllis.Str, Amaryllis.Num);
    var ptr3 = Object.assign(Amaryllis.Request, Amaryllis.Game, Amaryllis.Vector2);
    return Object.assign(prt1, prt2, ptr3, {
        createEventEmitter: Amaryllis.createEventEmitter,
        createMatrix: Amaryllis.createMatrix,
        createQueue: Amaryllis.createQueue,
        createStack: Amaryllis.createStack,
        createStream: Amaryllis.createStream,
        createDie: Amaryllis.createDie,
        createTimer: Amaryllis.createTimer,
        createStateMachine: Amaryllis.createStateMachine,
        createSM: Amaryllis.createSM,
        parseParams: Amaryllis.parseParams,
        memoize: Amaryllis.memoize,
        getParams: Amaryllis.getParams,
        createBox: Amaryllis.createBox,
    });
}
var amryl = createAmaAlias();
console.log("%c %c- Amaryllis - %c ", "background:#ff68b0; padding:5px 0px;", "background:#292e3a;color: #ff68b0; padding:5px 0px;", "background:#ff68b0; padding:5px 0px;");
