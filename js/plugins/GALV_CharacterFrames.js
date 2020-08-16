//-----------------------------------------------------------------------------
//  Galv's Character Frames
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_CharacterFrames.js
//-----------------------------------------------------------------------------
//  2017-10-26 - Version 1.3 - made aliased functions publicly available
//  2015-01-17 - Version 1.2 - fixed drawing character in menus bug
//  2015-12-15 - Version 1.1 - added equation to control frame speed
//  2015-12-12 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_CharacterFrames = true;

var Galv = Galv || {};        // Galv's main object
Galv.CF = Galv.CF || {};      // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Enables map character sheets to have more frames per character.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Frame Speed Modifier
 * @desc Equation SUBRTRACTED from frame speed (when not 3 frames). See help for more info on this.
 * @default f * 0.8
 *
 * @help
 *   Galv's Character Frames
 * ----------------------------------------------------------------------------
 * This plugin allows you to make charsets with more than 3 frames per
 * character. It overwrites a few default functions so it may not be compatible
 * with other plugins that change charset motions.
 *
 * To make a charset use more than 3 frames per character, in the filename you
 * need to include %(x) where x is the number of frames per character in it.
 *
 * For example, a characterset with 8 frames per character could be named like:
 * MainHero%(8).png
 *
 * If you are also using my 'Diagonal Movement' plugin, put this ABOVE it.
 * 
 *
 * Frame Speed Modifier
 * ----------------------------------------------------------------------------
 * This is an equation for you to use to change the speed that the frames play
 * at when you are not using the normal amount of frames (3).
 *
 * The normal equation in RPG Maker default code is:
 * (9 - this.realMoveSpeed()) * 3;
 *
 * The equation in the settings of this plugin allow you to create another
 * equation that is SUBRACTED from the above result. In this equation you can
 * use the variable 'f' for amount of frames the charactersheet uses.
 *
 * Example:
 * f * 0.8        number of frames multipled by 0.5
 * f / 2          number of frames divided by 2
 * f * 0.5 - 1    number of frames multipled by 0.5, minus 1
 *
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------



(function() {
	
Galv.CF.y = PluginManager.parameters('Galv_CharacterFrames')["Frame Speed Modifier"];

	
Game_CharacterBase.prototype._cframes = 3;
Game_CharacterBase.prototype._spattern = 1;
var f = Game_CharacterBase.prototype._cframes;
Game_CharacterBase.prototype._patSpd = 0;


// Draw Char in menus
Galv.CF.Galv_Window_Base_drawCharacter = Window_Base.prototype.drawCharacter;
Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
	var setFrame = characterName.match(/\%\((.*)\)/i);
	
	if (setFrame) {
		this._cframes = Number(setFrame[1]);
		var f = this._cframes;

		var bitmap = ImageManager.loadCharacter(characterName);
		var big = ImageManager.isBigCharacter(characterName);
		var pw = bitmap.width / (big ? f : f * 4);
		var ph = bitmap.height / (big ? 4 : 8);
		var n = characterIndex;
		var sx = (n % 4 * 3 + 1) * pw;
		var sy = (Math.floor(n / 4) * 4) * ph;
		this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
	} else {
		Galv.CF.Galv_Window_Base_drawCharacter.call(this,characterName,characterIndex,x,y);
	};
};

Galv.CF.Galv_Sprite_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
	var setFrame = this._characterName.match(/\%\((.*)\)/i);
	if (setFrame) {
		this._cframes = Number(setFrame[1]);
		this._character._spattern = 0;
		var f = this._cframes;
		this._character._patSpd = eval(Galv.CF.y);
		
	} else {
		this._cframes = 3;
		this._character._spattern = 1;
		this._character._patSpd = 0;
	};
	this._character._cframes = this._cframes;
	Galv.CF.Galv_Sprite_Character_setCharacterBitmap.call(this);
};

// OVERWRITE
Game_CharacterBase.prototype.pattern = function() {
    return this._pattern < this._cframes ? this._pattern : this._spattern;
};

// OVERWRITE
Game_CharacterBase.prototype.updatePattern = function() {
    if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else {
		this._pattern = (this._pattern + 1) % (this._cframes + this._spattern);
    }
};

Galv.CF.Galv_Game_CharacterBase_animationWait = Game_CharacterBase.prototype.animationWait;
Game_CharacterBase.prototype.animationWait = function() {
    return Galv.CF.Galv_Game_CharacterBase_animationWait.call(this) - this._patSpd;
};

// OVERWRITE
Sprite_Character.prototype.characterBlockX = function() {
    if (this._isBigCharacter) {
        return 0;
    } else {
        var index = this._character.characterIndex();
        return index % 4 * this._cframes;
    }
};

// OVERWRITE
Sprite_Character.prototype.patternWidth = function() {
    if (this._tileId > 0) {
        return $gameMap.tileWidth();
    } else if (this._isBigCharacter) {
        return this.bitmap.width / this._cframes;
    } else {
        return this.bitmap.width / (this._cframes * 4);
    }
};
})();