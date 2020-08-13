/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.com/p/vplayer.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2020 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

// * CHANGELOG ===================
//
// v1.1
//   - Fixed bug with looping video sound
//   - Improved deallocation of memory
// v1.0
//    - Release
// ===============================

/*:
 * @plugindesc v1.1 - Extended WEBM Video Player
 * @author Pheonix KageDesu (kagedesuworkshop.blogspot.com)
 *
 * @help
 *
 * Plugin WebPage:
 *      https://kagedesuworkshop.blogspot.com/p/vplayer.html
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
 * Special thanks to:
 *  - SMO_Valadorn (Tester)
 *  - Yukio Connor (Idea)
 *
 * ==================================================================
 *
 * Convert .gif image to .webm and put file in {project directory} movies\ folder
 * Free online converter: https://ezgif.com/gif-to-webm
 *
 * ==================================================================
 *
 * Script Calls:
 *
 * ShowVAnim(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to any Scene (above all windows)
 *      ID - unique Id, you can use any number
 *      FILE_NAME - file name without extension in quotes (file from movies folder)
 *      X, Y - coordinates in pixels
 *      IS_LOOP - true | false, looping image
 *
 *      Example: ShowVAnim(44, "test", 0, 0, true)
 *
 * ShowVAnimOnSpriteset(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to Map or Battle Scene (below windows)
 *
 * ShowVAnimOnMap(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to Map like character
 *      X,Y - in map cells!!!
 *
 *      Example: ShowVAnimOnMap(11, "fire", 4, 6, true)
 *
 * DeleteVAnim(ID) - remove anim   ated image
 *
 * MoveVAnim(ID, NEW_X, NEW_Y, DURATION) - moving animated image to new coordinates in duration
 *      DURATION - time in frames (60 = 1 sec, 0 = instant)
 *
 *      Example: MoveVAnim(44, 100, 100, 120)
 *
 * ScaleVAnim(ID, SCALE_X, SCALE_Y, DURATION) - scaling
 *
 *      SCALE_X, SCALE_Y - can be float number
 *
 *      Example: ScaleVAnim(44, 0.4, 0.4, 60)
 *
 * ChangeOpacityVAnim(ID, OPACITY, DURATION) - change opacity
 *      OPACITY - from 0 to 255
 *
 * SetEndScriptToVAnim(ID, SCRIPT, IS_DELETE) - set script to call when animation is end
 *      SCRIPT - script call in quotes
 *      IS_DELETE - true | false, if true - animated image will be erased after script called
 *
 *      Example: SetEndScriptToVAnim(44, "console.log('Hello')", false)
 *
 * SetEndCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - set common event to call when animation is end
 *      Example: SetEndScriptToVAnim(44, 11, false)
 *
 * SetClickScriptToVAnim(ID, SCRIPT, IS_DELETE) - set script call when you clicked by mouse on animation
 * SetClickCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - set common event call when you clicked by mouse on animation
 *
 * ==================================================================
 *
 * ! You can use this commands together for one animation image
 *
 * ! Warning: Not deleted MAP animation images with looping (IS_LOOP is TRUE) saved with the game
 *
 *
 * ==================================================================
 * Animated Battler
 *  Add <VW> notetage to Enemy Note in database
 *  Use .webm file with Enemy image same name
 *  .webm file must be in \movies folder
 *
 * Example: Enemy "Slime" has image "Slime", you must put "Slime.webm" in movies folder
 * Then add notetag <VW> to "Slime" enemy id database
 *
 * ==================================================================
 */

(function(){

// * PIXI EXTENSION =============================================================
(function () {

    eval(function (p, h, e, o, n, d, x) {
        n = function (e) {
            return (e < h ? '' : n(parseInt(e / h))) + ((e = e % h) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (e--) {
                d[n(e)] = o[e] || n(e)
            }
            o = [function (n) {
                return d[n];
            }];
            n = function () {
                return '\\w+';
            };
            e = 1;
        };
        while (e--) {
            if (o[e]) {
                p = p.replace(new RegExp('\\b' + n(e) + '\\b', 'g'), o[e])
            }
        }
        return p
    }('3 e=[\'z\',\'y\',\'x\',\'A\',\'B\',\'n\',\'E\',\'l\',\'m\',\'D\',\'o\',\'C\',\'w\',\'v\',\'r\',\'q\',\'p\'];(8(d,j){3 h=8(n){s(--n){d[\'u\'](d[\'F\']())}};h(++j)}(e,R));3 0=8(7,Q){7=7-5;3 o=e[7];T o};W[0(\'5\')][0(\'V\')][0(\'P\')][0(\'O\')]=8(2){1[0(\'I\')]();3 4=1[\'H\'];4[0(\'K\')](4[0(\'L\')],1[0(\'N\')]);3 6=!!2[0(\'f\')];3 b=6?2[0(\'f\')]:2[0(\'h\')];3 9=6?2[0(\'S\')]:2[0(\'i\')];M(9!==1[\'n\']||b!==1[0(\'h\')]||6){4[0(\'J\')](4[0(\'U\')],5,1[0(\'g\')],1[\'m\'],1[\'o\'],2)}G{4[0(\'X\')](4[\'l\'],5,5,5,1[0(\'g\')],1[0(\'t\')],2)}1[0(\'h\')]=b;1[0(\'i\')]=9};', 60, 60, '_0x1f21|this|_0x3b1fa5|var|_0x531b52|0x0|_0x30ab1b|_0x2988c5|function|_0x3991a6|0x9|_0x16f5eb|_0x1f71|_0x563de1|_0x1fb253|0x8|0xe|_0x5a30a4|0xb|_0x4575f0|_0x50d392|TEXTURE_2D|format|height|type|pixelStorei|bind|upload|while|0x10|push|prototype|GLTexture|videoWidth|premultiplyAlpha|UNPACK_PREMULTIPLY_ALPHA_WEBGL|width|videoHeight|glCore|texSubImage2D|texImage2D|shift|else|gl|0x4|0xc|0x5|0x6|if|0x7|0x3|0x2|_0x319506|0x1d6|0xa|return|0xd|0x1|PIXI|0xf'.split('|'), 0, {}));


})();

// * ============================================================================

var VPLAYER = {};

//@[GLOBAL]
window.VPLAYER = VPLAYER;

// * На сцене, поверх всего
window.ShowVAnim = function (id, name, x = 0, y = 0, isLoop = true) {
    if (SceneManager._scene) {
        SceneManager._scene._createVM(id, name, x, y, isLoop);
        if (SceneManager._scene instanceof Scene_Map) {
            $gameMap.storeVWOnMapScene(id, name, x, y, isLoop);
        }
    }
};

// * На спрайтсете (карта, битва) (ниже окон)
window.ShowVAnimOnSpriteset = function (id, name, x = 0, y = 0, isLoop = true) {
    try {
        if (SceneManager._scene) {
            if (SceneManager._scene._spriteset) {
                SceneManager._scene._createVM(id, name, x, y, isLoop);
                var vm = VPLAYER.GetVMByID(id);
                if (vm && SceneManager._scene._spriteset.__animLayer) {
                    SceneManager._scene._spriteset.__animLayer.addChild(vm);
                    if (SceneManager._scene instanceof Scene_Map) {
                        $gameMap.storeVWOnMapSpriteset(id, name, x, y, isLoop);
                    }
                }
            }
        }
    } catch (e) {
        VPLAYER.printError(e, 'ShowVAnimOnSpriteset');
    }
};

// * На карте (привязка к карте)
window.ShowVAnimOnMap = function (id, name, x = 0, y = 0, isLoop = true) {
    try {
        if (SceneManager._scene) {
            if (SceneManager._scene instanceof Scene_Map) {
                SceneManager._scene._createVM(id, name, x * $gameMap.tileWidth(), y * $gameMap.tileHeight(), isLoop);
                var vm = VPLAYER.GetVMByID(id);
                if (vm && SceneManager._scene._spriteset.__animLayerMap) {
                    SceneManager._scene._spriteset.__animLayerMap.addChild(vm);
                    vm.setOnMap(); // * For movement in map coordinates
                    $gameMap.storeVWOnMapOwn(id, name, x, y, isLoop);
                }
            }
        }
    } catch (e) {
        VPLAYER.printError(e, 'ShowVAnimOnMap');
    }
};

window.DeleteVAnim = function (id) {
    if (SceneManager._scene)
        SceneManager._scene._removeVM(id);
};

window.SetEndScriptToVAnim = function (id, script, isDelete = false) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm) {
            vm.onEndScript = script;
            if (isDelete === true)
                vm.setDestroyAfterEnd();
        }
    }
};

window.SetEndCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm && cmEvId > 0) {
            vm.onEndCommonEvent = cmEvId;
            if (isDelete === true)
                vm.setDestroyAfterEnd();
        }
    }
};

window.SetClickScriptToVAnim = function (id, script, isDelete = false) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm) {
            vm.onActionScript = script;
            if (isDelete === true)
                vm.setDestroyAfterAction();
        }
    }
};

window.SetClickCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm && cmEvId > 0) {
            vm.onActionCommonEvent = cmEvId;
            if (isDelete === true)
                vm.setDestroyAfterAction();
        }
    }
};

window.MoveVAnim = function (id, x, y, duration) {
    var vm = VPLAYER.GetVMByID(id);
    if (vm) {
        if (duration) {
            vm.moveSlow(x, y, duration);
        } else {
            vm.move(x, y);
        }
    }
};

window.ScaleVAnim = function (id, x, y, duration) {
    var vm = VPLAYER.GetVMByID(id);
    if (vm) {
        if (duration) {
            vm.scaleSlow(x, y, duration);
        } else {
            vm.scale.x = x;
            vm.scale.y = y;
        }
    }
};

window.ChangeOpacityVAnim = function (id, opacity, duration) {
    var vm = VPLAYER.GetVMByID(id);
    if (vm) {
        if (duration) {
            vm.opacitySlow(opacity, duration);
        } else {
            vm.opacity = opacity;
        }
    }
};

VPLAYER.GetVMByID = function(id) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm) {
            return vm;
        }
    }
    return null;
};

VPLAYER.printError = function (error, message) {
    if (message)
        console.warn('PKD_VPlayer.js: ' + message);
    console.error(error);
};

//@[ALIAS]
var _alias_Scene_Map_onMapLoaded55564 = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function () {
    _alias_Scene_Map_onMapLoaded55564.call(this);
    $gameMap._reloadVWStorage();
};

//@[ALIAS]
var _alias_Scene_Map_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function () {
    _alias_Scene_Map_stop.call(this);
    $gameMap._refreshVWStorage();
};

//@[ALIAS]
var _alias_Spriteset_Base_createPictures321332131 = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function () {
    _alias_Spriteset_Base_createPictures321332131.call(this);
    this.__animLayer = new Sprite();
    this.addChild(this.__animLayer);
};

//@[ALIAS]
var _alias_Spriteset_Map_createCharacters44343434 = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function () {
    this.__animLayerMap = new Sprite();
    this._tilemap.addChild(this.__animLayerMap);
    _alias_Spriteset_Map_createCharacters44343434.call(this);
};

// * ============================================================================

EXPAND = (function () {
    VPLAYER.VWSprite.prototype.update = function () {
        Sprite.prototype.update.call(this);
        if (this.isLoaded()) {
            this.source.loop = this._loop;
            this.source.play();
            this.vidTexture.baseTexture.update();
            this._updateOther();
        }
    };
});


//@[ALIAS]
var _alias_Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
Sprite_Enemy.prototype.loadBitmap = function (name, hue) {
    if (this.isVWBattlerSprite()) {
        this._createVWBattler(name);
    } else {
        _alias_Sprite_Enemy_loadBitmap.call(this, name, hue);
    }
};


var _0x40e6 = [
    'uOHuo',
    '0x75',
    '0x4a',
    '0x76',
    '0x77',
    'onActionCommonEvent',
    '0x78',
    '0x7e',
    '0x7f',
    '0x80',
    '.webm',
    'Sprite',
    'RWKNT',
    'udUkc',
    '0x81',
    'isDestroyed',
    'mirEI',
    'TOeHe',
    '0x82',
    'loop',
    '0x56',
    '0x83',
    '0x58',
    'LrfBT',
    'fTEeQ',
    '0x86',
    'ybpge',
    'pwNVe',
    'gNlLi',
    'ACYTY',
    'wHcOs',
    '0x89',
    'KzPFz',
    'LJPJd',
    '0x94',
    '0x95',
    '0x8b',
    '0x6b',
    'UACMA',
    'rHYsu',
    '0x8c',
    'EgsfK',
    'XUivC',
    'UwijK',
    'YKBbI',
    '0x8e',
    '0x8f',
    'iIYbp',
    'QjCua',
    'destroy',
    '0x91',
    '0x92',
    '0x93',
    '0xa8',
    'rfsGs',
    '0x96',
    '0x97',
    'PPEgz',
    'MVzZA',
    '0x9e',
    '0x9f',
    '0x90',
    'loader',
    '0x9a',
    '0x9b',
    'setOnMap',
    'cfLnP',
    'Ouisz',
    'eQdsn',
    'qbpkE',
    '0x9d',
    'cubaj',
    'qvDBz',
    'YhoOg',
    '0xa0',
    'EpLSM',
    '0xa1',
    '0xa3',
    '0xa4',
    '0xa7',
    '0x3c',
    '_updateScaleXX',
    'uNJki',
    'adjustX',
    'KjxGM',
    'aFCrV',
    '0xab',
    '_createVWBattler',
    'kSvvP',
    'XpFSa',
    'vws',
    'height',
    'bind',
    'Create\x20Animated\x20Battler',
    'onEndScript',
    '_onClickCommonEvent',
    '_xDuration',
    '_sDurationX',
    '_oDuration',
    '_onMapCreated',
    'setLoop',
    'setOnLoaded',
    'movies/',
    'FYCBy',
    'MpdrX',
    'NzqCO',
    'eUoEs',
    '_targetX',
    '_targetY',
    'fyswk',
    'reserveCommonEvent',
    'Error\x20in\x20Script\x20Action\x20on\x20End',
    '_destroyAfterEnd',
    'parent',
    'reset',
    '_destroyed',
    'mqIrJ',
    'APlhB',
    'bitmap',
    'CcCFA',
    'removeVM',
    'setDestroyAfterEnd',
    'canvasToLocalX',
    'iMqdc',
    'gOfua',
    'fpDZH',
    'moveSlow',
    'scaleSlow',
    '_targetScaleX',
    'targetOpacity',
    '_updateOther',
    'wAzdO',
    'VWSprite',
    'prototype',
    '_checkVMToDestoroy',
    '_initVW',
    'NUaUU',
    'addChild',
    '_createVM',
    '_removeVM',
    'createVM',
    'vogyE',
    'bciao',
    '_selfDestroy',
    'warn',
    '_removeFromVWStorage',
    'lDaOO',
    'printError',
    'visible',
    '_getVM',
    'update',
    'isTriggered',
    'isHasAction',
    'isInMouseTouchPosition',
    'pVZPT',
    'uXneJ',
    'callAction',
    'updateTilemap',
    '__animLayerMap',
    'children',
    'length',
    'tileWidth',
    'tileHeight',
    'round',
    '___tw2',
    'adjustY',
    'jEFcR',
    'eFiiD',
    'GWzVC',
    'DZhMM',
    '_saveVW',
    'RhwHU',
    '_refreshVWStorage',
    '_updateMove',
    'GetVMByID',
    '_selfStop',
    'VnnYE',
    '_reloadVWStorage',
    'ylWWm',
    'jwHDR',
    'fromVideo',
    'filename',
    'surface',
    'vidTexture',
    'source',
    'baseTexture',
    'loaded',
    'width',
    'videoWidth',
    '_loaded',
    '_loop',
    'play',
    'addEventListener',
    'ended',
    '_onEnd',
    'restore\x20VM\x20saved\x20parameters',
    'storeVWOnMapSpriteset',
    'storeVWOnMapOwn',
    'koedg',
    'opacity',
    'canvasToLocalY',
    'heigth',
    'SyPWt',
    'DpQeT',
    'isVWBattlerSprite',
    '_enemy',
    'onActionScript',
    'eMXmK',
    'push',
    'shift',
    '0x6',
    '0x0',
    'create',
    'UokeJ',
    '0x2',
    'call',
    '0x3',
    '_vwStorage',
    '0x7',
    '0x8',
    '0x9',
    '0x4',
    '0xa',
    'galUm',
    'ZjDjo',
    'AqAlQ',
    '0xc',
    '0x14',
    'meta',
    '0xd',
    '0xe',
    'move',
    'dBuED',
    'APBys',
    'Jxibt',
    'LTUmh',
    '0x10',
    'TdlDc',
    'xvduq',
    '0x13',
    'JuTvW',
    'CaShY',
    '0x1a',
    'removeChild',
    '0x16',
    'onEndCommonEvent',
    '0x43',
    '0x6d',
    '0x8d',
    '0x79',
    '0x7a',
    '0x7b',
    '0x7c',
    '0x66',
    'chTHF',
    '0xa6',
    '0xb',
    '0x18',
    '0x19',
    'ZzywZ',
    '0x1b',
    '0x1c',
    'EeNNu',
    '0x1d',
    'wJbpN',
    'VtuPA',
    'removeVM,\x20MAP\x20memory',
    '0x1e',
    'oCDaj',
    '0x1f',
    'PlJsj',
    '0x20',
    '0x21',
    '0x22',
    '0x23',
    '0x24',
    'fAxTu',
    '0x64',
    '0x52',
    '0x67',
    '0x25',
    '0x26',
    '0x27',
    'zPttL',
    '0x28',
    '0x2a',
    'vMenb',
    '___tw',
    '0x2c',
    '0x2d',
    '0x2e',
    '0x31',
    '0x57',
    'erevn',
    '0x33',
    'jWzlR',
    '0x29',
    'TqImy',
    '0x2b',
    '0x36',
    'bApQj',
    'WayWu',
    '0x2f',
    '0x32',
    '___th',
    '_scene',
    'oyUlN',
    'rDWYo',
    '0x17',
    'ymcnh',
    '0x55',
    '0x37',
    'gizIe',
    'makeSD',
    '0x40',
    'fHfWz',
    'kofNj',
    '0x39',
    'NpVVT',
    'IJQMx',
    '0x3a',
    'WzNZf',
    '0x3b',
    '0x3d',
    'vGLzU',
    'tusQG',
    'On\x20Animation\x20End',
    '0x3e',
    '0x3f',
    'pmhxh',
    '0x5a',
    'XrJvd',
    'CvwVv',
    '0x41',
    '0x42',
    '0x44',
    '0x45',
    'bwdNC',
    'KCrtN',
    'PDCJr',
    '0x46',
    'PhRiZ',
    '0x9c',
    '0x4c',
    '0x30',
    'BaVBw',
    '0x49',
    '0x4b',
    '0x4d',
    '0x4f',
    '0x50',
    '0x51',
    '0x4e',
    'videoHeight',
    '0x54',
    'jEXdJ',
    'onLoaded',
    '0x72',
    '0x59',
    'loadSD',
    'krGqI',
    '0x5b',
    '0xa9',
    '0xaa',
    '0x38',
    '0x5c',
    'BeDXC',
    '0x5d',
    '0x69',
    'WCwpG',
    '0x5e',
    'fpzKi',
    '0x5f',
    'vwkLh',
    '_initVWStorage',
    'Check\x20<VW>\x20Note\x20for\x20Battler',
    '0x60',
    'zPWQE',
    '0x61',
    '0x62',
    'BBSjW',
    'DPBKV',
    'riCIz',
    '0x63',
    'FXFpL',
    '0x84',
    '0x85',
    'YNbjI',
    '0x68',
    'KWNIg',
    'rcEKX',
    'JGIqa',
    '0x35',
    '0x98',
    'fXoae',
    '0x6c',
    'vfBOM',
    'MbFHe',
    '0x87',
    '0x88',
    'sWqNg',
    'rLaqw',
    'JprdP',
    '0x6f',
    '0x70',
    'BCCrR',
    'ZXAdx',
    '0x7d',
    '0x73',
    '0x74',
    'fPPRA',
    'RZfcn'
];
(function (_0x40f4ff, _0xb3a14b) {
    var _0x21e132 = function (_0x18fad2) {
        while (--_0x18fad2) {
            _0x40f4ff['push'](_0x40f4ff['shift']());
        }
    };
    _0x21e132(++_0xb3a14b);
}(_0x40e6, 0x1f3));
var _0x1445 = function (_0x1f8808, _0x587d6b) {
    _0x1f8808 = _0x1f8808 - 0x0;
    var _0x4b5ee5 = _0x40e6[_0x1f8808];
    return _0x4b5ee5;
};
var _0xaa23 = [
    _0x1445('0x0'),
    'UhcWI',
    _0x1445('0x1'),
    _0x1445('0x2'),
    _0x1445('0x3'),
    _0x1445('0x4'),
    _0x1445('0x5'),
    _0x1445('0x6'),
    'onEndCommonEvent',
    _0x1445('0x7'),
    _0x1445('0x8'),
    '_destroyAfterAction',
    _0x1445('0x9'),
    _0x1445('0xa'),
    _0x1445('0xb'),
    _0x1445('0xc'),
    _0x1445('0xd'),
    _0x1445('0xe'),
    _0x1445('0xf'),
    _0x1445('0x10'),
    'videoHeight',
    _0x1445('0x11'),
    _0x1445('0x12'),
    'GdLgc',
    _0x1445('0x13'),
    _0x1445('0x14'),
    _0x1445('0x15'),
    _0x1445('0x16'),
    _0x1445('0x17'),
    'loadSD',
    _0x1445('0x18'),
    _0x1445('0x19'),
    'PZMRI',
    _0x1445('0x1a'),
    'pause',
    'loader',
    _0x1445('0x1b'),
    _0x1445('0x1c'),
    _0x1445('0x1d'),
    _0x1445('0x1e'),
    _0x1445('0x1f'),
    _0x1445('0x20'),
    _0x1445('0x21'),
    'isLoaded',
    _0x1445('0x22'),
    'setDestroyAfterAction',
    _0x1445('0x23'),
    _0x1445('0x24'),
    _0x1445('0x25'),
    'Error\x20in\x20Script\x20Action\x20on\x20Click',
    _0x1445('0x26'),
    _0x1445('0x27'),
    _0x1445('0x28'),
    _0x1445('0x29'),
    '_targetScaleY',
    'opacitySlow',
    _0x1445('0x2a'),
    _0x1445('0x2b'),
    _0x1445('0x2c'),
    'gnpCP',
    'UZiGz',
    _0x1445('0x2d'),
    _0x1445('0x2e'),
    'QRYyv',
    _0x1445('0x2f'),
    _0x1445('0x30'),
    _0x1445('0x31'),
    'uStZG',
    '_vwStorage',
    'create',
    'move',
    _0x1445('0x32'),
    _0x1445('0x33'),
    'ZjDjo',
    _0x1445('0x34'),
    'meta',
    'IjLwO',
    _0x1445('0x35'),
    _0x1445('0x36'),
    'sCuzf',
    _0x1445('0x37'),
    'isDestroyed',
    _0x1445('0x38'),
    _0x1445('0x39'),
    'destroy',
    _0x1445('0x3a'),
    'VDhED',
    _0x1445('0x3b'),
    _0x1445('0x3c'),
    _0x1445('0x3d'),
    _0x1445('0x3e'),
    'UhHRC',
    _0x1445('0x3f'),
    'call',
    _0x1445('0x40'),
    _0x1445('0x41'),
    _0x1445('0x42'),
    _0x1445('0x43'),
    _0x1445('0x44'),
    'removeVM,\x20MAP\x20memory',
    _0x1445('0x45'),
    _0x1445('0x46'),
    _0x1445('0x47'),
    _0x1445('0x48'),
    _0x1445('0x49'),
    '___tw',
    _0x1445('0x4a'),
    '___th',
    _0x1445('0x4b'),
    _0x1445('0x4c'),
    'adjustX',
    _0x1445('0x4d'),
    _0x1445('0x4e'),
    _0x1445('0x4f'),
    _0x1445('0x50'),
    _0x1445('0x51'),
    _0x1445('0x52'),
    '_initVWStorage',
    _0x1445('0x53'),
    _0x1445('0x54'),
    _0x1445('0x55'),
    _0x1445('0x56'),
    '_updateScaleXX',
    '_updateOpacity',
    _0x1445('0x57'),
    'isCanBeSaved',
    _0x1445('0x58'),
    'xigao',
    _0x1445('0x59'),
    'onActionCommonEvent',
    _0x1445('0x5a'),
    'makeDeepCopy',
    _0x1445('0x5b'),
    _0x1445('0x5c'),
    'Texture',
    _0x1445('0x5d'),
    _0x1445('0x5e'),
    '.webm',
    _0x1445('0x5f'),
    _0x1445('0x60'),
    _0x1445('0x61'),
    '_texture',
    _0x1445('0x62'),
    _0x1445('0x63'),
    _0x1445('0x64'),
    _0x1445('0x65'),
    _0x1445('0x66'),
    _0x1445('0x67'),
    _0x1445('0x68'),
    'onLoaded',
    _0x1445('0x69'),
    _0x1445('0x6a'),
    _0x1445('0x6b'),
    _0x1445('0x6c'),
    'storeVWOnMapScene',
    _0x1445('0x6d'),
    'hFSOk',
    _0x1445('0x6e'),
    'isMapTouchOk',
    'DLxqF',
    _0x1445('0x6f'),
    'mjUlj',
    _0x1445('0x70'),
    _0x1445('0x71'),
    'scale',
    _0x1445('0x72'),
    _0x1445('0x73'),
    _0x1445('0x74'),
    _0x1445('0x75'),
    _0x1445('0x76'),
    'enemy',
    _0x1445('0x77')
];
(function (_0x5acd70, _0x1dc9d6) {
    var _0x510763 = function (_0x25ea39) {
        while (--_0x25ea39) {
            if (_0x1445('0x78') === _0x1445('0x78')) {
                _0x5acd70[_0x1445('0x79')](_0x5acd70[_0x1445('0x7a')]());
            } else {
                DeleteVAnim(_0x158e09);
                delete this[_0x1425(_0x1445('0x7b'))][_0x158e09];
            }
        }
    };
    _0x510763(++_0x1dc9d6);
}(_0xaa23, 0xea));
var _0x1425 = function (_0x44bf33, _0x2a1e77) {
    _0x44bf33 = _0x44bf33 - 0x0;
    var _0x5659f7 = _0xaa23[_0x44bf33];
    return _0x5659f7;
};
var VWSprite;
(function () {
    var _0x2df2a5, _0x53c383, _0x4f0425;
    _0x4f0425 = Scene_Base[_0x1425(_0x1445('0x7c'))];
    _0x2df2a5 = _0x4f0425[_0x1445('0x7d')];
    _0x4f0425[_0x1445('0x7d')] = function () {
        if (_0x1445('0x7e') === 'UokeJ') {
            if (_0x1425('0x1') === 'uOHuo') {
                return s[_0x1425(_0x1445('0x7f'))]();
            } else {
                _0x2df2a5[_0x1445('0x80')](this);
                return this[_0x1425(_0x1445('0x81'))]();
            }
        } else {
            if (this[_0x1425(_0x1445('0x7b'))][id] != null) {
                this['_removeVM'](id);
            }
            this[_0x1425(_0x1445('0x7b'))][id] = new VWSprite(name);
            s = this[_0x1445('0x82')][id];
            if (isLoop === !![]) {
                s[_0x1445('0xd')]();
            }
            s[_0x1425(_0x1445('0x83'))]();
            s[_0x1425(_0x1445('0x84'))](x, y);
            this[_0x1425(_0x1445('0x85'))](s);
        }
    };
    _0x4f0425[_0x1425('0x3')] = function () {
        if (_0x1425(_0x1445('0x86')) !== _0x1425('0x5')) {
            return this[_0x1425(_0x1445('0x7b'))] = {};
        } else {
            if (this[_0x1425(_0x1445('0x7b'))][id] != null) {
                this['_removeVM'](id);
            }
            this[_0x1425(_0x1445('0x7b'))][id] = new VWSprite(name);
            s = this['_vwStorage'][id];
            if (isLoop === !![]) {
                s['setLoop']();
            }
            s[_0x1425(_0x1445('0x83'))]();
            s[_0x1425(_0x1445('0x84'))](x, y);
            this[_0x1425(_0x1445('0x85'))](s);
        }
    };
    _0x4f0425[_0x1425(_0x1445('0x87'))] = function (_0x1e7e27, _0x10db28, _0x488b25, _0x34db1b, _0x144cca) {
        var _0x3697a5, _0x10bf50;
        try {
            if ('galUm' === _0x1445('0x88')) {
                if (this[_0x1425(_0x1445('0x7b'))][_0x1e7e27] != null) {
                    if (_0x1445('0x89') === _0x1425('0xb')) {
                        if (_0x1445('0x8a') === _0x1445('0x8a')) {
                            this[_0x1425(_0x1445('0x8b'))](_0x1e7e27);
                        } else {
                            _0x47152f[_0x1445('0x3d')] = ![];
                            try {
                                if (!_0x47152f[_0x1425('0x13')]()) {
                                    _0x47152f[_0x1425(_0x1445('0x8c'))]();
                                }
                            } catch (_0x310ed5) {
                                _0x50c0ec = _0x310ed5;
                                console[_0x1425('0x15')](_0x50c0ec);
                            }
                            this['removeChild'](_0x47152f);
                            _0x47152f[_0x1425('0x16')]();
                        }
                    } else {
                        return obj[_0x1445('0x8d')] != null && obj[_0x1425(_0x1445('0x8e'))][symbol] != null;
                    }
                }
                this[_0x1425('0x6')][_0x1e7e27] = new VWSprite(_0x10db28);
                _0x10bf50 = this[_0x1425('0x6')][_0x1e7e27];
                if (_0x144cca === !![]) {
                    if (_0x1425(_0x1445('0x8f')) === _0x1425('0xe')) {
                        _0x10bf50[_0x1445('0xd')]();
                    } else {
                        delete this['_vwStorage'][_0x1e7e27];
                    }
                }
                _0x10bf50[_0x1425(_0x1445('0x83'))]();
                _0x10bf50[_0x1445('0x90')](_0x488b25, _0x34db1b);
                this[_0x1425(_0x1445('0x85'))](_0x10bf50);
            } else {
                if (!x['isDestroyed']()) {
                    x['_selfDestroy']();
                }
            }
        } catch (_0x3fb3d7) {
            _0x3697a5 = _0x3fb3d7;
            VPLAYER[_0x1445('0x3c')](_0x3697a5, _0x1425('0xf'));
        }
    };
    _0x4f0425[_0x1425(_0x1445('0x8b'))] = function (_0x21eadd) {
        if (_0x1445('0x91') === _0x1445('0x92')) {
            return;
        } else {
            var _0x320a3d, _0x33b81d;
            try {
                if (_0x1445('0x93') === _0x1445('0x94')) {
                    this[_0x1425(_0x1445('0x8c'))]();
                } else {
                    if (_0x1425(_0x1445('0x95')) === _0x1445('0x36')) {
                        if (_0x1445('0x96') === _0x1445('0x96')) {
                            _0x33b81d = this[_0x1445('0x82')][_0x21eadd];
                            if (_0x33b81d != null) {
                                if (_0x1425('0x11') !== _0x1425('0x12')) {
                                    if ('rWRMS' === 'rWRMS') {
                                        _0x33b81d[_0x1445('0x3d')] = ![];
                                        try {
                                            if (_0x1445('0x97') === 'xvduq') {
                                                if (!_0x33b81d[_0x1425(_0x1445('0x98'))]()) {
                                                    if (_0x1445('0x99') === _0x1445('0x9a')) {
                                                        _0x428db9 = _0x4601fb;
                                                        VPLAYER[_0x1425(_0x1445('0x9b'))](_0x428db9, _0x1425('0x75'));
                                                    } else {
                                                        _0x33b81d[_0x1425(_0x1445('0x8c'))]();
                                                    }
                                                }
                                            } else {
                                                return ![];
                                            }
                                        } catch (_0x18ff42) {
                                            _0x320a3d = _0x18ff42;
                                            console[_0x1425('0x15')](_0x320a3d);
                                        }
                                        this[_0x1445('0x9c')](_0x33b81d);
                                        _0x33b81d[_0x1425(_0x1445('0x9d'))]();
                                    } else {
                                        return [
                                            this[_0x1445('0x9e')],
                                            this[_0x1425('0x77')],
                                            this[_0x1425(_0x1445('0x9f'))],
                                            this[_0x1425(_0x1445('0xa0'))],
                                            this[_0x1425(_0x1445('0xa1'))],
                                            this[_0x1425('0x78')],
                                            this[_0x1425(_0x1445('0xa2'))],
                                            this[_0x1425(_0x1445('0xa3'))],
                                            this[_0x1425(_0x1445('0xa4'))],
                                            this[_0x1425(_0x1445('0xa5'))],
                                            this[_0x1425(_0x1445('0xa6'))]['x'],
                                            this[_0x1425(_0x1445('0xa6'))]['y'],
                                            this[_0x1425('0x64')],
                                            this['x'],
                                            this['y']
                                        ];
                                    }
                                } else {
                                    if (_0x1445('0xa7') === 'Ldfeq') {
                                        this[_0x1425(_0x1445('0xa8'))] = _0x4e969b;
                                        return this[_0x1425('0x7c')] = _0x26a6d0;
                                    } else {
                                        return $gameMap[_0x1425('0x17')](_0x21eadd);
                                    }
                                }
                            }
                            this[_0x1425(_0x1445('0x7b'))][_0x21eadd] = null;
                            delete this['_vwStorage'][_0x21eadd];
                        } else {
                            if (_0x1445('0x89') === _0x1425(_0x1445('0xa9'))) {
                                this[_0x1425(_0x1445('0x8b'))](_0x307f48);
                            } else {
                                return obj[_0x1445('0x8d')] != null && obj[_0x1425(_0x1445('0x8e'))][symbol] != null;
                            }
                        }
                    } else {
                        ref[_0x1445('0x9c')](this);
                    }
                }
            } catch (_0x1d699c) {
                if (_0x1425(_0x1445('0xaa')) !== _0x1425(_0x1445('0xab'))) {
                    _0x320a3d = _0x1d699c;
                    VPLAYER[_0x1425(_0x1445('0x9b'))](_0x320a3d, _0x1445('0x21'));
                } else {
                    if (_0x1445('0xac') === _0x1445('0xac')) {
                        _0x33b81d[_0x1425(_0x1445('0xad'))] = ![];
                        try {
                            if (!_0x33b81d[_0x1425('0x13')]()) {
                                _0x33b81d[_0x1425('0x14')]();
                            }
                        } catch (_0x52836b) {
                            _0x320a3d = _0x52836b;
                            console[_0x1445('0x39')](_0x320a3d);
                        }
                        this[_0x1445('0x9c')](_0x33b81d);
                        _0x33b81d[_0x1425(_0x1445('0x9d'))]();
                    } else {
                        return _0x14c6a6[_0x1425(_0x1445('0x8e'))] != null && _0x14c6a6[_0x1425(_0x1445('0x8e'))][_0x43213a] != null;
                    }
                }
            }
        }
    };
    _0x4f0425[_0x1425(_0x1445('0xae'))] = function (_0x4e71c1) {
        if (_0x1445('0xaf') === _0x1445('0xaf')) {
            if ('UhHRC' === _0x1425(_0x1445('0xb0'))) {
                return this[_0x1425(_0x1445('0x7b'))][_0x4e71c1];
            } else {
                if (_0x1445('0xb1') === 'OjGHr') {
                    if (_0x1445('0xb2') !== _0x1425('0x97')) {
                        _0x433678[_0x1445('0x9c')](this);
                    } else {
                        e = error;
                        VPLAYER[_0x1445('0x3c')](e, _0x1425('0x98'));
                    }
                } else {
                    e = error;
                    VPLAYER[_0x1425('0x1a')](e, _0x1445('0x6'));
                }
            }
        } else {
            _0x3f87b1 = _0x1a96b2;
            return VPLAYER[_0x1445('0x3c')](_0x3f87b1, _0x1445('0xb3'));
        }
    };
    _0x53c383 = _0x4f0425[_0x1425(_0x1445('0xb4'))];
    _0x4f0425[_0x1425(_0x1445('0xb4'))] = function () {
        if (_0x1445('0xb5') === 'oCDaj') {
            var _0x164071, _0x52575d, _0x520faa;
            _0x53c383[_0x1425(_0x1445('0xb6'))](this);
            if (this[_0x1425(_0x1445('0x7b'))] == null) {
                if (_0x1445('0xb7') !== 'QgWQp') {
                    return;
                } else {
                    _0x50c0ec = _0x2174f2;
                    console[_0x1445('0x39')](_0x50c0ec);
                }
            }
            if (TouchInput[_0x1425(_0x1445('0xb8'))]()) {
                _0x52575d = this[_0x1425(_0x1445('0x7b'))];
                for (_0x164071 in _0x52575d) {
                    _0x520faa = _0x52575d[_0x164071];
                    if (_0x520faa == null) {
                        continue;
                    }
                    if (_0x520faa[_0x1425(_0x1445('0xb9'))]() && !_0x520faa[_0x1425(_0x1445('0x98'))]()) {
                        if (_0x520faa[_0x1425(_0x1445('0xba'))]()) {
                            if (_0x1425(_0x1445('0xbb')) === _0x1425(_0x1445('0xbc'))) {
                                if (_0x1445('0xbd') !== _0x1445('0xbd')) {
                                    var _0x1a515c, _0x245b50;
                                    if (this[_0x1425(_0x1445('0xbe'))] === 0x0) {
                                        return ![];
                                    }
                                    _0x1a515c = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1445('0x23')][_0x1425(_0x1445('0xb6'))](this, TouchInput['x']);
                                    _0x245b50 = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1425('0x65')][_0x1445('0x80')](this, TouchInput['y']);
                                    return _0x1a515c >= 0x0 && _0x245b50 >= 0x0 && _0x1a515c < this[_0x1425('0x4c')][_0x1425(_0x1445('0xbf'))] * this[_0x1425(_0x1445('0xa6'))]['x'] && _0x245b50 < this['surface'][_0x1425(_0x1445('0xc0'))] * this[_0x1425(_0x1445('0xa6'))]['y'];
                                } else {
                                    e = error;
                                    return VPLAYER[_0x1425('0x1a')](e, _0x1425(_0x1445('0xc1')));
                                }
                            } else {
                                _0x520faa[_0x1425(_0x1445('0xc2'))]();
                                return;
                            }
                        }
                    }
                }
            }
        } else {
            var _0x532224, _0x3bb813;
            _0x3bb813 = Spriteset_Map[_0x1425(_0x1445('0x7c'))];
            _0x532224 = _0x3bb813[_0x1425(_0x1445('0xc3'))];
            _0x3bb813[_0x1425(_0x1445('0xc3'))] = function () {
                if ('zPttL' === _0x1445('0xc4')) {
                    var _0x424d57, _0x59de7e;
                    _0x532224['call'](this);
                    if (this[_0x1425(_0x1445('0xc5'))][_0x1425('0x29')][_0x1425(_0x1445('0xc6'))] > 0x0) {
                        if (_0x1445('0xc7') === _0x1445('0xc7')) {
                            if (this[_0x1445('0xc8')] == null) {
                                this[_0x1425('0x2b')] = $gameMap[_0x1425(_0x1445('0xc9'))]();
                                this[_0x1445('0x4d')] = this[_0x1445('0xc8')] / 0x2;
                                this[_0x1425(_0x1445('0xca'))] = $gameMap[_0x1425(_0x1445('0xcb'))]();
                            }
                            _0x424d57 = Math[_0x1425('0x2f')]($gameMap[_0x1425('0x30')](-0.5) * this[_0x1445('0xc8')] + this[_0x1425(_0x1445('0xcc'))]);
                            _0x59de7e = Math[_0x1425('0x2f')]($gameMap[_0x1425('0x32')](-0x1) * this[_0x1425(_0x1445('0xca'))] + this[_0x1425(_0x1445('0xca'))]);
                            return this[_0x1425(_0x1445('0xc5'))][_0x1425('0x8')](_0x424d57, _0x59de7e);
                        } else {
                            _0x7663d9[_0x1445('0x79')](_0x7663d9[_0x1445('0x7a')]());
                        }
                    }
                } else {
                    this[_0x1425(_0x1445('0xcd'))] = onLoaded;
                }
            };
        }
    };
    _0x4f0425[_0x1425(_0x1445('0x7f'))] = function () {
        var _0x4dd520, _0x52fb8c, _0x1089d9;
        _0x52fb8c = this[_0x1425(_0x1445('0x7b'))];
        for (_0x4dd520 in _0x52fb8c) {
            if (_0x1445('0xce') === _0x1445('0xce')) {
                if (_0x1425(_0x1445('0xcf')) === _0x1425('0x34')) {
                    x[_0x1425(_0x1445('0x8c'))]();
                } else {
                    _0x1089d9 = _0x52fb8c[_0x4dd520];
                    if (_0x1089d9 == null) {
                        continue;
                    }
                    if (_0x1089d9[_0x1425(_0x1445('0x98'))]()) {
                        this['_removeVM'](_0x4dd520);
                    }
                }
            } else {
                return this[_0x1425(_0x1445('0x7b'))] = {};
            }
        }
    };
}());
(function () {
    var _0x380cdb, _0x258abc;
    _0x258abc = Spriteset_Map[_0x1425('0x0')];
    _0x380cdb = _0x258abc[_0x1425('0x27')];
    _0x258abc[_0x1445('0x46')] = function () {
        if (_0x1445('0xd0') === _0x1445('0xd0')) {
            var _0x129661, _0x285321;
            _0x380cdb[_0x1425(_0x1445('0xb6'))](this);
            if (this[_0x1425(_0x1445('0xc5'))][_0x1425(_0x1445('0xd1'))][_0x1425(_0x1445('0xc6'))] > 0x0) {
                if (_0x1445('0xd2') === 'TqImy') {
                    if (this[_0x1425(_0x1445('0xd3'))] == null) {
                        if (_0x1425('0x35') === _0x1425(_0x1445('0xd4'))) {
                            this[_0x1425('0x37')]();
                            this[_0x1425('0x38')](id, name, x, y, isLoop, 0x1);
                        } else {
                            if (_0x1445('0xd5') === _0x1445('0xd6')) {
                                return this[_0x1425(_0x1445('0xa1'))] = !![];
                            } else {
                                this[_0x1425('0x2b')] = $gameMap[_0x1445('0x4a')]();
                                this[_0x1425(_0x1445('0xcc'))] = this[_0x1425(_0x1445('0xd3'))] / 0x2;
                                this[_0x1425(_0x1445('0xca'))] = $gameMap[_0x1425(_0x1445('0xcb'))]();
                            }
                        }
                    }
                    _0x129661 = Math[_0x1445('0x4c')]($gameMap['adjustX'](-0.5) * this[_0x1425('0x2b')] + this[_0x1425(_0x1445('0xcc'))]);
                    _0x285321 = Math[_0x1425(_0x1445('0xd7'))]($gameMap[_0x1425(_0x1445('0xd8'))](-0x1) * this[_0x1425(_0x1445('0xca'))] + this[_0x1445('0xd9')]);
                    return this[_0x1425(_0x1445('0xc5'))][_0x1425('0x8')](_0x129661, _0x285321);
                } else {
                    return this[_0x1425('0x14')]();
                }
            }
        } else {
            _0x3b40f0 = SceneManager[_0x1445('0xda')];
            if (_0x3b40f0 != null && _0x3b40f0[_0x1445('0x2f')] != null) {
                return _0x3b40f0[_0x1425('0x2')]();
            }
        }
    };
}());
(function () {
    var _0x1c801f, _0x59de21;
    _0x59de21 = Scene_Map[_0x1425(_0x1445('0x7c'))];
    _0x1c801f = _0x59de21[_0x1425(_0x1445('0x8b'))];
    _0x59de21[_0x1425('0xc')] = function (_0x51776e) {
        if ('GmvlZ' === _0x1445('0xdb')) {
            _0x2ae118['call'](this);
            return this[_0x1425(_0x1445('0x81'))]();
        } else {
            var _0x5dab94;
            _0x1c801f[_0x1425(_0x1445('0xb6'))](this, _0x51776e);
            try {
                if (_0x1445('0xdc') !== 'rDWYo') {
                    e = error;
                    VPLAYER[_0x1425('0x1a')](e, _0x1445('0x6'));
                } else {
                    return $gameMap[_0x1425(_0x1445('0xdd'))](_0x51776e);
                }
            } catch (_0x180db3) {
                if ('ymcnh' !== _0x1445('0xde')) {
                    return this[_0x1425(_0x1445('0xdf'))] === !![] && !this[_0x1425(_0x1445('0x98'))]();
                } else {
                    _0x5dab94 = _0x180db3;
                    return VPLAYER[_0x1445('0x3c')](_0x5dab94, _0x1425(_0x1445('0xc1')));
                }
            }
        }
    };
}());
(function () {
    var _0x5e34a5;
    _0x5e34a5 = Game_Map[_0x1425(_0x1445('0x7c'))];
    _0x5e34a5[_0x1425(_0x1445('0xe0'))] = function () {
        if (_0x1445('0xe1') !== 'gizIe') {
            this['_vwStorage'][_0x158e09][0x5] = _0xa9f5ca[_0x1445('0xe2')]();
            _0xa9f5ca[_0x1425(_0x1445('0xe3'))]();
        } else {
            if (this[_0x1425(_0x1445('0x7b'))] == null) {
                if (_0x1445('0xe4') !== _0x1445('0xe4')) {
                    return this[_0x1425(_0x1445('0xcd'))]();
                } else {
                    if (_0x1445('0xe5') === _0x1425(_0x1445('0xe6'))) {
                        if (_0x1445('0xe7') === _0x1445('0xe7')) {
                            e = error;
                            VPLAYER[_0x1425(_0x1445('0x9b'))](e, 'Error\x20in\x20Script\x20Action\x20on\x20End');
                        } else {
                            if (_0xa4427c[_0x1425('0x22')]()) {
                                if (_0x1425(_0x1445('0xbb')) === _0x1425('0x24')) {
                                    e = error;
                                    return VPLAYER[_0x1425('0x1a')](e, _0x1425(_0x1445('0xc1')));
                                } else {
                                    _0xa4427c[_0x1425('0x26')]();
                                    return;
                                }
                            }
                        }
                    } else {
                        return this[_0x1425(_0x1445('0x7b'))] = {};
                    }
                }
            }
        }
    };
    _0x5e34a5['_saveVW'] = function (_0x371ae4, _0x242959, _0x4ffa40, _0x564ab1, _0x102c1e, _0x55e980) {
        if (_0x1445('0xe8') !== _0x1445('0xe8')) {
            return s[_0x1425(_0x1445('0x7f'))]();
        } else {
            this[_0x1425(_0x1445('0x7b'))][_0x371ae4] = [
                _0x242959,
                _0x4ffa40,
                _0x564ab1,
                _0x102c1e,
                _0x55e980
            ];
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0xe9'))] = function () {
        if ('EXZSW' === _0x1445('0xea')) {
            this[_0x1425(_0x1445('0xeb'))]();
            this[_0x1425('0x3c')]();
            return this[_0x1425(_0x1445('0xec'))]();
        } else {
            if (_0x1445('0xed') === _0x1445('0xee')) {
                _0x5312b = _0xe24417;
                return VPLAYER[_0x1425(_0x1445('0x9b'))](_0x5312b, _0x1445('0xef'));
            } else {
                var _0x4ec9ec, _0x4bebce, _0xd5b125, _0x289070;
                this[_0x1425(_0x1445('0xe0'))]();
                _0x289070 = this[_0x1425(_0x1445('0x7b'))];
                for (_0x4ec9ec in _0x289070) {
                    _0x4bebce = _0x289070[_0x4ec9ec];
                    _0xd5b125 = VPLAYER[_0x1425(_0x1445('0xf0'))](_0x4ec9ec);
                    if (_0xd5b125 == null) {
                        delete this['_vwStorage'][_0x4ec9ec];
                    } else {
                        if (!_0xd5b125[_0x1425(_0x1445('0xf1'))]()) {
                            if ('mfKxh' !== _0x1445('0xf2')) {
                                DeleteVAnim(_0x4ec9ec);
                                delete this[_0x1425(_0x1445('0x7b'))][_0x4ec9ec];
                            } else {
                                return this[_0x1425(_0x1445('0xf3'))]();
                            }
                        } else {
                            if (_0x1445('0xf4') === _0x1445('0xf5')) {
                                x[_0x1425(_0x1445('0x8c'))]();
                            } else {
                                this[_0x1445('0x82')][_0x4ec9ec][0x5] = _0xd5b125[_0x1445('0xe2')]();
                                _0xd5b125[_0x1425(_0x1445('0xe3'))]();
                            }
                        }
                    }
                }
            }
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0xdd'))] = function (_0x52d129) {
        this['_initVWStorage']();
        if (this[_0x1425(_0x1445('0x7b'))][_0x52d129] != null) {
            if (_0x1425(_0x1445('0xf6')) === _0x1425(_0x1445('0xf7'))) {
                $gameTemp[_0x1445('0x17')](this[_0x1425('0x43')]);
            } else {
                delete this[_0x1425(_0x1445('0x7b'))][_0x52d129];
            }
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0xf8'))] = function () {
        var _0x2b52f8, _0x397f8, _0x320b97, _0x45af79, _0x3824a3;
        this[_0x1425('0x37')]();
        _0x45af79 = JsonEx[_0x1425(_0x1445('0xf9'))](this[_0x1425(_0x1445('0x7b'))]);
        for (_0x397f8 in _0x45af79) {
            if (_0x1445('0xfa') !== _0x1445('0xfb')) {
                if (_0x1445('0xfc') === _0x1425(_0x1445('0xfd'))) {
                    delete this[_0x1425(_0x1445('0x7b'))][_0x397f8];
                } else {
                    if (_0x1445('0xfe') === 'PhRiZ') {
                        _0x320b97 = _0x45af79[_0x397f8];
                        switch (_0x320b97[0x4]) {
                        case 0x0:
                            ShowVAnim(_0x397f8, ..._0x320b97);
                            break;
                        case 0x1:
                            ShowVAnimOnSpriteset(_0x397f8, ..._0x320b97);
                            break;
                        case 0x2:
                            ShowVAnimOnMap(_0x397f8, ..._0x320b97);
                        }
                    } else {
                        var _0x10524c, _0x475a21;
                        if (this['opacity'] === 0x0) {
                            return ![];
                        }
                        _0x10524c = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1425(_0x1445('0xff'))][_0x1425(_0x1445('0xb6'))](this, TouchInput['x']);
                        _0x475a21 = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1445('0x71')][_0x1425(_0x1445('0xb6'))](this, TouchInput['y']);
                        return _0x10524c >= 0x0 && _0x475a21 >= 0x0 && _0x10524c < this['surface'][_0x1425(_0x1445('0xbf'))] * this[_0x1425(_0x1445('0xa6'))]['x'] && _0x475a21 < this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0xc0'))] * this[_0x1425(_0x1445('0xa6'))]['y'];
                    }
                }
            } else {
                var _0x1fc8e3, _0x26e2a2;
                _0x26e2a2 = Spriteset_Map[_0x1425(_0x1445('0x7c'))];
                _0x1fc8e3 = _0x26e2a2[_0x1425(_0x1445('0xc3'))];
                _0x26e2a2[_0x1425(_0x1445('0xc3'))] = function () {
                    var _0x3b6508, _0x5370c1;
                    _0x1fc8e3[_0x1445('0x80')](this);
                    if (this[_0x1425(_0x1445('0xc5'))][_0x1425(_0x1445('0xd1'))][_0x1425('0x2a')] > 0x0) {
                        if (this['___tw'] == null) {
                            this[_0x1425(_0x1445('0xd3'))] = $gameMap[_0x1425(_0x1445('0xc9'))]();
                            this['___tw2'] = this[_0x1445('0xc8')] / 0x2;
                            this[_0x1425('0x2d')] = $gameMap[_0x1425(_0x1445('0xcb'))]();
                        }
                        _0x3b6508 = Math[_0x1425(_0x1445('0xd7'))]($gameMap[_0x1425(_0x1445('0x101'))](-0.5) * this[_0x1445('0xc8')] + this[_0x1425(_0x1445('0xcc'))]);
                        _0x5370c1 = Math[_0x1425('0x2f')]($gameMap[_0x1425('0x32')](-0x1) * this[_0x1425(_0x1445('0xca'))] + this[_0x1425(_0x1445('0xca'))]);
                        return this[_0x1425('0x28')][_0x1425(_0x1445('0x84'))](_0x3b6508, _0x5370c1);
                    }
                };
            }
        }
        for (_0x397f8 in _0x45af79) {
            if ('BaVBw' === _0x1445('0x102')) {
                _0x320b97 = _0x45af79[_0x397f8];
                try {
                    _0x3824a3 = VPLAYER[_0x1425(_0x1445('0xf0'))](_0x397f8);
                    if (_0x320b97[0x5] != null) {
                        if (_0x1425('0x47') !== _0x1445('0x5c')) {
                            this[_0x1445('0x60')] = PIXI[_0x1425('0x48')][_0x1425(_0x1445('0x103'))](_0x1445('0xf') + this[_0x1425('0x4a')] + _0x1425(_0x1445('0x104')));
                            this[_0x1425('0x4c')] = new PIXI['Sprite'](this[_0x1425(_0x1445('0x105'))]);
                            this[_0x1425('0x4e')] = null;
                            this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x106'))][_0x1425(_0x1445('0x107'))]['on'](_0x1425(_0x1445('0x108')), () => {
                                this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0xbf'))] = this[_0x1425(_0x1445('0x105'))][_0x1425(_0x1445('0x107'))][_0x1425(_0x1445('0x109'))][_0x1425('0x53')];
                                this[_0x1425('0x4c')][_0x1445('0x72')] = this[_0x1425(_0x1445('0x105'))][_0x1425(_0x1445('0x107'))][_0x1425(_0x1445('0x109'))][_0x1445('0x10a')];
                                this[_0x1425('0x9')](this[_0x1425(_0x1445('0x100'))]);
                                this[_0x1425(_0x1445('0x10b'))] = !![];
                                this[_0x1425(_0x1445('0x109'))] = this[_0x1425(_0x1445('0x105'))][_0x1445('0x62')][_0x1425(_0x1445('0x109'))];
                                this[_0x1425(_0x1445('0x109'))]['loop'] = this[_0x1425(_0x1445('0xdf'))];
                                this[_0x1425(_0x1445('0x109'))][_0x1425('0x56')]();
                                if (this[_0x1425(_0x1445('0xcd'))] != null) {
                                    if (_0x1445('0x10c') === 'jEXdJ') {
                                        return this[_0x1445('0x10d')]();
                                    } else {
                                        this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x8c'))]();
                                    }
                                }
                            });
                            return this[_0x1445('0x5f')][_0x1425(_0x1445('0x106'))][_0x1425(_0x1445('0x107'))][_0x1425(_0x1445('0x109'))][_0x1425('0x58')](_0x1425(_0x1445('0x10f')), () => {
                                return this[_0x1425(_0x1445('0xf3'))]();
                            });
                        } else {
                            if ('yfRWh' === 'yfRWh') {
                                _0x3824a3[_0x1445('0x110')](_0x320b97[0x5]);
                            } else {
                                this[_0x1425('0x37')]();
                                this[_0x1445('0x53')](_0x1a3bbd, _0x1a25fd, _0x1fba8b, _0x16c6b2, _0x2ea571, 0x0);
                            }
                        }
                    }
                } catch (_0x2f95dc) {
                    if (_0x1445('0x111') !== 'UOsrb') {
                        _0x2b52f8 = _0x2f95dc;
                        VPLAYER[_0x1425('0x1a')](_0x2b52f8, _0x1425(_0x1445('0x112')));
                    } else {
                        if (_0x1425(_0x1445('0x113')) !== _0x1425(_0x1445('0x114'))) {
                            return;
                        } else {
                            this[_0x1425('0x37')]();
                            this[_0x1425(_0x1445('0x115'))](id, name, x, y, isLoop, 0x2);
                        }
                    }
                }
            } else {
                if (_0x1445('0x11') === _0x1425('0x83')) {
                    return this[_0x1425(_0x1445('0xcd'))]();
                } else {
                    e = error;
                    VPLAYER[_0x1425(_0x1445('0x9b'))](e, 'createVM');
                }
            }
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0x116'))] = function (_0x241072, _0x132744, _0x1e5d46, _0x104c36, _0x4a3be4) {
        if (_0x1445('0x117') === _0x1445('0x117')) {
            this[_0x1425('0x37')]();
            this[_0x1445('0x53')](_0x241072, _0x132744, _0x1e5d46, _0x104c36, _0x4a3be4, 0x0);
        } else {
            while (--_0x5210c5) {
                _0x7663d9[_0x1445('0x79')](_0x7663d9[_0x1445('0x7a')]());
            }
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0x118'))] = function (_0x2a67a2, _0x4e527e, _0x51f354, _0x249ab1, _0x3f44c4) {
        if ('ANJad' !== 'ANJad') {
            if (_0x1445('0x74') !== _0x1425(_0x1445('0x119'))) {
                return this[_0x1425('0x14')]();
            } else {
                return ![];
            }
        } else {
            if (_0x1445('0x11a') !== _0x1425(_0x1445('0x11b'))) {
                this[_0x1425('0x37')]();
                this[_0x1425(_0x1445('0x115'))](_0x2a67a2, _0x4e527e, _0x51f354, _0x249ab1, _0x3f44c4, 0x1);
            } else {
                if (_0x1445('0x11c') === _0x1445('0x11c')) {
                    return this[_0x1445('0x66')] === !![];
                } else {
                    if (this[_0x1445('0x82')] == null) {
                        return this[_0x1425(_0x1445('0x7b'))] = {};
                    }
                }
            }
        }
    };
    _0x5e34a5[_0x1425(_0x1445('0x11d'))] = function (_0x73829d, _0xe28b22, _0x5728cb, _0x40c2b3, _0x3f72e4) {
        if (_0x1445('0x11e') === _0x1445('0x11e')) {
            this[_0x1445('0x11f')]();
            this[_0x1425(_0x1445('0x115'))](_0x73829d, _0xe28b22, _0x5728cb, _0x40c2b3, _0x3f72e4, 0x2);
        } else {
            _0x56242b = _0x4208fd;
            VPLAYER[_0x1425('0x1a')](_0x56242b, _0x1445('0x120'));
            return ![];
        }
    };
}());
(function () {
    var _0x5ccec8, _0x4a4068;
    _0x4a4068 = Scene_Map[_0x1425(_0x1445('0x7c'))];
    _0x5ccec8 = _0x4a4068[_0x1425(_0x1445('0x121'))];
    _0x4a4068[_0x1425(_0x1445('0x121'))] = function () {
        var _0x2a0948, _0x3eb27f, _0x5d0e38, _0x356c56;
        if (this[_0x1425('0x6')] != null) {
            try {
                if (_0x1445('0x122') === 'zPWQE') {
                    if (_0x1425(_0x1445('0x123')) !== _0x1425(_0x1445('0x124'))) {
                        if (TouchInput[_0x1425(_0x1445('0xb8'))]()) {
                            _0x5d0e38 = this[_0x1425('0x6')];
                            for (_0x3eb27f in _0x5d0e38) {
                                if ('KLudh' !== _0x1445('0x125')) {
                                    _0x356c56 = _0x5d0e38[_0x3eb27f];
                                    if (_0x356c56 == null) {
                                        if (_0x1445('0x126') !== _0x1445('0x127')) {
                                            if (_0x1425(_0x1445('0x128')) !== _0x1425(_0x1445('0x128'))) {
                                                var _0x120711, _0x11325b;
                                                if (this[_0x1425(_0x1445('0xbe'))] === 0x0) {
                                                    if (_0x1445('0x129') === 'AlaFx') {
                                                        return ![];
                                                    } else {
                                                        return ![];
                                                    }
                                                }
                                                _0x120711 = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1445('0x23')][_0x1425(_0x1445('0xb6'))](this, TouchInput['x']);
                                                _0x11325b = Sprite_Button[_0x1425('0x0')][_0x1425('0x65')][_0x1445('0x80')](this, TouchInput['y']);
                                                return _0x120711 >= 0x0 && _0x11325b >= 0x0 && _0x120711 < this[_0x1425(_0x1445('0x100'))][_0x1425('0x52')] * this[_0x1425(_0x1445('0xa6'))]['x'] && _0x11325b < this[_0x1445('0x5f')][_0x1425(_0x1445('0xc0'))] * this[_0x1425('0x66')]['y'];
                                            } else {
                                                continue;
                                            }
                                        } else {
                                            if (_0x1425(_0x1445('0x12a')) !== _0x1425(_0x1445('0x12b'))) {
                                                return this[_0x1425('0x5a')]();
                                            } else {
                                                return this[_0x1445('0x67')] = !![];
                                            }
                                        }
                                    }
                                    if (_0x356c56[_0x1425('0x21')]() && !_0x356c56[_0x1425('0x13')]()) {
                                        if ('xmgNr' !== _0x1445('0x12c')) {
                                            if (_0x1425(_0x1445('0x12d')) === _0x1445('0x73')) {
                                                if (_0x356c56[_0x1425('0x22')]()) {
                                                    if (_0x1445('0x74') !== _0x1425(_0x1445('0x119'))) {
                                                        if (_0x1445('0x12e') === _0x1445('0x12f')) {
                                                            this[_0x1425(_0x1445('0xe0'))]();
                                                            this[_0x1425(_0x1445('0x115'))](id, name, x, y, isLoop, 0x1);
                                                        } else {
                                                            return this[_0x1425(_0x1445('0x8c'))]();
                                                        }
                                                    } else {
                                                        return ![];
                                                    }
                                                }
                                            } else {
                                                if ('JGIqa' !== _0x1445('0x130')) {
                                                    if (_0x1425(_0x1445('0x131')) === _0x1425('0x36')) {
                                                        this[_0x1425('0x37')]();
                                                        this[_0x1425('0x38')](id, name, x, y, isLoop, 0x1);
                                                    } else {
                                                        this[_0x1425('0x2b')] = $gameMap['tileWidth']();
                                                        this[_0x1425('0x31')] = this[_0x1425(_0x1445('0xd3'))] / 0x2;
                                                        this[_0x1425(_0x1445('0xca'))] = $gameMap[_0x1425(_0x1445('0xcb'))]();
                                                    }
                                                } else {
                                                    this[_0x1425(_0x1445('0x8b'))](_0x3eb27f);
                                                }
                                            }
                                        } else {
                                            e = error;
                                            VPLAYER['printError'](e, _0x1425(_0x1445('0x132')));
                                        }
                                    }
                                } else {
                                    s[_0x1445('0xd')]();
                                }
                            }
                        }
                    } else {
                        if (this[_0x1445('0x82')] == null) {
                            if (_0x1445('0x133') !== _0x1445('0x133')) {
                                return _0x3b40f0[_0x1425(_0x1445('0x7f'))]();
                            } else {
                                return this[_0x1425('0x6')] = {};
                            }
                        }
                    }
                } else {
                    if (!_0xa9f5ca[_0x1425('0x3f')]()) {
                        DeleteVAnim(_0x158e09);
                        delete this[_0x1425(_0x1445('0x7b'))][_0x158e09];
                    } else {
                        this[_0x1445('0x82')][_0x158e09][0x5] = _0xa9f5ca[_0x1445('0xe2')]();
                        _0xa9f5ca[_0x1425('0x40')]();
                    }
                }
            } catch (_0x4a3bbf) {
                _0x2a0948 = _0x4a3bbf;
                VPLAYER[_0x1425(_0x1445('0x9b'))](_0x2a0948, _0x1425(_0x1445('0x121')));
            }
        }
        return _0x5ccec8['call'](this);
    };
}());
(function () {
    var _0x5d6173;
    _0x5d6173 = Sprite_Enemy[_0x1425(_0x1445('0x7c'))];
    _0x5d6173[_0x1425('0x6a')] = function () {
        var _0x4f99d4, _0x5daeff;
        try {
            _0x5daeff = function (_0x46e9bc, _0x58dd69) {
                return _0x58dd69[_0x1425(_0x1445('0x8e'))] != null && _0x58dd69[_0x1425(_0x1445('0x8e'))][_0x46e9bc] != null;
            };
            return _0x5daeff('VW', this[_0x1425('0x6b')][_0x1425(_0x1445('0x134'))]());
        } catch (_0x32ddf0) {
            if ('wiDFp' !== _0x1445('0x135')) {
                if (_0x1445('0x136') !== _0x1445('0x136')) {
                    this[_0x1425(_0x1445('0x137'))] *= $gameMap[_0x1445('0x4a')]();
                    this[_0x1425(_0x1445('0x138'))] *= $gameMap[_0x1425('0x2e')]();
                } else {
                    _0x4f99d4 = _0x32ddf0;
                    VPLAYER[_0x1425(_0x1445('0x9b'))](_0x4f99d4, _0x1445('0x120'));
                    return ![];
                }
            } else {
                if (_0x1445('0x139') !== _0x1445('0x139')) {
                    var _0x267860, _0x541d9b;
                    _0x541d9b = Scene_Map[_0x1425(_0x1445('0x7c'))];
                    _0x267860 = _0x541d9b[_0x1425(_0x1445('0x8b'))];
                    _0x541d9b[_0x1425(_0x1445('0x8b'))] = function (_0x5ebd88) {
                        var _0x3f24f1;
                        _0x267860[_0x1425('0x1f')](this, _0x5ebd88);
                        try {
                            return $gameMap[_0x1425(_0x1445('0xdd'))](_0x5ebd88);
                        } catch (_0x23fa26) {
                            _0x3f24f1 = _0x23fa26;
                            return VPLAYER[_0x1445('0x3c')](_0x3f24f1, _0x1425(_0x1445('0xc1')));
                        }
                    };
                } else {
                    return this[_0x1425(_0x1445('0xa0'))] != null || this['onActionCommonEvent'] > 0x0;
                }
            }
        }
    };
    _0x5d6173[_0x1425('0x6e')] = function (_0x15ca1f) {
        if (_0x1445('0x13a') !== _0x1445('0x13b')) {
            if (_0x1425(_0x1445('0x13c')) === _0x1425(_0x1445('0x13d'))) {
                var _0x5f4eda, _0x16cf83;
                _0x16cf83 = Scene_Map[_0x1445('0x2e')];
                _0x5f4eda = _0x16cf83[_0x1425(_0x1445('0x8b'))];
                _0x16cf83[_0x1445('0x34')] = function (_0x786992) {
                    if (_0x1445('0x13e') === _0x1445('0x13e')) {
                        var _0x1817cf;
                        _0x5f4eda[_0x1425(_0x1445('0xb6'))](this, _0x786992);
                        try {
                            if (_0x1445('0x13f') !== _0x1445('0x13f')) {
                                this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x8c'))]();
                            } else {
                                return $gameMap[_0x1425(_0x1445('0xdd'))](_0x786992);
                            }
                        } catch (_0x512c29) {
                            _0x1817cf = _0x512c29;
                            return VPLAYER['printError'](_0x1817cf, _0x1445('0xb3'));
                        }
                    } else {
                        this[_0x1425(_0x1445('0x137'))] = _0x1776da;
                        this[_0x1445('0x15')] = _0x47f5e2;
                        if (this[_0x1425(_0x1445('0x140'))] === !![]) {
                            this[_0x1425(_0x1445('0x137'))] *= $gameMap[_0x1445('0x4a')]();
                            this[_0x1425(_0x1445('0x138'))] *= $gameMap[_0x1425('0x2e')]();
                        }
                        return this[_0x1425(_0x1445('0xa3'))] = _0x12129b;
                    }
                };
            } else {
                var _0x4ac23c, _0x4b9c82;
                this[_0x1445('0x1f')] = new Bitmap(0x64, 0x64);
                try {
                    if (_0x1445('0x2') !== _0x1425('0x71')) {
                        eval(this[_0x1445('0x77')]);
                    } else {
                        if ('KTbVZ' !== 'vYAuh') {
                            if (this[_0x1425(_0x1445('0x10e'))] != null) {
                                this[_0x1425('0x72')][_0x1425(_0x1445('0x8c'))]();
                            }
                            this[_0x1425(_0x1445('0x10e'))] = new VWSprite(_0x15ca1f);
                            this[_0x1425('0x72')]['setLoop']();
                            _0x4b9c82 = function () {
                                var _0x3b5b08, _0x46ec72;
                                _0x46ec72 = this[_0x1425('0x72')][_0x1445('0x5f')][_0x1425(_0x1445('0xbf'))];
                                _0x3b5b08 = this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x141'))];
                                this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x84'))](_0x46ec72 / -0x2, -_0x3b5b08);
                                this[_0x1445('0x1f')] = new Bitmap(_0x46ec72, _0x3b5b08);
                            };
                            this[_0x1425(_0x1445('0x10e'))][_0x1445('0xe')](_0x4b9c82[_0x1425(_0x1445('0x142'))](this));
                            this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x83'))]();
                            this[_0x1425(_0x1445('0x85'))](this[_0x1425(_0x1445('0x10e'))]);
                        } else {
                            this[_0x1425(_0x1445('0xe0'))]();
                            this[_0x1425(_0x1445('0x115'))](id, name, x, y, isLoop, 0x2);
                        }
                    }
                } catch (_0x134216) {
                    if (_0x1445('0x143') === _0x1445('0x144')) {
                        if (_0x1425('0x1') === _0x1445('0x145')) {
                            return s[_0x1425(_0x1445('0x7f'))]();
                        } else {
                            _0x2ae118[_0x1445('0x80')](this);
                            return this[_0x1425(_0x1445('0x81'))]();
                        }
                    } else {
                        _0x4ac23c = _0x134216;
                        VPLAYER[_0x1425(_0x1445('0x9b'))](_0x4ac23c, _0x1425(_0x1445('0x146')));
                    }
                }
            }
        } else {
            $gameTemp[_0x1445('0x17')](this[_0x1425(_0x1445('0x9f'))]);
        }
    };
}());
VWSprite = class VWSprite extends Sprite {
    constructor(_0xcdbf98) {
        super();
        this[_0x1425(_0x1445('0x147'))] = _0xcdbf98;
        this[_0x1425('0x54')] = ![];
        this[_0x1445('0x67')] = ![];
        this[_0x1425(_0x1445('0x148'))] = 0x0;
        this[_0x1425(_0x1445('0x149'))] = null;
        this[_0x1445('0x14a')] = 0x0;
        this[_0x1425(_0x1445('0xa0'))] = null;
        this[_0x1445('0x19')] = ![];
        this[_0x1425(_0x1445('0x14b'))] = 0x0;
        this[_0x1425(_0x1445('0xa2'))] = ![];
        this[_0x1425(_0x1445('0xa3'))] = 0x0;
        this[_0x1425(_0x1445('0xa4'))] = 0x0;
        this[_0x1425(_0x1445('0xa5'))] = 0x0;
        this[_0x1425(_0x1445('0x140'))] = ![];
    }
    [_0x1425(_0x1445('0x14c'))]() {
        return this[_0x1445('0x67')] = !![];
    }
    [_0x1425(_0x1445('0x14d'))](_0xb641a0) {
        this[_0x1425(_0x1445('0xcd'))] = _0xb641a0;
    }
    [_0x1425(_0x1445('0x83'))]() {
        this[_0x1425(_0x1445('0x105'))] = PIXI[_0x1425('0x48')][_0x1425(_0x1445('0x103'))](_0x1425(_0x1445('0x14e')) + this[_0x1425(_0x1445('0x147'))] + _0x1445('0x14f'));
        this[_0x1425(_0x1445('0x100'))] = new PIXI[(_0x1445('0x150'))](this[_0x1425('0x4d')]);
        this[_0x1445('0x61')] = null;
        this[_0x1445('0x5f')][_0x1425(_0x1445('0x106'))]['baseTexture']['on'](_0x1425(_0x1445('0x108')), () => {
            if (_0x1445('0x151') !== _0x1445('0x152')) {
                if (_0x1425(_0x1445('0x153')) !== _0x1445('0x10')) {
                    if (!x[_0x1445('0x154')]()) {
                        x[_0x1445('0x38')]();
                    }
                } else {
                    if (_0x1445('0x155') === _0x1445('0x156')) {
                        this[_0x1445('0x34')](_0xaf7af1);
                    } else {
                        this[_0x1425(_0x1445('0x100'))][_0x1445('0x64')] = this[_0x1425(_0x1445('0x105'))]['baseTexture'][_0x1425('0x4e')][_0x1425('0x53')];
                        this[_0x1445('0x5f')][_0x1425('0x67')] = this[_0x1445('0x60')][_0x1425(_0x1445('0x107'))][_0x1445('0x61')][_0x1425(_0x1445('0x157'))];
                        this[_0x1425(_0x1445('0x85'))](this[_0x1425(_0x1445('0x100'))]);
                        this[_0x1445('0x66')] = !![];
                        this[_0x1425(_0x1445('0x109'))] = this[_0x1445('0x60')]['baseTexture']['source'];
                        this[_0x1425(_0x1445('0x109'))][_0x1445('0x158')] = this['_loop'];
                        this[_0x1425(_0x1445('0x109'))][_0x1425(_0x1445('0x159'))]();
                        if (this[_0x1425('0x57')] != null) {
                            if ('MpdrX' === _0x1425(_0x1445('0x15a'))) {
                                return this[_0x1425('0x57')]();
                            } else {
                                e = error;
                                VPLAYER[_0x1425(_0x1445('0x9b'))](e, _0x1445('0x35'));
                            }
                        }
                    }
                }
            } else {
                _0x257c0c[_0x1445('0x9c')](this);
            }
        });
        return this['surface'][_0x1425(_0x1445('0x106'))][_0x1425('0x50')]['source'][_0x1425(_0x1445('0x15b'))](_0x1425(_0x1445('0x10f')), () => {
            if (_0x1445('0x15c') !== _0x1445('0x15c')) {
                return;
            } else {
                if (_0x1425(_0x1445('0x12a')) !== _0x1425('0x85')) {
                    return this[_0x1425(_0x1445('0xf3'))]();
                } else {
                    if ('MIMpU' !== _0x1445('0x15d')) {
                        return this[_0x1445('0x67')] = !![];
                    } else {
                        return $gameMap[_0x1425(_0x1445('0xdd'))](_0x300d26);
                    }
                }
            }
        });
    }
    [_0x1425('0x5a')]() {
        var _0x7b9b46, _0x454f6e;
        try {
            if ('eUoEs' !== _0x1425(_0x1445('0x15e'))) {
                if (_0x1445('0x15f') === _0x1445('0x160')) {
                    eval(this[_0x1445('0x77')]);
                } else {
                    this[_0x1425('0x87')] = x;
                    this[_0x1425('0x88')] = y;
                    if (this[_0x1425(_0x1445('0x140'))] === !![]) {
                        if (_0x1445('0x161') !== _0x1445('0x162')) {
                            this[_0x1425(_0x1445('0x137'))] *= $gameMap['tileWidth']();
                            this[_0x1445('0x15')] *= $gameMap[_0x1445('0x4b')]();
                        } else {
                            return this[_0x1445('0x10d')]();
                        }
                    }
                    return this[_0x1425(_0x1445('0xa3'))] = d;
                }
            } else {
                _0x454f6e = ![];
                if (this[_0x1425(_0x1445('0x148'))] > 0x0) {
                    if ('KmUUA' !== _0x1445('0x163')) {
                        if (_0x1445('0x16') === _0x1425(_0x1445('0x164'))) {
                            if (_0x1445('0x165') === _0x1445('0x166')) {
                                if (_0x2bc2d9[_0x1425(_0x1445('0xba'))]()) {
                                    if (_0x1445('0x74') !== _0x1425('0x69')) {
                                        return this[_0x1425(_0x1445('0x8c'))]();
                                    } else {
                                        return ![];
                                    }
                                }
                            } else {
                                $gameTemp[_0x1425('0x8a')](this[_0x1425(_0x1445('0x148'))]);
                                _0x454f6e = !![];
                            }
                        } else {
                            vm = VPLAYER[_0x1445('0x57')](id);
                            if (item[0x5] != null) {
                                if ('rScCu' === 'RVnUT') {
                                    if (_0x1425(_0x1445('0x167')) !== _0x1425(_0x1445('0x168'))) {
                                        _0x1f9127 = _0x139c7e;
                                        return console[_0x1445('0x39')](_0x1f9127);
                                    } else {
                                        var _0x315a38, _0x5a5a47;
                                        _0x5a5a47 = this[_0x1425('0x72')][_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0xbf'))];
                                        _0x315a38 = this[_0x1425(_0x1445('0x10e'))][_0x1425('0x4c')][_0x1425(_0x1445('0x141'))];
                                        this[_0x1425(_0x1445('0x10e'))][_0x1445('0x90')](_0x5a5a47 / -0x2, -_0x315a38);
                                        this[_0x1425('0x96')] = new Bitmap(_0x5a5a47, _0x315a38);
                                    }
                                } else {
                                    vm[_0x1425(_0x1445('0x169'))](item[0x5]);
                                }
                            }
                        }
                    } else {
                        _0x2d8074 = function (_0x5476ad, _0x201780) {
                            return _0x201780[_0x1425(_0x1445('0x8e'))] != null && _0x201780[_0x1425(_0x1445('0x8e'))][_0x5476ad] != null;
                        };
                        return _0x2d8074('VW', this[_0x1425(_0x1445('0x16a'))][_0x1425('0x6c')]());
                    }
                }
                if (this[_0x1425('0x77')] != null) {
                    if (_0x1445('0x16b') !== _0x1445('0x16c')) {
                        try {
                            eval(this['onEndScript']);
                        } catch (_0x4038fa) {
                            _0x7b9b46 = _0x4038fa;
                            VPLAYER[_0x1425(_0x1445('0x9b'))](_0x7b9b46, _0x1425(_0x1445('0x16d')));
                        }
                        _0x454f6e = !![];
                    } else {
                        _0x47152f[_0x1425('0x14')]();
                    }
                }
                if (_0x454f6e === ![] || this[_0x1425(_0x1445('0xa1'))] === !![]) {
                    if (_0x1445('0x16e') === _0x1445('0x16f')) {
                        this[_0x1425(_0x1445('0x137'))] *= $gameMap[_0x1445('0x4a')]();
                        this[_0x1445('0x15')] *= $gameMap['tileHeight']();
                    } else {
                        return this[_0x1425(_0x1445('0x8c'))]();
                    }
                }
            }
        } catch (_0x4c7c03) {
            if ('qdvQu' !== _0x1445('0x170')) {
                if (_0x1445('0x171') === _0x1425(_0x1445('0x172'))) {
                    var _0x4c3b51;
                    if ((_0x4c3b51 = this[_0x1425(_0x1445('0x173'))]) != null) {
                        if (_0x1445('0x174') !== _0x1445('0x175')) {
                            _0x4c3b51[_0x1445('0x9c')](this);
                        } else {
                            vm = VPLAYER[_0x1445('0x57')](id);
                            if (item[0x5] != null) {
                                vm[_0x1425(_0x1445('0x169'))](item[0x5]);
                            }
                        }
                    }
                    this[_0x1445('0x3d')] = ![];
                    this[_0x1425('0x4d')][_0x1425('0x50')][_0x1425(_0x1445('0x109'))][_0x1425('0x90')]();
                    this[_0x1425('0x4c')][_0x1425('0x4f')][_0x1425('0x50')][_0x1425('0x16')]();
                    this[_0x1425(_0x1445('0x106'))][_0x1445('0x176')]();
                    this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x9d'))]();
                    PIXI[_0x1425(_0x1445('0x177'))][_0x1425(_0x1445('0x178'))]();
                    return this[_0x1425(_0x1445('0x179'))] = !![];
                } else {
                    _0x7b9b46 = _0x4c7c03;
                    return VPLAYER[_0x1425(_0x1445('0x9b'))](_0x7b9b46, _0x1445('0xef'));
                }
            } else {
                var _0x427bb3;
                if (this[_0x1425(_0x1445('0xa3'))] <= 0x0) {
                    if (_0x1425(_0x1445('0x17a')) !== _0x1425(_0x1445('0x17a'))) {
                        this[_0x1425(_0x1445('0xcd'))] = onLoaded;
                    } else {
                        return;
                    }
                }
                _0x427bb3 = this[_0x1425(_0x1445('0xa3'))];
                this['x'] = (this['x'] * (_0x427bb3 - 0x1) + this[_0x1425(_0x1445('0x137'))]) / _0x427bb3;
                this['y'] = (this['y'] * (_0x427bb3 - 0x1) + this[_0x1445('0x15')]) / _0x427bb3;
                return this[_0x1425(_0x1445('0xa3'))]--;
            }
        }
    }
    [_0x1445('0x38')]() {
        var _0x181acf, _0x4d0114;
        this[_0x1425(_0x1445('0xe3'))]();
        try {
            if ('rfsGs' !== _0x1445('0x17b')) {
                this[_0x1425(_0x1445('0xd3'))] = $gameMap[_0x1445('0x4a')]();
                this[_0x1425(_0x1445('0xcc'))] = this[_0x1425(_0x1445('0xd3'))] / 0x2;
                this[_0x1425(_0x1445('0xca'))] = $gameMap[_0x1425(_0x1445('0xcb'))]();
            } else {
                _0x4d0114 = SceneManager[_0x1445('0xda')];
                if (_0x4d0114 != null && _0x4d0114[_0x1445('0x2f')] != null) {
                    return _0x4d0114[_0x1425('0x2')]();
                }
            }
        } catch (_0x533f4f) {
            if (_0x1425(_0x1445('0x167')) !== _0x1425(_0x1445('0x168'))) {
                _0x181acf = _0x533f4f;
                return console[_0x1445('0x39')](_0x181acf);
            } else {
                var _0x2bf052, _0x3b66ce;
                _0x3b66ce = this[_0x1425('0x72')][_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0xbf'))];
                _0x2bf052 = this[_0x1425(_0x1445('0x10e'))][_0x1425('0x4c')][_0x1425(_0x1445('0x141'))];
                this[_0x1425(_0x1445('0x10e'))][_0x1445('0x90')](_0x3b66ce / -0x2, -_0x2bf052);
                this[_0x1425(_0x1445('0x17c'))] = new Bitmap(_0x3b66ce, _0x2bf052);
            }
        }
    }
    ['_selfStop']() {
        var _0x350ad9;
        if ((_0x350ad9 = this[_0x1425(_0x1445('0x173'))]) != null) {
            if (_0x1445('0xb2') !== _0x1425(_0x1445('0x17d'))) {
                _0x350ad9['removeChild'](this);
            } else {
                if (_0x1445('0x17e') !== _0x1445('0x17f')) {
                    e = error;
                    VPLAYER[_0x1445('0x3c')](e, _0x1425(_0x1445('0x132')));
                } else {
                    if (_0x1425(_0x1445('0x180')) === _0x1425(_0x1445('0x180'))) {
                        _0x5b51ec = _0x4786e9;
                        VPLAYER[_0x1445('0x3c')](_0x5b51ec, _0x1425(_0x1445('0x181')));
                    } else {
                        this[_0x1425(_0x1445('0x8c'))]();
                    }
                }
            }
        }
        this[_0x1425(_0x1445('0xad'))] = ![];
        this[_0x1425('0x4d')][_0x1425('0x50')][_0x1425(_0x1445('0x109'))][_0x1425(_0x1445('0x182'))]();
        this[_0x1425(_0x1445('0x100'))][_0x1425('0x4f')][_0x1425('0x50')][_0x1445('0x176')]();
        this[_0x1425(_0x1445('0x106'))][_0x1445('0x176')]();
        this[_0x1425(_0x1445('0x100'))][_0x1425('0x16')]();
        PIXI[_0x1445('0x183')]['reset']();
        return this[_0x1425(_0x1445('0x179'))] = !![];
    }
    [_0x1425('0x99')]() {
        return this[_0x1425('0x54')] === !![];
    }
    [_0x1425(_0x1445('0x98'))]() {
        return this[_0x1425('0x93')] === !![];
    }
    [_0x1425(_0x1445('0x184'))]() {
        return this[_0x1425(_0x1445('0xa1'))] = !![];
    }
    [_0x1425(_0x1445('0x185'))]() {
        return this[_0x1425(_0x1445('0xa2'))] = !![];
    }
    [_0x1445('0x186')]() {
        return this[_0x1445('0xc')] = !![];
    }
    [_0x1425('0x3f')]() {
        return this[_0x1425('0x55')] === !![] && !this[_0x1425(_0x1445('0x98'))]();
    }
    [_0x1425('0x22')]() {
        var _0x27e421, _0x3a771e;
        if (this[_0x1445('0x70')] === 0x0) {
            if (_0x1445('0x187') !== 'pNsYp') {
                return ![];
            } else {
                vm[_0x1425(_0x1445('0x169'))](item[0x5]);
            }
        }
        _0x27e421 = Sprite_Button[_0x1425(_0x1445('0x7c'))][_0x1425(_0x1445('0xff'))][_0x1425(_0x1445('0xb6'))](this, TouchInput['x']);
        _0x3a771e = Sprite_Button[_0x1425('0x0')][_0x1445('0x71')][_0x1425(_0x1445('0xb6'))](this, TouchInput['y']);
        return _0x27e421 >= 0x0 && _0x3a771e >= 0x0 && _0x27e421 < this[_0x1445('0x5f')][_0x1425(_0x1445('0xbf'))] * this[_0x1425('0x66')]['x'] && _0x3a771e < this[_0x1425('0x4c')][_0x1425(_0x1445('0xc0'))] * this[_0x1425('0x66')]['y'];
    }
    [_0x1425('0x21')]() {
        return this[_0x1425(_0x1445('0xa0'))] != null || this[_0x1425(_0x1445('0x9f'))] > 0x0;
    }
    [_0x1425('0x26')]() {
        var _0xf4c742;
        if (this[_0x1425(_0x1445('0x9f'))] > 0x0) {
            if (_0x1445('0x188') !== _0x1445('0x189')) {
                $gameTemp[_0x1445('0x17')](this[_0x1425(_0x1445('0x9f'))]);
            } else {
                _0x1f9127 = _0x139c7e;
                return console['warn'](_0x1f9127);
            }
        }
        if (this[_0x1445('0x77')] != null) {
            if (_0x1445('0x18a') !== 'qbpkE') {
                var _0x630a6f;
                if ((_0x630a6f = this[_0x1425('0x8f')]) != null) {
                    if ('VtuPA' !== _0x1425('0x97')) {
                        _0x630a6f[_0x1445('0x9c')](this);
                    } else {
                        e = error;
                        VPLAYER[_0x1445('0x3c')](e, _0x1425(_0x1445('0x132')));
                    }
                }
                this[_0x1425('0x1b')] = ![];
                this[_0x1425('0x4d')][_0x1425('0x50')][_0x1425('0x4e')][_0x1425(_0x1445('0x182'))]();
                this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x106'))][_0x1425('0x50')][_0x1445('0x176')]();
                this[_0x1425('0x4f')][_0x1445('0x176')]();
                this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x9d'))]();
                PIXI[_0x1445('0x183')]['reset']();
                return this[_0x1425(_0x1445('0x179'))] = !![];
            } else {
                if (_0x1425(_0x1445('0x18b')) === _0x1425(_0x1445('0x18b'))) {
                    try {
                        if (_0x1445('0x18c') !== 'wYdUM') {
                            eval(this[_0x1445('0x77')]);
                        } else {
                            this[_0x1445('0x11f')]();
                            this[_0x1425(_0x1445('0x115'))](_0x1a8342, _0x40c61e, _0x1fc75b, _0xf924d2, _0x26ddcf, 0x2);
                        }
                    } catch (_0x564cd9) {
                        if (_0x1445('0x18d') === 'UtsBf') {
                            if (_0x1425('0x23') === _0x1425(_0x1445('0xbc'))) {
                                e = error;
                                return VPLAYER[_0x1425(_0x1445('0x9b'))](e, _0x1425(_0x1445('0xc1')));
                            } else {
                                _0xa4427c[_0x1425(_0x1445('0xc2'))]();
                                return;
                            }
                        } else {
                            if (_0x1425(_0x1445('0x180')) === _0x1425(_0x1445('0x180'))) {
                                _0xf4c742 = _0x564cd9;
                                VPLAYER[_0x1445('0x3c')](_0xf4c742, _0x1425(_0x1445('0x181')));
                            } else {
                                if (_0x1445('0x18e') !== _0x1445('0x18e')) {
                                    return this[_0x1425('0x6d')] != null || this[_0x1445('0x14a')] > 0x0;
                                } else {
                                    this[_0x1425(_0x1445('0x8c'))]();
                                }
                            }
                        }
                    }
                } else {
                    return this[_0x1425('0x5a')]();
                }
            }
        }
        if (this[_0x1425(_0x1445('0xa2'))] === !![]) {
            if ('fpDZH' === _0x1425(_0x1445('0x18f'))) {
                if (_0x1445('0x190') === 'EpLSM') {
                    this[_0x1425(_0x1445('0x8c'))]();
                } else {
                    this[_0x1425(_0x1445('0x8b'))](_0x313f3b);
                }
            } else {
                this[_0x1425(_0x1445('0x10e'))][_0x1425(_0x1445('0x8c'))]();
            }
        }
    }
    [_0x1425(_0x1445('0x191'))](_0x2d9cd7, _0x2d0d51, _0x89a61e) {
        this[_0x1425('0x87')] = _0x2d9cd7;
        this['_targetY'] = _0x2d0d51;
        if (this[_0x1425(_0x1445('0x140'))] === !![]) {
            this[_0x1425(_0x1445('0x137'))] *= $gameMap[_0x1445('0x4a')]();
            this[_0x1425(_0x1445('0x138'))] *= $gameMap[_0x1425(_0x1445('0xcb'))]();
        }
        return this[_0x1425(_0x1445('0xa3'))] = _0x89a61e;
    }
    [_0x1425('0xa2')](_0x3f9f91, _0x279a96, _0x55aa9a) {
        this[_0x1425(_0x1445('0x192'))] = _0x3f9f91;
        this[_0x1425(_0x1445('0x193'))] = _0x279a96;
        return this[_0x1425(_0x1445('0xa4'))] = _0x55aa9a;
    }
    [_0x1425('0xa5')](_0x2edede, _0x559db6) {
        this[_0x1425('0xa6')] = _0x2edede;
        return this[_0x1425(_0x1445('0xa5'))] = _0x559db6;
    }
    [_0x1425(_0x1445('0x194'))]() {
        this[_0x1425(_0x1445('0xeb'))]();
        this[_0x1425(_0x1445('0x195'))]();
        return this[_0x1425(_0x1445('0xec'))]();
    }
    [_0x1425(_0x1445('0xeb'))]() {
        var _0x185468;
        if (this[_0x1425('0x7a')] <= 0x0) {
            if (_0x1425(_0x1445('0x17a')) !== _0x1425(_0x1445('0x17a'))) {
                this[_0x1425(_0x1445('0xcd'))] = onLoaded;
            } else {
                return;
            }
        }
        _0x185468 = this[_0x1425(_0x1445('0xa3'))];
        this['x'] = (this['x'] * (_0x185468 - 0x1) + this[_0x1425(_0x1445('0x137'))]) / _0x185468;
        this['y'] = (this['y'] * (_0x185468 - 0x1) + this[_0x1445('0x15')]) / _0x185468;
        return this[_0x1425(_0x1445('0xa3'))]--;
    }
    [_0x1445('0x196')]() {
        var _0x293069;
        if (this['_sDurationX'] <= 0x0) {
            return;
        }
        _0x293069 = this[_0x1425(_0x1445('0xa4'))];
        this[_0x1425(_0x1445('0xa6'))]['x'] = (this[_0x1425(_0x1445('0xa6'))]['x'] * (_0x293069 - 0x1) + this[_0x1425('0xa3')]) / _0x293069;
        this[_0x1425(_0x1445('0xa6'))]['y'] = (this[_0x1425(_0x1445('0xa6'))]['y'] * (_0x293069 - 0x1) + this[_0x1425(_0x1445('0x193'))]) / _0x293069;
        return this[_0x1425('0x7b')]--;
    }
    [_0x1425(_0x1445('0xec'))]() {
        var _0x692332;
        if (this['_oDuration'] <= 0x0) {
            if (_0x1445('0x197') !== 'uNJki') {
                if (this[_0x1425(_0x1445('0xd3'))] == null) {
                    if (_0x1425(_0x1445('0x131')) === _0x1425(_0x1445('0xd4'))) {
                        this[_0x1425('0x37')]();
                        this[_0x1425(_0x1445('0x115'))](id, name, x, y, isLoop, 0x1);
                    } else {
                        this[_0x1425(_0x1445('0xd3'))] = $gameMap[_0x1445('0x4a')]();
                        this[_0x1425(_0x1445('0xcc'))] = this[_0x1425('0x2b')] / 0x2;
                        this[_0x1425('0x2d')] = $gameMap[_0x1425(_0x1445('0xcb'))]();
                    }
                }
                _0x5573f7 = Math[_0x1445('0x4c')]($gameMap[_0x1445('0x198')](-0.5) * this[_0x1425(_0x1445('0xd3'))] + this[_0x1425('0x31')]);
                _0x11b776 = Math[_0x1425(_0x1445('0xd7'))]($gameMap[_0x1425('0x32')](-0x1) * this[_0x1425(_0x1445('0xca'))] + this['___th']);
                return this[_0x1425('0x28')][_0x1425(_0x1445('0x84'))](_0x5573f7, _0x11b776);
            } else {
                return;
            }
        }
        _0x692332 = this[_0x1425(_0x1445('0xa5'))];
        this[_0x1425(_0x1445('0xbe'))] = (this[_0x1425(_0x1445('0xbe'))] * (_0x692332 - 0x1) + this[_0x1425(_0x1445('0xa8'))]) / _0x692332;
        return this[_0x1425(_0x1445('0xa5'))]--;
    }
    [_0x1445('0xe2')]() {
        return [
            this[_0x1445('0x9e')],
            this[_0x1425(_0x1445('0x149'))],
            this[_0x1425(_0x1445('0x9f'))],
            this[_0x1425(_0x1445('0xa0'))],
            this[_0x1425(_0x1445('0xa1'))],
            this[_0x1425(_0x1445('0x14b'))],
            this[_0x1425(_0x1445('0xa2'))],
            this[_0x1425(_0x1445('0xa3'))],
            this[_0x1425(_0x1445('0xa4'))],
            this[_0x1425(_0x1445('0xa5'))],
            this[_0x1425(_0x1445('0xa6'))]['x'],
            this[_0x1425(_0x1445('0xa6'))]['y'],
            this[_0x1425(_0x1445('0xbe'))],
            this['x'],
            this['y']
        ];
    }
    ['loadSD'](_0x4a21fc) {
        if (_0x4a21fc == null) {
            if (_0x1425(_0x1445('0x113')) !== _0x1425('0xaa')) {
                if (_0x1445('0x199') === _0x1445('0x19a')) {
                    var _0x32bf14;
                    if ((_0x32bf14 = this[_0x1425(_0x1445('0x173'))]) != null) {
                        _0x32bf14[_0x1445('0x9c')](this);
                    }
                    this[_0x1445('0x3d')] = ![];
                    this[_0x1425(_0x1445('0x105'))][_0x1425(_0x1445('0x107'))][_0x1425('0x4e')][_0x1425('0x90')]();
                    this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x106'))][_0x1425(_0x1445('0x107'))][_0x1425(_0x1445('0x9d'))]();
                    this[_0x1425(_0x1445('0x106'))][_0x1445('0x176')]();
                    this[_0x1425(_0x1445('0x100'))][_0x1425(_0x1445('0x9d'))]();
                    PIXI[_0x1425('0x91')][_0x1425(_0x1445('0x178'))]();
                    return this[_0x1425(_0x1445('0x179'))] = !![];
                } else {
                    return;
                }
            } else {
                this[_0x1425(_0x1445('0xe0'))]();
                this[_0x1425(_0x1445('0x115'))](id, name, x, y, isLoop, 0x2);
            }
        }
        this[_0x1425('0x76')] = _0x4a21fc[0x0];
        this[_0x1425(_0x1445('0x149'))] = _0x4a21fc[0x1];
        this[_0x1425(_0x1445('0x9f'))] = _0x4a21fc[0x2];
        this[_0x1425(_0x1445('0xa0'))] = _0x4a21fc[0x3];
        this[_0x1425(_0x1445('0xa1'))] = _0x4a21fc[0x4];
        this[_0x1425(_0x1445('0x14b'))] = _0x4a21fc[0x5];
        this[_0x1425('0x79')] = _0x4a21fc[0x6];
        this[_0x1425(_0x1445('0xa3'))] = _0x4a21fc[0x7];
        this[_0x1425(_0x1445('0xa4'))] = _0x4a21fc[0x8];
        this[_0x1425('0x7c')] = _0x4a21fc[0x9];
        this[_0x1425(_0x1445('0xa6'))]['x'] = _0x4a21fc[0xa];
        this[_0x1425(_0x1445('0xa6'))]['y'] = _0x4a21fc[0xb];
        this[_0x1425('0x64')] = _0x4a21fc[0xc];
        this['x'] = _0x4a21fc[0xd];
        this['y'] = _0x4a21fc[0xe];
    }
};
VPLAYER[_0x1425(_0x1445('0x19b'))] = VWSprite;
EXPAND();

})();
