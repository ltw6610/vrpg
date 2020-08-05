"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
//=============================================================================
// Rose_VN.js
//=============================================================================
/*:
* @author Kino
* @plugindesc A set of Visual Novel Tools for RPGMakerMV <LUCIA>.
*
* @param -- General Settings --
*
* @param autoAdvanceText
* @text Auto Advance Text
* @parent -- General Settings --
* @desc Allows text to auto advance.
* @type boolean
* @default true
*
* @param autoAdvanceTime
* @text Auto Advance Time
* @parent -- General Settings --
* @desc How long in seconds before advancing text
* @type number
* @default 3
*
* @param enableSpinner
* @text Enable Spinner
* @parent -- General Settings --
* @desc Turn on / off the spinner.
* @type boolean
* @default true
*
* @param spinner
* @text Text Spinner
* @parent -- General Settings --
* @desc Spinner used  when text is done being drawn to the message window.
* @type file
*
* @param spinnerSpeed
* @text Spinner Speed
* @parent -- General Settings --
* @desc Spinner speed; number between 0.1 and 1.0.
* @default 1.0
*
*
* @param backgroundFadeSpeed
* @text Background Fade Speed
* @parent -- General Settings --
* @desc Fade speed of the background for the VN; based on opacity 0 - 255.
* @type number
* @default 32
*
* @param bustWidth
* @text Bust Width
* @parent -- General Settings --
* @desc Width of busts used in the plugin.
* @type number
* @default 150
*
* @param bustHeight
* @text Bust Height
* @parent -- General Settings --
* @desc Height of busts used in the plugin.
* @type number
* @default 225
*
*
* @param bustXOffset
* @text Bust X Offset
* @parent -- General Settings --
* @desc X offset of the busts used in the plugin.
* @type number
* @default 0
*
* @param bustYOffset
* @text Bust Y Offset
* @parent -- General Settings --
* @desc Y offset of the busts used in the plugin.
* @type number
* @default 0
*
* @param bustBobAnimation
* @text Bust Bobbing Animation
* @parent -- General Settings --
* @desc Should the busts bob up and down slightly?
* @type boolean
* @default true
*
* @param bustBobRange
* @text Bust Bobbing Range
* @parent -- General Settings --
* @desc How far should the bust bob up and down from the y origin?
* @type number
* @default 30
*
* @param bustBobSpeed
* @text Bust Bobbing Speed
* @parent -- General Settings --
* @desc Speed bust bobs moves from the y origin. [Smaller number is faster]
* @type number
* @default 100
*
* @param bustGrow
* @text Bust Breathing Animation
* @parent -- General Settings --
* @desc Enable bust breathing animation
* @type boolean
* @default true
*
* @param bustGrowRange
* @text Bust Breathing Range
* @parent -- General Settings --
* @desc Range at which the bust breathes
* @type number
* @default 5
*
* @param bustSlideInSpeed
* @text Bust Slide In Speed
* @parent -- General Settings --
* @desc Speed at which busts slide into the scene
* @type number
* @default 0.1
*
* @param characters
* @text Character List
* @desc List of characters in your Visual Novel.
* @type struct<Character>[]
*
* @param -- Command Window Settings --
*
* @param enableCommandWindow
* @parent -- Command Window Settings --
* @text Enable Command Window
* @type boolean
* @default true
*
* @param -- Picture Window Settings --
*
* @param picWindowX
* @text X Position
* @parent -- Picture Window Settings --
* @desc X position of the picture window.
* @type number
* @default 150
*
* @param picWindowY
* @text Y Position
* @parent -- Picture Window Settings --
* @desc Y position of the picture window.
* @type number
* @default 200
*
* @param picWindowWidth
* @text Width
* @parent -- Picture Window Settings --
* @desc Width of the picture window.
* @default 250
*
* @param picWindowHeight
* @text Height
* @parent -- Picture Window Settings --
* @desc Height of the picture window.
* @default 250
*
* @param -- Text Log Settings --
*
* @param textLogBackground
* @parent -- Text Log Settings --
* @text TextLog Background
* @desc The background picture of the text log.
* @type file
* @default img/pictures
*
* @param  textLogBackgroundType
* @parent -- Text Log Settings --
* @text Text Log Window Background Type
* @desc Window background type; 0 visible, 1 faded, 2 invisible.
* @type number
* @default 1
*
* @param -- Name Window Settings --
*
* @param enableNameWindow
* @parent -- Name Window Settings --
* @text Enable Regular Menu
* @desc Enable the name window.
* @type boolean
* @default true
*
*
* @param nameWindowWidth
* @parent -- Name Window Settings --
* @text Name Window Width
* @desc The width of the name window.
* @type number
* @default 150
*
*
* @param nameWindowHeight
* @parent -- Name Window Settings --
* @text Name Window Height
* @desc The height of the name window.
* @type number
* @default 75
*
* @param -- Message Window Settings --
*
* @param messageWindowWidth
* @parent -- Message Window Settings --
* @text Message Window Width
* @desc The width of the message window
* @type number
* @default 500
*
* @param messageWindowRows
* @parent -- Message Window Settings --
* @text Message Window Rows
* @desc The amount of rows used in the message window
* @type number
* @default 5
*
* @help
* version 1.1.5
*
//=============================================================================
//  Introduction
//=============================================================================
*
* This plugin is designed to add Visual Novel features to RPGMakerMV.
* These features include busts, name window, Visual Novel backgrounds for
* your game maps, novel and adventure mode for your text box.
*
//=============================================================================
//  Script Calls
//=============================================================================
*  Namespace: Lucia or $luc. You can use them interchangeably.
*
* Lucia.textLog(); or $luc.textLog();
* Opens the text log scene.
*
* Lucia.showVNCommands(true/false);
* Shows or hides the visual novel command window.
* Example: Lucia.showVNCommands(true); //Shows the visual novel command window.
* $luc.showVNCommands(false); //Hides the visual novel command window.
*
* Lucia.fullScreenMode(true/false);
* Makes the message window full screen.
* Example: Lucia.fullScreenMode(true); //Makes the message window full screen.
* $luc.fullScreenMode(false); //Returns message window to original size.
*
* Lucia.screenShotMode(true/false);
* Hides all the windows on the screen from view.
* Example: Lucia.screenShotMode(true); //Hides all the windows.
* $luc.screenShotMode(false); //Shows all the windows again.
*
* Lucia.changeBackground(backgroundName);
* Changes the background to the specified image; the background will fade in.
* Example: Lucia.changeBackground(...);
*
* Lucia.hideBackground(true/false);
* Hides the background picture display on screen from view.
* Example: Lucia.hideBackground(true/); //Hides the background.
* $luc.hideBackground(false); //Reveals the background.
*
* Lucia.fadeOutBackground(speed);
* Fades out the background at a speed between 1 and 100.
* Example: Lucia.fadeOutBackground(10);
*
* Lucia.fadeInBackground(speed);
* Fades in the background at a speed between 1 and 100.
* Example: Lucia.fadeInBackground(10);
*
* Lucia.alignNameWindow(orientation);
* Moves then ame window to the left or right of the message box.
* Example: Lucia.alignNameWindow('right');
*
* Lucia.showPicture(boolean, path);
* Shows a picture in the new picture window.
* Example: Lucia.showPicture(true, "img/pictures/Translucent")
* To close the window: Lucia.showPicture(false);
*
* Lucia.sendMessage(message, faceName, faceIndex);
* Sends a message to the message window with the desired text
* and face graphic.
* Example:
* Lucia.sendMessage(`This text
* Needs to have
* line breaks
* In order to
* Show the power of my new plugin ~~`, "Actor1" , 2);
*
* Lucia.addChar(name, imagePath, position)
* Adds a bust graphic to the screen anchored to a position on
* the message window. Positions are: left, center, and right.
* Example:
* Lucia.addCharacter("Sue", "img/pictures/KinoZoeCloseUpNoGlass", "right")
*
* Lucia.addCharFrom(name, imagePath, startPosition, endPosition);
* Adds a bust graphic to the screen anchored to the position of
* the message window. The bust slides in from the off screen positions
* of left or right; end positions are: left center, and right.
* Example:
* Lucia.
* addCharFrom("Sue", "img/pictures/KinoZoeCloseUpNoGlass", "left", "right")
*
* Lucia.addCharByIndex(index, startPosition, endPosition);
* Adds a bust graphic to the screen at the specified position.
* Similar to addChar.
* Example: Lucia.addCharByIndexFrom(1, "left");
*
* Lucia.addCharByIndexFrom(index, startPosition, endPosition);
* Adds a bust graphic to the screen from the character list in the plugin
* parameters. Similar to addCharFrom.
* Example: Lucia.addCharByIndexFrom(1, "left", "right");
*
* Lucia.removeChar(name);
* Removes the bust graphic from the screen immediately.
* Example: Lucia.removeChar("Moemi");
*
* Lucia.charLeave(name, position);
* Has the bust graphic leave the scene from left or right.
* Example: Lucia.charLeave("Moemi", "right");
*
* Lucia.charLeaveByIndex(index, position);
* Has the bust graphic leave the scene from left or right.
* Example: Lucia.charLeaveByIndex(1, "left");
*
//=============================================================================
//  Plugin Commands
//=============================================================================
* Note: Plugin commands mirror script calls in their parameters so see above
* if you're lost.
*
* fullScreen true/false
* Shows the message window in full screen or regular mode.
*
* screenShot true/false
* Shows/hides all the windows and simply displays the backdrop and characters.
*
* textLog
* Shows the text log scene.
*
* showVNCommands true/false
* Shows the visual novel command window with things such as log, win, etc.
*
* hideBackground true/false
* Shows or hides the background which contains the backdrop for the VN scenes.
*
* fadeInBackground speed
* Fades in the background; speed must be between 1 and 100.
* Example: fadeInBackground 25
*
* fadeOutBackground speed
* Fades out the background; speed msut be between 1 and 100.
* Example: fadeOutBackground 10
*
* hideForeground true/false
* Shows or hides the foreground which contains the character for the VN scenes.
*
* fadeInForeground
* Fades in the foreground that contains characters/busts.
*
* fadeOutForeground
* Fades out the foreground that contains characters/busts.
*
* showPicture true/false pictureName
* Shows a picture in the picture window.
*  Example: showPicture true img/pictures/Translucent
*
* alignNameWindow position
* Aligns the name window to the left or right side of the
* message window.
* Example: alignNameWindow left
*
* addChar name, imagePath, position
* Example addChar Moemi img/pictures/KinoZoeCloseUpNoGlass left
*
* addCharFrom name, imagePath, startPosition, endPosition
* Example: addCharFrom Moemi img/pictures/KinoZoeCloseUpNoGlass left right
*
* addCharByIndex index, position
* Example: addCharByIndex 1 left
*
* addCharByIndexFrom index, startPosition, endPosition
* Example: addCharByIndexFrom 1 left right
*
* removeChar name
* Example: removeChar Moemi
*
* charLeave name position
* Example: charLeave Moemi left
*
* charLeaveByIndex index position
* Example: charLeaveByIndex 1 left
*
//=============================================================================
//  Text Codes
//=============================================================================
* \VNC[number]
* Shows the name of a character in the character list
* within the name window.
* Example: \VNC[1]
*
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
/*~struct~Character:
*
* @param name
* @text Name
* @desc Name of your Visual Novel character.
* @default Moemi
*
* @param description
* @text Description
* @desc description of the character
* @default Mascot character for Tartarus Corp.
*
* @param bustGraphic
* @text Bust Graphic
* @desc Optional bust graphic attached to the character.
* @type file
*
*/
var Lucia = Lucia || {};
var ROSE = ROSE || {};
Lucia.params = amryl.getParams(/<LUCIA>/ig);
var LuciaParams = {
    autoAdvanceText: amryl.toBoolean(Lucia.params['autoAdvanceText']),
    autoAdvanceTime: parseInt(Lucia.params['autoAdvanceTime']),
    enableSpinner: amryl.toBoolean(Lucia.params['enableSpinner']),
    spinner: amryl.loadImage(Lucia.params['spinner'], 0),
    spinnerSpeed: parseFloat(Lucia.params['spinnerSpeed']),
    characters: amryl.parseParams(amryl.safeParse(Lucia.params['characters'])),
    bustXOffset: parseInt(Lucia.params['bustXOffset']),
    bustYOffset: parseInt(Lucia.params['bustYOffset']),
    bustWidth: parseInt(Lucia.params['bustWidth']),
    bustHeight: parseInt(Lucia.params['bustHeight']),
    bustBob: amryl.toBoolean(Lucia.params['bustBobAnimation']),
    bustBobRange: parseFloat(Lucia.params['bustBobRange']),
    bustBobSpeed: parseInt(Lucia.params['bustBobSpeed']),
    bustGrow: amryl.toBoolean(Lucia.params['bustGrow']),
    bustGrowRange: parseFloat(Lucia.params['bustGrowRange']),
    bustSlideSpeed: parseFloat(Lucia.params['bustSlideInSpeed']),
    enableCommandWindow: amryl.toBoolean(Lucia.params['enableCommandWindow']),
    picWindowX: parseInt(Lucia.params['picWindowX']),
    picWindowY: parseInt(Lucia.params['picWindowY']),
    picWindowWidth: parseInt(Lucia.params['picWindowWidth']),
    picWindowHeight: parseInt(Lucia.params['picWindowHeight']),
    backgroundFadeSpeed: parseInt(Lucia.params['backgroundFadeSpeed']),
    textLogBackgroundType: parseInt(Lucia.params['textLogBackgroundType']),
    textLogBackground: amryl.loadImage(Lucia.params['textLogBackground'], 0),
    enableNameWindow: amryl.toBoolean(Lucia.params['enableNameWindow']),
    nameWindowWidth: parseInt(Lucia.params['nameWindowWidth']),
    nameWindowHeight: parseInt(Lucia.params['nameWindowHeight']),
    messageWindowWidth: parseInt(Lucia.params['messageWindowWidth']),
    messageWindowRows: parseInt(Lucia.params['messageWindowRows']),
};
console.log(LuciaParams);
//=============================================================================
//  Constants
//=============================================================================
Lucia.GameText = [];
Lucia.DefaultMessageWindow = null;
Lucia.CharacterCache = {};
Lucia.Emitter = amryl.createEventEmitter();
Lucia.Emitter.on("textPause", function () {
    Lucia.GameText.push("\n");
});
//=============================================================================
//  Scene_Map
//=============================================================================
var _SceneMap_createDisplay = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    _SceneMap_createDisplay.call(this);
    this['createBackground']();
    this['createForeground']();
    this['createForegroundPic']();
};
Scene_Map.prototype['createBackground'] = function () {
    this._backgroundSprite1 = new Sprite();
    this.addChild(this._backgroundSprite1);
};
Scene_Map.prototype['createForeground'] = function () {
    this._foreground = new Sprite();
    this.addChild(this._foreground);
};
Scene_Map.prototype['createForegroundPic'] = function () {
    this._foregroundPic = new Sprite();
    this.addChild(this._foregroundPic);
};
var _SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    _SceneMap_createAllWindows.call(this);
    this['getMessageDefaults']();
    this['addVNContainer']();
    this['createVNCommandWindow']();
    this['createVNNameWindow']();
    this['createVNPictureWindow']();
    if (LuciaParams.enableSpinner)
        this['createTextSpinner']();
};
Scene_Map.prototype['addVNContainer'] = function () {
    this._lvnContainer = new Sprite_LVNContainer();
    var index = this.getChildIndex(this._windowLayer);
    this.addChildAt(this._lvnContainer, index);
};
Scene_Map.prototype['getMessageDefaults'] = function () {
    Lucia.DefaultMessageWindow = {};
    Lucia.DefaultMessageWindow.x = this._messageWindow.x;
    Lucia.DefaultMessageWindow.y = this._messageWindow.y;
    Lucia.DefaultMessageWindow.width = this._messageWindow.width;
    Lucia.DefaultMessageWindow.height = this._messageWindow.height;
};
Scene_Map.prototype['createVNCommandWindow'] = function () {
    this._lvnCommandWindow =
        new Window_LVNCommands(0, Graphics.height - 230, 150);
    this._lvnCommandWindow.setHandler("log", this.sceneLog.bind(this));
    this._lvnCommandWindow.setHandler("save", this.sceneSave.bind(this));
    this._lvnCommandWindow.setHandler("load", this.sceneLoad.bind(this));
    this._lvnCommandWindow
        .setHandler("options", this.sceneOptions.bind(this));
    this._lvnCommandWindow.setHandler("title", this.sceneTitle.bind(this));
    this.addWindow(this._lvnCommandWindow);
};
Scene_Map.prototype['createVNNameWindow'] = function () {
    var _a = this._messageWindow, x = _a.x, y = _a.y;
    var width = LuciaParams.nameWindowWidth, height = LuciaParams.nameWindowHeight;
    this._lvnNameWindow = new Window_LVName(x, y - 75, width, height);
    Lucia._nameWindow = this._lvnNameWindow;
    this.addWindow(this._lvnNameWindow);
};
Scene_Map.prototype['createVNPictureWindow'] = function () {
    var x = LuciaParams.picWindowX, y = LuciaParams.picWindowY, width = LuciaParams.picWindowWidth, height = LuciaParams.picWindowHeight;
    this._lvnPictureWindow = new Window_LVNPicture(x, y, width, height);
    this.addWindow(this._lvnPictureWindow);
};
Scene_Map.prototype['createTextSpinner'] = function () {
    if (!amryl.nullOrUndefined(LuciaParams.spinner)) {
        this._lvnTextSpinner = new Sprite_Spinner(this._messageWindow);
        this._lvnTextSpinner.setupSpinner(LuciaParams.spinner);
        this.addChild(this._lvnTextSpinner);
        this._lvnTextSpinner.visible = true;
    }
};
var _RVNScene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    _RVNScene_Map_update.call(this);
    if (LuciaParams.enableSpinner)
        this['processSpinner']();
};
Scene_Map.prototype['processSpinner'] = function () {
    if (!this._messageWindow.visible || this._messageWindow.isClosed()) {
        this._lvnTextSpinner.hide();
    }
    else {
        this._lvnTextSpinner.show();
    }
};
Scene_Map.prototype['sceneLog'] = function () {
    SceneManager.push(Scene_LTextLog);
};
Scene_Map.prototype['sceneSave'] = function () {
    SceneManager.push(Scene_Save);
};
Scene_Map.prototype['sceneLoad'] = function () {
    SceneManager.push(Scene_Load);
};
Scene_Map.prototype['sceneOptions'] = function () {
    SceneManager.push(Scene_Options);
};
Scene_Map.prototype['sceneTitle'] = function () {
    SceneManager.goto(Scene_Title);
};
//=============================================================================
//  Scene_LTextLog
//============================================================================= 
var Scene_LTextLog = (function (_super) {
    __extends(Scene_LTextLog, _super);
    function Scene_LTextLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scene_LTextLog.prototype.createBackground = function () {
        if (!amryl.nullOrUndefined(LuciaParams.textLogBackground)) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = LuciaParams.textLogBackground;
            this.addChild(this._backgroundSprite);
        }
        else {
            _super.prototype.createBackground.call(this);
        }
    };
    Scene_LTextLog.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createAllWindows();
    };
    Scene_LTextLog.prototype.createAllWindows = function () {
        this.createTextLogWindow();
    };
    Scene_LTextLog.prototype.createTextLogWindow = function () {
        this._textLogWindow =
            new Window_LTextLog(0, 0, Graphics.width, Graphics.height);
        var splitLines = Lucia.GameText.map(amryl.splitLines);
        this._textLogWindow.setTextList(amryl.flatten(splitLines));
        this.addWindow(this._textLogWindow);
    };
    Scene_LTextLog.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processExit();
    };
    Scene_LTextLog.prototype.processExit = function () {
        if (amryl.inputCancelled()) {
            this.popScene();
        }
    };
    return Scene_LTextLog;
}(Scene_MenuBase));
//=============================================================================
//  Sprite_LVNContainer
//=============================================================================
var Sprite_LVNContainer = (function (_super) {
    __extends(Sprite_LVNContainer, _super);
    function Sprite_LVNContainer() {
        return _super.call(this) || this;
    }
    Sprite_LVNContainer.prototype.initialize = function () {
        this._charList = [];
        _super.prototype.initialize.call(this);
        this.createBackground();
        this.createForeground();
    };
    Sprite_LVNContainer.prototype.createBackground = function () {
        this._background = new Sprite_LVNBackground();
        this.addChild(this._background);
    };
    Sprite_LVNContainer.prototype.createForeground = function () {
        this._foreground = new Sprite_LVNForeground();
        this.addChild(this._foreground);
    };
    Sprite_LVNContainer.prototype.addCharacter = function (name, imageName, area) {
        var charSprite = new Sprite_LVNBust(imageName);
        var character = {
            imageName: imageName, area: area,
            imageIndex: charSprite._imageIndex, sprite: charSprite
        };
        LuciaUtil.cacheCharacter(name.toUpperCase(), character);
        this._foreground.addToArea(charSprite, area);
    };
    Sprite_LVNContainer.prototype.addCharacterFrom = function (name, imageName, startArea, endArea) {
        var charSprite = new Sprite_LVNBust(imageName);
        var character = {
            imageName: imageName, imageIndex: charSprite._imageIndex,
            area: endArea, sprite: charSprite
        };
        LuciaUtil.cacheCharacter(name, character);
        this._foreground.addToAreaFrom(charSprite, startArea, endArea);
    };
    Sprite_LVNContainer.prototype.charLeave = function (name, position) {
        var char = LuciaUtil.getCharacter(name);
        if (amryl.nullOrUndefined(char)) {
            console.error("Character not available.");
        }
        else {
            this._foreground.charLeave(char, position);
        }
    };
    Sprite_LVNContainer.prototype.removeCharacter = function (name) {
        var char = LuciaUtil.getCharacter(name);
        if (amryl.nullOrUndefined(char)) {
            console.error("Character not available");
        }
        else {
            this._foreground.removeChild(char.sprite);
            LuciaUtil.removeCharacterFromCache(name);
        }
    };
    Sprite_LVNContainer.prototype.changeBackground = function (backgroundName) {
        this._background.changeBackground(backgroundName);
    };
    return Sprite_LVNContainer;
}(Sprite_Base));
//=============================================================================
//  Sprite_LVNForeground
//=============================================================================
var Sprite_LVNForeground = (function (_super) {
    __extends(Sprite_LVNForeground, _super);
    function Sprite_LVNForeground() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sprite_LVNForeground.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._wait = 10;
        this._fadeOut = false;
        this._fadeIn = false;
        this.createPositions();
    };
    Sprite_LVNForeground.prototype.createPositions = function () {
        var segmentWidth = Graphics.width / 3;
        this._leftPosition = 0;
        this._centerPosition = segmentWidth;
        this._rightPosition = segmentWidth * 2;
        this._textBoxPositionX = amryl.currentScene() instanceof Scene_Map ?
            amryl.currentScene()['_messageWindow'].x : 0;
        this._textBoxPositionY = amryl.currentScene() instanceof Scene_Map ?
            amryl.currentScene()['_messageWindow'].y : 0; /*-
          amryl.currentScene()['_messageWindow'].height) - 8 : 0; */
    };
    Sprite_LVNForeground.prototype.addToArea = function (element, area) {
        var _a = element.bitmap, width = _a.width, height = _a.height;
        var x = this.getArea(area, width / 2) + LuciaParams.bustXOffset;
        var y = this._textBoxPositionY - (height / 2) + LuciaParams.bustYOffset;
        this.addChild(element);
        console.log(x, area);
        element.setPosition(x, y);
    };
    Sprite_LVNForeground.prototype.addToAreaFrom = function (element, startArea, endArea) {
        var _a = element.bitmap, width = _a.width, height = _a.height;
        var startX = this.getStartArea(startArea, width);
        var endX = this.getArea(endArea, width / 2) + LuciaParams.bustXOffset;
        var y = this._textBoxPositionY - (height / 2) + LuciaParams.bustYOffset;
        element.visible = false;
        this.addChild(element);
        element.setPosition(startX, y);
        element.visible = true;
        element.startLerpPosition(element.position, new PIXI.Point(endX, y), LuciaParams.bustSlideSpeed);
    };
    Sprite_LVNForeground.prototype.getArea = function (area, bitmapWidth) {
        area = area.trim().toUpperCase();
        switch (area) {
            case 'LEFT':
                return this._leftPosition + bitmapWidth;
            case 'CENTER':
                return this._centerPosition;
            case 'RIGHT':
                return this._rightPosition;
            default:
        }
    };
    Sprite_LVNForeground.prototype.charLeave = function (bust, position) {
        var leaveArea = this.getStartArea(position.toUpperCase(), bust.sprite.bitmap.width);
        bust.sprite.leaveScene(leaveArea);
    };
    Sprite_LVNForeground.prototype.getStartArea = function (area, bitmapWidth) {
        area = area.trim().toUpperCase();
        switch (area) {
            case 'LEFT':
                return (0 - bitmapWidth);
            case 'RIGHT':
                return Graphics.width;
            default:
        }
    };
    Sprite_LVNForeground.prototype.fadeOut = function () {
        this._fadeOut = true;
    };
    Sprite_LVNForeground.prototype.fadeIn = function () {
        this._fadeIn = true;
    };
    Sprite_LVNForeground.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._fadeOut === true)
            this.processFadeOut();
        if (this._fadeIn === true)
            this.processFadeIn();
    };
    Sprite_LVNForeground.prototype.processFadeOut = function () {
        if (this._wait <= 0) {
            this._wait = 10;
            this.opacity = amryl.lerp(this.opacity, -1, 0.2);
            if (this.opacity <= 0)
                this._fadeOut = false;
        }
        this._wait--;
    };
    Sprite_LVNForeground.prototype.processFadeIn = function () {
        if (this._wait <= 0) {
            this._wait = 10;
            this.opacity = amryl.lerp(this.opacity, 256, 0.2);
            if (this.opacity <= 0)
                this._fadeIn = false;
        }
        this._wait--;
    };
    return Sprite_LVNForeground;
}(Sprite_Base));
//=============================================================================
//  Sprite_LVNBackground
//=============================================================================
var Sprite_LVNBackground = (function (_super) {
    __extends(Sprite_LVNBackground, _super);
    function Sprite_LVNBackground() {
        var _this = _super.call(this) || this;
        _this._wait = 15;
        _this._currentBackground = null;
        _this._newBackground = null;
        return _this;
    }
    Sprite_LVNBackground.prototype.addBackground = function (backgroundName) {
        var sprite = new Sprite();
        sprite.bitmap = amryl.loadImage(backgroundName);
        this._currentBackground = sprite;
        this.addChild(sprite);
    };
    Sprite_LVNBackground.prototype.changeBackground = function (backgroundName) {
        var sprite = new Sprite();
        sprite.bitmap = amryl.loadImage(backgroundName);
        if (this._currentBackground === null) {
            sprite.opacity = 0;
            this._currentBackground = sprite;
            this.addChild(this._currentBackground);
        }
        else {
            sprite.opacity = 0;
            this._newBackground = sprite;
            this.addChild(this._newBackground);
        }
    };
    Sprite_LVNBackground.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    Sprite_LVNBackground.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processBackgroundChange();
    };
    Sprite_LVNBackground.prototype.processBackgroundChange = function () {
        var sprite = this._newBackground;
        var currSprite = this._currentBackground;
        if (this._wait <= 0 && currSprite !== null && currSprite.opacity < 255) {
            this._wait = 15;
            currSprite.opacity =
                amryl.lerp(currSprite.opacity, 256, LuciaParams.backgroundFadeSpeed / 100);
        }
        else if (this._wait <= 0 && sprite !== null) {
            this._wait = 15;
            if (sprite.opacity < 255) {
                sprite.opacity =
                    amryl.lerp(sprite.opacity, 256, LuciaParams.backgroundFadeSpeed / 100);
            }
            else {
                this.removeChildAt(0);
                this._currentBackground = this._newBackground;
                this._newBackground = null;
            }
        }
        this._wait--;
    };
    return Sprite_LVNBackground;
}(Sprite_Base));
//=============================================================================
//  Sprite_LVNBust
//=============================================================================
var Sprite_LVNBust = (function (_super) {
    __extends(Sprite_LVNBust, _super);
    function Sprite_LVNBust(imageName, imageIndex) {
        if (imageIndex === void 0) { imageIndex = 0; }
        var _this = _super.call(this) || this;
        _this._imageName = imageName;
        _this._imageIndex = imageIndex;
        _this._hasMovement = LuciaParams.bustBob;
        _this._hasGrow = LuciaParams.bustGrow;
        _this._growRange = LuciaParams.bustGrowRange;
        _this._yMovementRange = LuciaParams.bustBobRange;
        _this._originalYPosition = _this.y;
        _this._originalScale = new PIXI.Point(_this.scale.x, _this.scale.y);
        _this._lerping = false;
        _this._leaving = false;
        _this._count = 0;
        _this.setupBust();
        _this.anchor.set(0.5, 0.5);
        return _this;
    }
    Sprite_LVNBust.prototype.setupBust = function () {
        var _this = this;
        var width = LuciaParams.bustWidth, height = LuciaParams.bustHeight;
        this.bitmap = new Bitmap(width, height);
        var bustImage = amryl.loadImage(this._imageName, 0);
        bustImage.addLoadListener(function () {
            _this.bitmap.blt(bustImage, 0, 0, bustImage.width, bustImage.height, 0, 0, width, height);
        });
        this.bitmap.smooth = true;
    };
    Sprite_LVNBust.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.hasMovement())
            this.updateBobAnimation();
        if (this.isLerping())
            this.lerpPosition(this._start, this._end, this._amount);
        if (this.hasGrow())
            this.updateGrowAnimation();
    };
    Sprite_LVNBust.prototype.hasMovement = function () {
        return this._hasMovement;
    };
    Sprite_LVNBust.prototype.hasGrow = function () {
        return this._hasGrow;
    };
    Sprite_LVNBust.prototype.isLerping = function () {
        return this._lerping;
    };
    Sprite_LVNBust.prototype.updateBobAnimation = function () {
        this.y = amryl.lerp(this.y, this._originalYPosition +
            (Math.sin(this._count / LuciaParams.bustBobSpeed)
                * this.yMovementRange()), 0.1);
        this._count++;
    };
    Sprite_LVNBust.prototype.updateGrowAnimation = function () {
        var growRange = LuciaParams.bustGrowRange;
        var x = this._originalScale.x + (Math.sin(this._count / 100) * growRange);
        var y = this._originalScale.y + (Math.sin(this._count / 100) * growRange);
        this.scale.set(x, y);
    };
    Sprite_LVNBust.prototype.leaveScene = function (position) {
        console.log("Leaving");
        this.startLerpPosition(this.position, new PIXI.Point(position, this.position.y), LuciaParams.bustSlideSpeed);
        // this.parent.removeChild(this);
    };
    Sprite_LVNBust.prototype.yMovementRange = function () {
        return this._yMovementRange;
    };
    Sprite_LVNBust.prototype.growRange = function () {
        return this._growRange;
    };
    Sprite_LVNBust.prototype.setMovement = function (boolean) {
        return this._hasMovement = boolean;
    };
    Sprite_LVNBust.prototype.setYMovementRange = function (num) {
        this._yMovementRange = num;
    };
    Sprite_LVNBust.prototype.setGrow = function (boolean) {
        this._hasGrow = boolean;
    };
    Sprite_LVNBust.prototype.setGrowRange = function (num) {
        this._growRange = num;
    };
    Sprite_LVNBust.prototype.setPosition = function (x, y) {
        this.position = new PIXI.Point(x, y);
        this._originalYPosition = this.position.y;
    };
    Sprite_LVNBust.prototype.startLerpPosition = function (start, end, amount) {
        this._lerping = true;
        this._start = start;
        this._end = end;
        this._amount = amount;
    };
    Sprite_LVNBust.prototype.lerpPosition = function (start, end, amount) {
        if (end.equals(new PIXI.Point(Math.round(start.x), Math.round(start.y)))) {
            this._lerping = false;
        }
        else {
            start.x = amryl.lerp(start.x, end.x, amount);
            start.y = amryl.lerp(start.y, end.y, amount);
        }
    };
    return Sprite_LVNBust;
}(Sprite_Base));
//=============================================================================
//  Sprite_Spinner
//=============================================================================
var Sprite_Spinner = (function (_super) {
    __extends(Sprite_Spinner, _super);
    function Sprite_Spinner(win) {
        var _this = _super.call(this) || this;
        _this._messageWindow = win;
        return _this;
    }
    Sprite_Spinner.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.anchor.set(0.5, 0.5);
        this._hasSpin = false;
        this._count = 0;
        this.hide();
    };
    Sprite_Spinner.prototype.setupSpinner = function (image) {
        var _this = this;
        this.bitmap = new Bitmap(32, 32);
        this.bitmap.blt(image, 0, 0, image.width, image.height, 0, 0, 32, 32);
        Lucia.Emitter.on("textPause", function (textState) {
            var x = textState.x, y = textState.y;
            var _a = _this._messageWindow, winx = _a.x, winy = _a.y;
            var padding = _this._messageWindow.textPadding();
            var lineHeight = _this._messageWindow.lineHeight();
            _this.move(winx + x + padding + 24, winy + y + padding + lineHeight);
            _this.show();
            _this.setSpin(true);
        });
        Lucia.Emitter.on("textEnd", function () {
            _this.hide();
            _this.setSpin(false);
        });
    };
    Sprite_Spinner.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.hasSpin())
            this.processSpin();
        // this._count++;
    };
    Sprite_Spinner.prototype.processSpinActivation = function () {
    };
    Sprite_Spinner.prototype.processSpin = function () {
        this.rotation += 0.1 * LuciaParams.spinnerSpeed;
    };
    Sprite_Spinner.prototype.hasSpin = function () {
        return this._hasSpin;
    };
    Sprite_Spinner.prototype.setSpin = function (spin) {
        this._hasSpin = spin;
    };
    return Sprite_Spinner;
}(Sprite_Base));
//=============================================================================
//  Window_LTextLog
//=============================================================================
var Window_LTextLog = (function (_super) {
    __extends(Window_LTextLog, _super);
    function Window_LTextLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_LTextLog.prototype.initialize = function (x, y, width, height) {
        this._textList = [];
        this.setCursorFixed(true);
        _super.prototype.initialize.call(this, x, y, width, height);
        this.activate();
        this._cursorFixed = true;
        this.setBackgroundType(LuciaParams.textLogBackgroundType);
    };
    Window_LTextLog.prototype.maxItems = function () {
        return this._textList.length;
    };
    Window_LTextLog.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        this.drawTextEx(this._textList[index], rect.x, rect.y);
    };
    Window_LTextLog.prototype.setTextList = function (list) {
        this._textList = list;
        this.refresh();
    };
    return Window_LTextLog;
}(Window_Selectable));
//=============================================================================
//  Window_LVNCommands
//=============================================================================
var Window_LVNCommands = (function (_super) {
    __extends(Window_LVNCommands, _super);
    function Window_LVNCommands(x, y, width, height) {
        var _this = _super.call(this, x, y) || this;
        _this._commandWidth = width;
        _this.move(_this.x, _this.y, _this._commandWidth, _this.windowHeight());
        return _this;
    }
    Window_LVNCommands.prototype.initialize = function (x, y) {
        _super.prototype.initialize.call(this, x, y);
        if (!LuciaParams.enableCommandWindow)
            this.openness = 0;
    };
    Window_LVNCommands.prototype.makeCommandList = function () {
        this.addVisualNovelCommands();
    };
    Window_LVNCommands.prototype.addVisualNovelCommands = function () {
        this.addCommand("Log", "log", true);
        this.addCommand("Save", "save", true);
        this.addCommand("Load", "load", true);
        this.addCommand("Options", "options", true);
        this.addCommand("Title", "title", true);
    };
    Window_LVNCommands.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processPlayerMovement();
    };
    Window_LVNCommands.prototype.processPlayerMovement = function () {
        if (this.isTouchedInsideFrame())
            $gameTemp.clearDestination();
    };
    return Window_LVNCommands;
}(Window_Command));
//=============================================================================
//  Window_LVName
//============================================================================= 
var Window_LVName = (function (_super) {
    __extends(Window_LVName, _super);
    function Window_LVName(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this._name = '';
        _this._orientation = "LEFT";
        return _this;
    }
    Window_LVName.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this.openness = 0;
    };
    Window_LVName.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processOpen();
    };
    Window_LVName.prototype.refresh = function () {
        if (this.contents) {
            this.contents.clear();
            this.drawName();
        }
    };
    Window_LVName.prototype.drawName = function () {
        this.drawText(this._name, 0, 0, this.contentsWidth(), "left");
    };
    Window_LVName.prototype.processOpen = function () {
        if (this._name.length > 0 && !this.isOpen()) {
            this.open();
        }
        if (this._name.length === 0 && this.isOpen()) {
            this.close();
        }
    };
    Window_LVName.prototype.setName = function (name) {
        this._name = name;
        this.refresh();
    };
    Window_LVName.prototype.setOrientation = function (orientation) {
        if (orientation.toUpperCase() === this._orientation)
            return;
        var orient = orientation.toUpperCase();
        switch (orient) {
            case 'LEFT':
                this.move(0, this.y, this.width, this.height);
                this._orientation = orient;
                break;
            case 'RIGHT':
                this.move(Graphics.width - this.width, this.y, this.width, this.height);
                this._orientation = orient;
                break;
            default:
        }
    };
    return Window_LVName;
}(Window_Base));
//=============================================================================
//  Window_LVNPicture
//=============================================================================
var Window_LVNPicture = (function (_super) {
    __extends(Window_LVNPicture, _super);
    function Window_LVNPicture(x, y, width, height) {
        return _super.call(this, x, y, width, height) || this;
    }
    Window_LVNPicture.prototype.initialize = function (x, y, width, height) {
        _super.prototype.initialize.call(this, x, y, width, height);
        this.openness = 0;
    };
    Window_LVNPicture.prototype.drawImage = function () {
        var _a = this._bitmap, width = _a.width, height = _a.height;
        this.contents.blt(this._bitmap, 0, 0, width, height, 0, 0, this.contentsWidth(), this.contentsHeight());
    };
    Window_LVNPicture.prototype.setImage = function (image) {
        this._bitmap = image;
        this.drawImage();
    };
    return Window_LVNPicture;
}(Window_Base));
//=============================================================================
//  Window_Base
//============================================================================= 
var _winBase_escChar = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter =
    function (code, textState) {
        switch (code) {
            default:
                _winBase_escChar.call(this, code, textState);
        }
    };
//=============================================================================
//  Window_Message
//=============================================================================
Lucia.autoAdvanceTimer = amryl.createTimer(LuciaParams.autoAdvanceTime);
var _WinMessage_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function () {
    this._visibleRows = undefined;
    this._savedTextState = null;
    _WinMessage_initialize.call(this);
    // this.setupAutoAdvanceBinding();
};
Window_Message.prototype.windowWidth = function () {
    return LuciaParams.messageWindowWidth || Graphics.boxWidth;
};
Window_Message.prototype.numVisibleRows = function () {
    return this._visibleRows || LuciaParams.messageWindowRows || 4;
};
Window_Message.prototype['setVisibleRows'] = function (number) {
    this._visibleRows = number;
};
var _WinMessage_move = Window_Message.prototype.move;
Window_Message.prototype.move =
    function (x, y, width, height) {
        _WinMessage_move.call(this, x, y, width, height);
        this['resizeContents'](this.contentsWidth(), this.contentsHeight());
    };
Window_Message.prototype['resizeContents'] =
    function (width, height) {
        if (this.contents) {
            this.contents.resize(width, height);
        }
    };
var _RVNWindowM_update = Window_Message.prototype.update;
Window_Message.prototype.update = function () {
    _RVNWindowM_update.call(this);
    this['processVNNameWindow']();
    if (LuciaParams.autoAdvanceText === true)
        this['processTextAdvance']();
};
Window_Message.prototype['processVNNameWindow'] = function () {
    if (this.isClosing()) {
        Lucia._nameWindow.setName("");
    }
};
var _RVNWindowM_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter =
    function (code, textState) {
        switch (code) {
            case 'VNC':
                this['showVNCharacterName'](this.obtainEscapeParam(textState));
                break;
            default:
                return _RVNWindowM_processEscapeCharacter.call(this, code, textState);
        }
    };
Window_Message.prototype['showVNCharacterName'] = function (charIndex) {
    var vncharacter = LuciaParams.characters[charIndex - 1];
    if (!amryl.nullOrUndefined(vncharacter))
        Lucia._nameWindow.setName(vncharacter.name);
};
var _RVNWindow_startPause = Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function () {
    _RVNWindow_startPause.call(this);
    Lucia.Emitter.emit("textPause", this._textState);
};
Window_Message.prototype['processTextAdvance'] = function () {
    var timer = Lucia.autoAdvanceTimer;
    if (timer.timeUp()) {
        if (this.canStart()) {
            this._pauseSkip = true;
            this.pause = false;
            this.terminateMessage();
        }
    }
};
var _RVNWindow_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function () {
    _RVNWindow_terminateMessage.call(this);
    Lucia.Emitter.emit("textEnd");
    LuciaAPI.setName("");
    var timer = Lucia.autoAdvanceTimer;
    timer.resetTimer();
};
var _RVNWindow_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function (textState) {
    _RVNWindow_newPage.call(this, textState);
    Lucia.Emitter.emit("newPage");
};
var _RVNWindow_onEndOfText = Window_Message.prototype.onEndOfText;
Window_Message.prototype.onEndOfText = function () {
    _RVNWindow_onEndOfText.call(this);
    var timer = Lucia.autoAdvanceTimer;
    timer.startTimer();
};
//=============================================================================
//  Game_Message
//=============================================================================
var _GameMessage_add = Game_Message.prototype.add;
Game_Message.prototype.add = function (text) {
    _GameMessage_add.call(this, text);
    LuciaUtil.pushNoDuplicates(Lucia.GameText, text);
    //Track text in message window
    console.log(Lucia.GameText);
};
//=============================================================================
//  DataManager
//============================================================================= 
var _DM_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = _DM_makeSaveContents.call(this);
    contents.gameTextContents = Lucia.GameText;
    return contents;
};
var _DM_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    _DM_extractSaveContents.call(this, contents);
    Lucia.GameText = contents['gameTextContents'];
};
//=============================================================================
//  Utility
//=============================================================================
var LuciaAPI = {
    sendMessage: function (message, faceName, faceIndex) {
        $gameMessage.setFaceImage(faceName, faceIndex);
        $gameMessage.add(message);
    },
    fullScreenMode: function (full) {
        var scene = this.mapScene();
        if (scene !== null) {
            if (full) {
                scene['_messageWindow']
                    .move(0, 0, Graphics.width, Graphics.height);
                var line = scene['_messageWindow'].fittingHeight(0);
                var lines = Math
                    .floor(scene['_messageWindow'].contentsHeight() / line);
                scene['_messageWindow']['setVisibleRows'](lines);
            }
            else {
                var _a = Lucia.DefaultMessageWindow, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                scene['_messageWindow']['setVisibleRows'](LuciaParams.messageWindowRows);
                scene['_messageWindow']
                    .move(x, y, width, height);
            }
        }
    },
    screenShotMode: function (condition) {
        LuciaUtil.closeAllWindows(condition);
    },
    textLog: function () {
        SceneManager.push(Scene_LTextLog);
    },
    logText: function () {
        return Lucia.GameText;
    },
    showVNCommands: function (show) {
        this.mapSceneC(function (scene) {
            if (show)
                scene['_lvnCommandWindow'].open();
            else
                scene['_lvnCommandWindow'].close();
        });
    },
    changeBackground: function (backgroundName) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container.changeBackground(backgroundName);
        });
    },
    hideBackground: function (condition) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            amryl.toBoolean(condition) ?
                container._background.hide() : container._background.show();
        });
    },
    fadeOutBackground: function (speed) {
        var _this = this;
        if (speed === void 0) { speed = LuciaParams.backgroundFadeSpeed; }
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            var intervalId = setInterval(function () {
                container._background.opacity =
                    amryl.lerp(container._background.opacity, -1, speed / 100);
                if (container._background.opacity <= 0) {
                    clearInterval(intervalId);
                    setTimeout(_this.hideBackground.bind(_this, true), 2000);
                }
            }, 100);
        });
    },
    fadeInBackground: function (speed) {
        var _this = this;
        if (speed === void 0) { speed = LuciaParams.backgroundFadeSpeed; }
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            var intervalId = setInterval(function () {
                _this.hideBackground(false);
                container._background.opacity =
                    amryl.lerp(container._background.opacity, 256, speed / 100);
                if (container._background.opacity > 254) {
                    clearInterval(intervalId);
                }
            }, 100);
        });
    },
    hideForeground: function (condition) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            amryl.toBoolean(condition) ?
                container._foreground.hide() : container._foreground.show();
        });
    },
    fadeOutForeground: function () {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container._foreground.fadeOut();
        });
    },
    fadeInForeground: function () {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container._foreground.fadeIn();
        });
    },
    showPicture: function (show, path) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, file, folder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        image = null;
                        if (!show) return [3 /*break*/, 2];
                        _a = amryl.splitPath(path), file = _a.file, folder = _a.folder;
                        return [4 /*yield*/, this.getImage(folder, file)];
                    case 1:
                        image = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.mapSceneC(function (scene) {
                            var container = scene['_lvnPictureWindow'];
                            if (show) {
                                container.setImage(image);
                                container.open();
                            }
                            else {
                                container.close();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    getImage: function (path, fileName, hue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var bitmap = ImageManager.loadBitmap(path, fileName, hue, false);
                        bitmap.addLoadListener(function () {
                            resolve(bitmap);
                        });
                    })];
            });
        });
    },
    addCharByIndex: function (index, area) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            var character = LuciaParams.characters[index - 1];
            container.addCharacter(character.name, character.bustGraphic, area);
        });
    },
    addCharByIndexFrom: function (index, startArea, endArea) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            var character = LuciaParams.characters[index - 1];
            container.addCharacterFrom(character.name, character.bustGraphic, startArea, endArea);
        });
    },
    addChar: function (name, imageName, area) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container.addCharacter(name, imageName, area);
        });
    },
    addCharFrom: function (name, imageName, startArea, endArea) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container.addCharacterFrom(name, imageName, startArea, endArea);
        });
    },
    removeChar: function (name) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container.removeCharacter(name.toUpperCase());
        });
    },
    charLeave: function (name, position) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            container.charLeave(name, position);
        });
    },
    charLeaveByIndex: function (index, position) {
        this.mapSceneC(function (scene) {
            var container = scene['_lvnContainer'];
            var character = LuciaParams.characters[index - 1];
            container.charLeave(character.name, position);
        });
    },
    characterCache: function () {
        return Lucia.CharacterCache;
    },
    alignNameWindow: function (orientation) {
        this.mapSceneC(function (scene) {
            var gameWindow = scene._lvnNameWindow;
            gameWindow.setOrientation(orientation);
        });
    },
    setName: function (name) {
        this.mapSceneC(function (scene) {
            var gameWindow = scene._lvnNameWindow;
            gameWindow.setName(name);
        });
    },
    mapSceneC: function (callback) {
        var scene = amryl.currentScene();
        if (scene instanceof Scene_Map) {
            callback(scene);
        }
        else {
            console.error("Not on map scene.");
        }
    },
    mapScene: function () {
        var scene = amryl.currentScene();
        if (scene instanceof Scene_Map) {
            return scene;
        }
        else {
            return null;
        }
    }
};
var LuciaUtil = {
    cacheCharacter: function (name, character) {
        Lucia.CharacterCache[name.toUpperCase()] = character;
        console.log(Lucia.CharacterCache);
    },
    getCharacter: function (name) {
        return Lucia.CharacterCache[name.toUpperCase()];
    },
    removeCharacterFromCache: function (name) {
        delete Lucia.CharacterCache[name.toUpperCase()];
    },
    pushNoDuplicates: function (list, element) {
        if (!list.contains(element)) {
            list.push(element);
        }
    },
    closeAllWindows: function (close) {
        var scene = amryl.currentScene();
        if (scene instanceof Scene_Map) {
            var windows = amryl.filterCl(function (element) {
                if (!amryl.nullOrUndefined(element) && typeof element === 'object') {
                    return element instanceof Window_Base;
                }
                else {
                    return false;
                }
            }, scene);
            for (var prop in windows) {
                var gameWindow = windows[prop];
                close ? gameWindow.visible = false : gameWindow.visible = true;
            }
        }
    }
};
//=============================================================================
//  API
//=============================================================================
Object.assign(Lucia, LuciaAPI);
amryl.addPluginCommand('textLog', LuciaAPI.textLog.bind(LuciaAPI));
amryl.addPluginCommand('fullScreen', function (condition) {
    LuciaAPI.fullScreenMode(amryl.toBoolean(condition));
});
amryl.addPluginCommand('screenShot', function (condition) {
    LuciaAPI.screenShotMode(amryl.toBoolean(condition));
});
amryl.addPluginCommand('showVNCommands', function (show) {
    LuciaAPI.showVNCommands(amryl.toBoolean(show));
});
amryl.addPluginCommand('changeBackground', LuciaAPI.changeBackground.bind(LuciaAPI));
amryl.addPluginCommand('fadeOutBackground', LuciaAPI.fadeOutBackground.bind(LuciaAPI));
amryl.addPluginCommand('fadeInBackground', LuciaAPI.fadeInBackground.bind(LuciaAPI));
amryl.addPluginCommand('hideBackground', function (hide) {
    LuciaAPI.hideBackground(amryl.toBoolean(hide));
});
amryl.addPluginCommand('hideForeground', function (hide) {
    LuciaAPI.hideForeground(amryl.toBoolean(hide));
});
amryl.addPluginCommand('fadeinForeground', LuciaAPI.fadeInForeground.bind(LuciaAPI));
amryl.addPluginCommand('fadeOutForeground', LuciaAPI.fadeOutForeground.bind(LuciaAPI));
amryl.addPluginCommand('showPicture', function (show, path) {
    LuciaAPI.showPicture(amryl.toBoolean(show), path);
});
amryl.addPluginCommand('alignNameWindow', LuciaAPI.alignNameWindow.bind(LuciaAPI));
amryl.addPluginCommand('addChar', LuciaAPI.addChar.bind(LuciaAPI));
amryl.addPluginCommand('addCharFrom', LuciaAPI.addCharFrom.bind(LuciaAPI));
amryl.addPluginCommand('addCharByIndex', LuciaAPI.addCharByIndex.bind(LuciaAPI));
amryl.addPluginCommand('addCharByIndexFrom', LuciaAPI.addCharByIndexFrom.bind(LuciaAPI));
amryl.addPluginCommand('sendMessage', LuciaAPI.sendMessage.bind(LuciaAPI));
amryl.addPluginCommand('removeCharacter', LuciaAPI.removeChar.bind(LuciaAPI));
amryl.addPluginCommand('charLeave', LuciaAPI.charLeave.bind(LuciaAPI));
amryl.addPluginCommand('charLeaveByIndex', LuciaAPI.charLeaveByIndex.bind(LuciaAPI));
amryl.addPluginCommand('closeAllWindows', function (close) {
    LuciaUtil.closeAllWindows(amryl.toBoolean(close));
});
var $luc = Lucia;
