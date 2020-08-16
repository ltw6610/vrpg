//=============================================================================
// Ammunition System, ver1.1.7
//   by Unconnected42
// UNCO_AmmunitionSystem.js
// Last Updated : 2016/12/11
//=============================================================================

var Imported = Imported || {};
Imported.UNCO_AmmunitionSystem = true;

var Unco = Unco || {};
Unco.AS = Unco.AS || {};


//=============================================================================
 /*:
 * @plugindesc  Allows skills to need ammunition.
 * <Unco Ammo>
 * @author Unconnected42
 *
 * @param Show Ammo Left When Actor Command
 * @desc If set as 'true', show how much ammunition is left for main attack at the top of the screen, during actor command selection.
 * @default true
 *
 * @param Show Ammo Left In Help Window
 * @desc  If set as 'true', show how much ammunition is left for a skill in its description.
 * @default true
 *
 * @param Help Window Ammo Text
 * @desc  Default text to be displayed in skill description before ammunition amounts.
 * @default Ammunition left
 *
 * @param Show Ammo Left In Skill Window
 * @desc In skill window, show how much ammunition is left together with the cost if set at 'true'.
 * @default false
 *
 * @param No Ammo Icon
 * @desc  Id of the default icon to be displayed when there is no more ammunition and several types of ammunition are possible.
 * @default 16
 *
 * @param Gold Ammo Icon
 * @desc  Id of the icon to be displayed for gold costs.
 * @default 313
 *
 * @param Ammo Font Size
 * @desc Font size of the ammunition amounts in skill window and gauge.
 * @default 20
 *
 * @param Ammo Font Color
 * @desc Font color of the ammunition amounts in skill window and gauge.
 * @default 6
 *
 * @param Show Ammo Left In Actor Command Window
 * @desc If set at true, will display how much ammo is left just next to the attack command.
 * @default false
 *
 * @param Compact Cost Display
 * @desc If set at true, the amount of needed ammo will be displayed on the icon.
 * @default false
 *
 * @help
 * ============================================
 * Introduction
 * ============================================
 * 
 * ver1.1.7
 *
 * This plug-in will allow skills or weapons to require the consumption of 
 * ammunition, components, etc. in order to work. The cost is  paid each 
 * time the skill is used, together with MP/TP costs, or each time the 
 * normal attack is used in the case of weapons.
 * The ammunition can be either gold, items or equipments (armours, weapons), or 
 * a mix.
 * 
 * However, things work differently depending on what type of cost is considered.
 * - items : if several types of items are marked as required as ammunition 
 *   for a given skill/weapon, *ALL* of the corresponding prices must be 
 *   paid each time the skill/weapon is used. 
 * - equipment : the equipment needs to be equipped in order for the skill/weapon
 *   to work. If several types of equipments are marked as required as ammunition
 *   for a given skill/weapon, *ONLY* the cost of the one that is *CURRENTLY
 *   EQUIPPED* will be paid. That means a weapon/skill can be able to use 
 *   different interchangeable ammunition types.
 * - Gold cost is straightforward in how it functions.
 * 
 * You can also define skills which can change the type of ammunition 
 * equipped even during combat, in the case of armour-type ammunition.
 * Then, your hero can use an action to change his/her ammunition type !
 * 
 * ============================================
 * Known Compatibility Issues
 * ============================================
 * 
 * This plug-in should be placed under all plug-ins that you are using,
 * especially Yanfly's since it actually uses some of their features if
 * they are present.
 * Known exceptions to that rule : 
 * - Yanfly's Skill Cooldown
 * - Jay's Dual Techs. 
 *   -> Ammunition should be placed above these two plug-ins.
 * This might also be the case for other plug-ins whenever 
 * the modification of skill costs is concerned.
 * On the contrary, the following plug-ins MUST be placed above :
 * - Bobstah's BattleCommandList.
 * 
 *
 * This plug-in in the present version should be fully compatible
 * with Yanfly's ItemCore Independent Items feature.
 * Therefore, ammunition of any kind can either be independent or
 * not (for the latter case, use a <Not Independent Item> notetag
 * in the ammunition notebox if you are using ItemCore and a max
 * number of items > 0).
 * 
 * ============================================
 * Use
 * ============================================
 * 
 * + Declaring a weapon/skill to need ammunition
 * ---------------------------------------------
 * Lines to put in either Weapon notebox or Skill notebox for defining costs :
 *   <Gold Cost: c>
 *   <Ammo i Item: c>  (for items ammo)
 *   <Ammo i Equip: c>  (for armors ammo)
 *   <Ammo i Weapon: c>  (for weapons ammo)
 * ... where i is the ID of the ammunition item/armor and c is the cost 
 * required for one use.
 * Disclaimer concerning weapon-type ammunition: 
 * In its present state it is intended to be used for weapons that would be
 * their own ammo, like throwing knives, shurikens, etc.
 * In theory, however, it *should* be possible to use as ammo for a weapon 
 * a different weapon, provided both of them are equipped, but this possibility
 * has yet to be playtested...
 *
 * + Declaring a skill that serves for equipping ammo (during combat)
 * ------------------------------------------------------------------
 * To create a skill that will change the type of ammunition equipped:
 *   <Ammo i Load>
 * ... where i is the ID of the ammunition armor.
 * The following syntax is also authorized:
 *   <Ammo i Load: s>
 * ...where s is the specific slot to be equipped.
 * This syntax is kept only for compatibility reasons, so that people
 * who defined their tags for older versions of the script that did
 * not support the simpler syntax are not forced to change.
 * If your actor(s) have for example the following equipment types:
 *     Weapon, Shield, Head, Body, Accessory, Ammunition
 * ... then the slot number would be 6.
 * Note 1: this is meant to be used during battle, when equip menu is not 
 * accessible, if you want your actors to be able to switch ammunition.
 * Note 2: it is necessary to define one skill per type of ammunition.
 * Note 3: it is possible to use this tag for equipping any kind of armor, and 
 * not just ammunition.
 * Also, the Load feature currently does not work with weapon-type ammo.
 *
 * + Ammo equipment with charges
 * -----------------------------
 * For an armor- or weapon-type ammunition, you can allow each ammo item to
 * provide a given number of uses instead of being consumed after just one use.
 * Declare the following tag in the ammo equipment notebox:
 *   <Ammo Charges: n>
 * ... where 'n' is the wished number of charges the item possesses.
 * This tag will only actually be used if you are using Yanfly's ItemCore and
 * the item is an independent item.
 * The equipped ammo item has a certain number of charges, and at each use, this
 * is this number that will be reduced, instead of the number of ammo items.
 * When the number of charges hits zero, the item is unequipped, without
 * being returned to inventory. No other item of same type will be equipped even
 * if available in inventory.
 *
 * Instead of having an empty ammunition equipment simply disappear,
 * it is possible to have a specific item be created in the inventory (which
 * then represent the empty equipment).
 * Use the following tag:
 *   <Ammo Charges Empty : i>
 * ...when 'i' is the id of the item to be created.
 * Note that this will be a normal item, not an equipment.
 *
 * + Determining skill's availability depending on a game switch
 * -------------------------------------------------------------
 * You can also now have skill availability depend on a game switch status, with
 * the following tag to put in a skill's notebox:
 *   <Game Switch: n>
 * If the game switch number 'n' is set at false, the skill cannot be used.
 * This might be useful, for example, if you are also using the crafting
 * extension of this plug-in and wish to make crafting available only
 * in certain places/situations.
 *
 * ============================================
 * Displaying Ammunition Amounts & Costs
 * ============================================
 * 
 * A given ammunition type is almost always represented by its icon when it
 * is necessary (either to display a cost or a remaining amount).
 * Ammo costs for skills are indicated together with "normal" TP/MP costs.
 * 
 * There are several solutions for displaying the remaining ammunition amount
 * so that the player knows where he stands.
 * Most of them are turned on through the plug-in parameters.
 * 
 * - For weapons : 
 *   + The number of ammunition left can be displayed at the
 *     top of the screen when the actor command menu is active.
 *     This is the default option.
 *   + The number of ammunition left can be displayed in the 
 *     command window, just next to the "Attack" option.
 *     No icon in that case.
 *   + If you are using Yanfly's SkillCore plug-in, you can use the following
 *     notetag in the weapon note :
 *         <Swap Gauge n: AMMO>
 *     ...where n is the number of the gauge you want to replace.
 *     Instead of a normal HP/MP/TP gauge, you will then have the amount of
 *     ammunition left for the currently equipped weapon.
 * - For skills : 
 *   + The remaining amount for each ammunition type can be showed
 *     together with cost in the skill window.
 *   + It can also be displayed after the skill description, in the help
 *     window. This is the default option.
 *     In that case, you should keep the skill description within one unique
 *     line with no line-break at the end, or else the remaining ammo will 
 *     not be visible.
 * 
 * The text before ammunition left amounts can be customized with the following
 *   notetag in the skill notebox:
 *   <Ammo Left Text: xxx>
 *   ... with xxx being your custom text.
 * The name of the ammunition type can be displayed along with its icon with
 * the following notetag in the weapon/skill notebox:
 *   <Show Ammo Name>
 * 
 * Also, in the case of equipment ammunition, several types of
 * ammunition are possible but only one (the one equipped) will be displayed
 * in any skill/help/etc window (or gauge). When there is no more ammunition,
 * the system normally would not know which icon to use !
 * There is a default icon for that, but you can put the following notetag
 * in skill/weapon notebox to define which icon will be used :
 *   <No Ammo Icon: i>
 *   ... with i being the icon number. 
 * It is also possible to add details about the ammunition type currently 
 * equipped by adding the following notetag in the ammo notebox :
 *   <Ammo Window Desc: xxx>
 * Where 'xxx' is the description you want to give to your ammo.
 * This description will show up in the skill help window and the ammunition
 * window visible during actor command selection.
 * Please that if you deactivate the ammo window or the display of remaining
 * ammo amount with the corresponding plug-in parameters, you will of course 
 * not see any description of ammunition !
 *
 * ============================================
 * Change Log
 * ============================================
 *
 * - 2016-12-11 : ver1.1.7 : fixed a bug that make the game crash in some menus when an actor had no weapon equipped.
 * - 2016-11-16 : ver1.1.6 : maked ammo displayed even for normal attack if necessary.
 * - 2016-11-15 : ver1.1.5 : fixed compatibility with Yanfly's Weapon Unleash.
 * - 2016-06-11 : ver1.1.4 : fixed compatibility with Yanfly's ItemCore version 1.24
 * - 2016-02-17 : ver1.1.3 : (supposedly?) corrected a bug that causes crashes 
 *   when enemy attacks in some situations.
 * - 2015-12-15 : ver1.1.2 : yet another bug correction.
 * - 2015-12-15 : ver1.1.1 : corrected a bug that caused zero cost equip ammunition 
 *   to be unequippable.
 * - 2015-12-09 : ver1.1.0 : charged ammunition can now 'create' an 'empty' item when
 *   their charge number is reduced to zero. Also, charged ammunition will show
 *   their remaining charges in equip windows.
 * - 2015-11-29 : ver1.0.0 : added charged ammunition feature. Fixed a (generally 
 *   silent) bug that could make skills availables even in case of unsufficient
 *   ammunition in some rare cases.
 * - 2015-11-26 : ver0.4.4 : fixed an issue that caused equip-type ammo to be
 *   equippable when it should not in some situations.
 * - 2015-11-24 : ver0.4.3b : fixed an issue that caused ammo not to be consumed
 *   in some situations when using older versions of Yanfly's ATB.
 * - 2015-11-21 : ver0.4.3 : the previous changes made actually break the ammo cost 
 *   implementation when ammo are NOT independent items, causing the ammo to be 
 *   simply unequipped... Corrected now.
 * - 2015-11-20 : ver0.4.2 : correction of the 'reload skills' feature so that 
 *   indicating the correct equip slot for equip ammunition is no more necessary. 
 *   Slight modification of how the cost of equip ammunition is managed internally,
 *   so that it works more logically when independent ammo with variance is used.
 * - 2015-11-15 : ver0.4.1 : corrected a bug causing a crash during battle when 
 *   no weapon is equipped and the ammo amount is displayed next to attack command.
 *   Also corrected a bug that could make the displayed cost in attack command incorrect.
 * - 2015-11-15 : ver0.4.0 : added compact cost display, game switch dependency,
 *   and weapon-type ammunition (for now, it is strongly recommended to use it only 
 *   for weapons using themselves as ammo, such as throwing knives). Added extension Crafting System.
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Unco.Parameters = $plugins.filter(function(p) {
        return p.description.contains('<Unco Ammo>');
    })[0].parameters; //Copied from Ellye, who thanks Iavra
Unco.Param = Unco.Param || {};

Unco.Param.showAmmoLeftActorCommand = String(Unco.Parameters['Show Ammo Left When Actor Command']).toLowerCase();
Unco.Param.showAmmoLeft = String(Unco.Parameters['Show Ammo Left In Skill Window']).toLowerCase();
Unco.Param.ammoFontSize = Number(Unco.Parameters['Ammo Font Size']);
Unco.Param.ammoFontColor = Number(Unco.Parameters['Ammo Font Color']);
Unco.Param.showAmmoLeftInDesc = String(Unco.Parameters['Show Ammo Left In Help Window']).toLowerCase();
Unco.Param.descAmmoLeftText = String(Unco.Parameters['Help Window Ammo Text']);
Unco.Param.defaultNoAmmoIconId = parseInt(String(Unco.Parameters['No Ammo Icon']));
Unco.Param.goldAmmoIconId = parseInt(String(Unco.Parameters['Gold Ammo Icon']));
Unco.Param.showAmmoLeftForAttack = String(Unco.Parameters['Show Ammo Left In Actor Command Window']).toLowerCase();
Unco.Param.compactCostDisplay = String(Unco.Parameters['Compact Cost Display']).toLowerCase();

//=============================================================================
// DataManager
//=============================================================================

Unco.AS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
   if (!Unco.AS.DataManager_isDatabaseLoaded.call(this)) return false;
   if (Imported.YEP_ItemCore && (Yanfly.Param.ItemMaxArmors > 0)) { 
      this.processUncoAmmoChargesNotetags($dataArmors);
   }
   if (Imported.YEP_ItemCore && (Yanfly.Param.ItemMaxWeapons > 0)) { 
      this.processUncoAmmoChargesNotetags($dataWeapons);
   }
   this.processUncoItemAmmoNotetags($dataSkills);
   this.processUncoSwitchNotetags($dataSkills);
   this.processUncoGoldCostNotetags($dataSkills);
   this.processUncoAmmoTextNotetags($dataSkills);
   this.processUncoEquipAmmoNotetags($dataSkills);
   this.processUncoAmmoLoadNotetags($dataSkills);
   this.processUncoAmmoTextNotetags($dataWeapons);
   this.processUncoItemAmmoNotetags($dataWeapons);
   this.processUncoEquipAmmoNotetags($dataWeapons);
   this.processUncoAmmoDescNotetags($dataArmors);
   return true;
};

DataManager.processUncoAmmoChargesNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      if (!DataManager.isIndependent(obj)) continue;
      var notedata = obj.note.split(/[\r\n]+/);

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](?:CHARGES):[ ](\d+)>/i)) {
            var value = parseInt(RegExp.$1);
            if (!isNaN(value) && (value > 0)) {
               obj.ammoCharges = value;
               obj.ammoCurrentCharges = value;
            }
         }
         if (line.match(/<(?:AMMO)[ ](?:CHARGES)[ ](?:EMPTY):[ ](\d+)>/i)) {
            var value = parseInt(RegExp.$1);
            if (!isNaN(value) && (value > 0)) {
               obj.ammoMorphIfEmpty = value;
            }
         }
      }
   }
}

DataManager.processUncoSwitchNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
      
      obj.ammoGameSwitch = [];

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:GAME)[ ](?:SWITCH):[ ](\d+)>/i)) {
            var value = parseInt(RegExp.$1);
            if (!isNaN(value)) {
               obj.ammoGameSwitch[value] = true;
            }
         }
      }
   }
}

DataManager.processUncoGoldCostNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:GOLD)[ ](?:COST):[ ](\d+)>/i)) {
            var value = parseInt(RegExp.$1);
            if (!isNaN(value)) {
               obj.goldCost = value;
            }
         }
      }
   }
}

DataManager.processUncoItemAmmoNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.itemAmmoCost = [];

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](\d+)[ ](?:ITEM):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               obj.itemAmmoCost[index] = value;
               if (DataManager.isWeapon(obj)) {
                  if (typeof $dataItems[index].isItemAmmoForWeapon === 'undefined') $dataItems[index].isItemAmmoForWeapon = [];
                  $dataItems[index].isItemAmmoForWeapon[obj.id] = value;
               } else {
                  if (typeof $dataItems[index].isItemAmmoForSkill === 'undefined') $dataItems[index].isItemAmmoForSkill = [];
                  $dataItems[index].isItemAmmoForSkill[obj.id] = value;
               }
            }
         }
      }
   }
}

DataManager.processUncoEquipAmmoNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.equipAmmoCost = [];
      obj.equipChargeAmmoCost = [];
      obj.weaponAmmoCost = [];
      obj.weaponChargeAmmoCost = [];

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](\d+)[ ](?:EQUIP):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               if ($dataArmors[index].ammoCharges) {
                  obj.equipChargeAmmoCost[index] = value;
               } else {
                  obj.equipAmmoCost[index] = value;
               }
               if (DataManager.isWeapon(obj)) {
                  if (typeof $dataArmors[index].isEquipAmmoForWeapon === 'undefined') $dataArmors[index].isEquipAmmoForWeapon = [];
                  $dataArmors[index].isEquipAmmoForWeapon[obj.id] = value;
               } else {
                  if (typeof $dataArmors[index].isEquipAmmoForSkill === 'undefined') $dataArmors[index].isEquipAmmoForSkill = [];
                  $dataArmors[index].isEquipAmmoForSkill[obj.id] = value;
               }
            }
         }
         if (line.match(/<(?:AMMO)[ ](\d+)[ ](?:WEAPON):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               if ($dataWeapons[index].ammoCharges) {
                  obj.weaponChargeAmmoCost[index] = value;
               } else {
                  obj.weaponAmmoCost[index] = value;
               }
               if (DataManager.isWeapon(obj)) {
                  if (typeof $dataWeapons[index].isWeaponAmmoForWeapon === 'undefined') $dataWeapons[index].isWeaponAmmoForWeapon = [];
                  $dataWeapons[index].isWeaponAmmoForWeapon[obj.id] = value;
               } else {
                  if (typeof $dataWeapons[index].isWeaponAmmoForSkill === 'undefined') $dataWeapons[index].isWeaponAmmoForSkill = [];
                  $dataWeapons[index].isWeaponAmmoForSkill[obj.id] = value;
               }
            }
         }
      }
   }
}

DataManager.isItemAmmo = function(item) {
   return this.isItem(item) && (item.isItemAmmoForWeapon || item.isItemAmmoForSkill);
};
DataManager.isEquipAmmo = function(item) {
   return this.isArmor(item) && (item.isEquipAmmoForWeapon || item.isEquipAmmoForSkill);
};
DataManager.isWeaponAmmo = function(item) {
   return this.isWeapon(item) && (item.isWeaponAmmoForWeapon || item.isWeaponAmmoForSkill);
};
DataManager.isAmmo = function(item) {
   return (this.isItemAmmo(item) || this.isEquipAmmo(item) || this.isWeaponAmmo(item));
};

DataManager.processUncoAmmoTextNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](?:LEFT)[ ](?:TEXT):[ ](.*)>/i)) {
            obj.ammoText = String(RegExp.$1);
         }
         if (line.match(/<(?:NO)[ ](?:AMMO)[ ](?:ICON):[ ](\d+)>/i)) {
            obj.noAmmoIconId = parseInt(RegExp.$1);
         }
         if (line.match(/<(?:SHOW)[ ](?:AMMO)[ ](?:NAME)>/i)) {
            obj.showAmmoName = true;
         }
      }
   }
};

DataManager.processUncoAmmoLoadNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](\d+)[ ](?:LOAD):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var equid = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(equid)) ) {
               obj.ammoLoadIndex = index;
               obj.ammoLoadSlot = equid;
            }
         }
         if (line.match(/<(?:AMMO)[ ](\d+)[ ](?:LOAD)>/i)) {
            var index = parseInt(RegExp.$1);
            if (!isNaN(index)) {
               obj.ammoLoadIndex = index;
               obj.ammoLoadSlot = 0;
            }
         }
      }
   }
};

DataManager.processUncoAmmoDescNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:AMMO)[ ](?:WINDOW)[ ](?:DESC):[ ](.*)>/i)) {
            obj.ammoDesc = String(RegExp.$1);
         }
      }
   }
};

Unco.AS.hasAmmoCost = function(obj) {
	if (typeof obj.goldCost == "number") {
		if (obj.goldCost > 0) return true;
	}
	if (typeof obj.equipAmmoCost != "undefined") {
		if (obj.equipAmmoCost.length > 0) return true;
	}
	if (typeof obj.equipChargeAmmoCost != "undefined") {
		if (obj.equipChargeAmmoCost.length > 0) return true;
	}
	if (typeof obj.weaponAmmoCost != "undefined") {
		if (obj.weaponAmmoCost.length > 0) return true;
	}
	if (typeof obj.weaponChargeAmmoCost != "undefined") {
		if (obj.weaponChargeAmmoCost.length > 0) return true;
	}
	if (typeof obj.itemAmmoCost != "undefined") {
		if (obj.itemAmmoCost.length > 0) return true;
	}
	if (typeof obj.ammoGameSwitch != "undefined") {
		if (obj.ammoGameSwitch.length > 0) return true;
	}
	return false;
}

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.equippableSlotsFor = function(item) {
   var emptySlots = [];
   var equippedSlots = [];
   for (var s in this.equipSlots()) {
      if (this.equipSlots()[s] === item.etypeId) {
         if (this.equips()[s] === null) {
            emptySlots.push(parseInt(s)+1);
         } else {
            equippedSlots.push(parseInt(s)+1);
         }
      }
   }
   return emptySlots.concat(equippedSlots);
}

//=============================================================================
// Game_BattlerBase
//=============================================================================

Unco.AS.Game_BattlerBase_canEquipArmor = Game_BattlerBase.prototype.canEquipArmor;
Game_BattlerBase.prototype.canEquipArmor = function(item) {
   if (typeof $dataArmors[item.id].isEquipAmmoForWeapon !== 'undefined') {
      var ok = false;
      if (this._equips[0].itemId() > 0) {
         var EquippedWeaponId = ( (typeof $dataWeapons[this._equips[0].itemId()].baseItemId === 'undefined') ? this._equips[0].itemId() : $dataWeapons[this._equips[0].itemId()].baseItemId );
         for (var weaponId in $dataArmors[item.id].isEquipAmmoForWeapon) {
            weaponId = parseInt(weaponId);
            var ammoCost = parseInt( $dataArmors[item.id].isEquipAmmoForWeapon[weaponId] );
            ammoCost = (isNaN(ammoCost)) ? -1 : ammoCost ;
            if ((weaponId === EquippedWeaponId) && (ammoCost > -1)) {
               ok = true;
               break;
            }
         }
      }
      if (ok === false) return false;
   }
   return Unco.AS.Game_BattlerBase_canEquipArmor.call(this,item);
};

Unco.AS.Game_BattlerBase_canEquipWeapon = Game_BattlerBase.prototype.canEquipWeapon;
Game_BattlerBase.prototype.canEquipWeapon = function(item) {
   if (typeof $dataWeapons[item.id].isWeaponAmmoForWeapon !== 'undefined') {
      var ok = false;
      var wantedWeaponId = ( (typeof $dataWeapons[item.id].baseItemId === 'undefined') ? item.id : $dataWeapons[item.id].baseItemId );
      var EquippedWeaponId = 0;
	  if (typeof this._equips[0].itemId != "undefined") {
         if (this._equips[0].itemId() > 0) {
            EquippedWeaponId = ( (typeof $dataWeapons[this._equips[0].itemId()].baseItemId === 'undefined') ? this._equips[0].itemId() : $dataWeapons[this._equips[0].itemId()].baseItemId );
         }
	  }
      for (var weaponId in $dataWeapons[item.id].isWeaponAmmoForWeapon) {
         weaponId = parseInt(weaponId);
         var ammoCost = parseInt( $dataWeapons[item.id].isWeaponAmmoForWeapon[weaponId] );
         ammoCost = (isNaN(ammoCost)) ? -1 : ammoCost ;
         if (EquippedWeaponId > 0) {
            if ((weaponId === EquippedWeaponId) && (ammoCost > -1)) {
               ok = true;
               break;
            }
         }
         if (weaponId === wantedWeaponId) {
            ok = true;
            break;
         }
      }
      if (ok === false) return false;
   }
   return Unco.AS.Game_BattlerBase_canEquipWeapon.call(this,item);
};

Game_Party.prototype.getItemAmount = function(baseItem) {
   if (!baseItem) return 0;
   var amount = 0;
   if (Imported.YEP_ItemCore) { 
      var maxItems = 0;
      if (DataManager.isItem(baseItem)) {
         maxItems = Yanfly.Param.ItemMaxItems;
      }
      if (DataManager.isWeapon(baseItem))  {
         maxItems = Yanfly.Param.ItemMaxWeapons;
      }
      if (DataManager.isArmor(baseItem))  {
         maxItems = Yanfly.Param.ItemMaxArmors;
      }        
      if (maxItems > 0) {
         var nonIndep;
         if (typeof baseItem.nonIndepdent === "boolean") nonIndep = baseItem.nonIndepdent;
         if (typeof baseItem.nonIndependent === "boolean") nonIndep = baseItem.nonIndependent;
         if (nonIndep === false) {
            if (DataManager.isItem(baseItem)) {
               baseItem = ( baseItem.baseItemId ? $dataItems[baseItem.baseItemId] : baseItem );
               var group = this.items();
            }
            if (DataManager.isWeapon(baseItem))  {
               baseItem = ( baseItem.baseItemId ? $dataWeapons[baseItem.baseItemId] : baseItem );
               var group = this.weapons();
            }
            if (DataManager.isArmor(baseItem))  {
               baseItem = ( baseItem.baseItemId ? $dataArmors[baseItem.baseItemId] : baseItem );
               var group = this.armors(); 
            }        
            var baseItemId = baseItem.id;
            for (var i = 0; i < group.length; ++i) {
               var item = group[i];
               if (!item) continue;
               if (!item.baseItemId) continue;
               if (item.baseItemId !== baseItemId) continue;
               amount += 1;
            }
            return amount;
         }
      }
   }
   if ( DataManager.isItem(baseItem) && $gameParty._items[baseItem.id]) amount = $gameParty._items[baseItem.id];
   if ( DataManager.isArmor(baseItem) && $gameParty._armors[baseItem.id]) amount = $gameParty._armors[baseItem.id];
   if ( DataManager.isWeapon(baseItem) && $gameParty._weapons[baseItem.id]) amount = $gameParty._weapons[baseItem.id];
   return amount;
}

Unco.AS.Game_BattlerBase_canPaySkillCost =
   Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
   if (this.isActor()) {
      if (!this.canPaySkillAmmoCost(skill)) return false;
   }
   return Unco.AS.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.getAmmoCurrentCharges = function(item) {
   if (!item) return 0;
   if (Imported.YEP_ItemCore) { 
      if (!DataManager.isIndependent(item)) return 0;
      for (var i in this.equips()) {
         if ((typeof this.equips()[i] !== 'undefined') && (this.equips()[i] !== null)) {
            if (typeof this.equips()[i].baseItemId !== 'undefined') {
               if ((this.equips()[i].baseItemId === item.id) && (this.equips()[i]._dataClass === item._dataClass)) {
                  return this.equips()[i].ammoCurrentCharges;
               }
            }        
         }
      }
   }
   return 0;
};

Game_BattlerBase.prototype.addAmmoCurrentCharges = function(item,amount) {
   if (!item) return;
   if (Imported.YEP_ItemCore) { 
      if (!DataManager.isIndependent(item)) return 0;
      for (var i in this.equips()) {
         if ((typeof this.equips()[i] !== 'undefined') && (this.equips()[i] !== null)) {
            if (typeof this.equips()[i].baseItemId !== 'undefined') {
               if ((this.equips()[i].baseItemId === item.id) && (this.equips()[i]._dataClass === item._dataClass)) {
                  this.equips()[i].ammoCurrentCharges = parseInt(this.equips()[i].ammoCurrentCharges);
                  this.equips()[i].ammoCharges = parseInt(this.equips()[i].ammoCharges);
                  this.equips()[i].ammoCurrentCharges += amount;
                  if (this.equips()[i].ammoCurrentCharges > this.equips()[i].ammoCharges) {
                     this.equips()[i].ammoCurrentCharges = this.equips()[i].ammoCharges;
                  }
                  if (this.equips()[i].ammoCurrentCharges < 0) {
                     this.equips()[i].ammoCurrentCharges = 0;
                  }
                  break;
               }
            }        
         }
      }
   }
};

Game_BattlerBase.prototype.fillAmmoCharges = function(item) {
   if (!item) return;
   if (Imported.YEP_ItemCore) { 
      if (!DataManager.isIndependent(item)) return 0;
      for (var i in this.equips()) {
         if ((typeof this.equips()[i] !== 'undefined') && (this.equips()[i] !== null)) {
            if (typeof this.equips()[i].baseItemId !== 'undefined') {
               if (this.equips()[i].baseItemId === item.id) {
                  this.equips()[i].ammoCurrentCharges = this.equips()[i].ammoCharges;
               }
            }        
         }
      }
   }
};

Game_BattlerBase.prototype.canPaySkillAmmoCost = function(skill) {
   if (skill.id === this.attackSkillId()) {
      if (typeof this._equips !== 'undefined') {
         if (this._equips[0]._itemId > 0) {
			if ( !Unco.AS.hasAmmoCost(skill) ) {
               skill = $dataWeapons[ ( (typeof $dataWeapons[this._equips[0]._itemId].baseItemId === 'undefined') ? this._equips[0]._itemId : $dataWeapons[this._equips[0]._itemId].baseItemId ) ];
			}
         }
      }
   }
   for (var switchId in skill.ammoGameSwitch) {
      switchId = parseInt(switchId);
      if (!isNaN(switchId) && (switchId > 0)) {
         if ($gameSwitches.value(switchId) === false) {
            return false;
         }
      }
   }
   if (!this.canPaySkillReloadAmmoCost(skill)) return false;
   if (!this.canPaySkillItemAmmoCost(skill)) return false;
   if (!this.canPaySkillEquipAmmoCost(skill)) return false;
   if (!this.canPaySkillEquipChargeAmmoCost(skill)) return false;
   return true;
};

Game_BattlerBase.prototype.canPaySkillReloadAmmoCost = function(skill) {
   if ((typeof skill.ammoLoadIndex === 'number') && (typeof skill.ammoLoadSlot === 'number')) {
      if (this.hasArmor($dataArmors[skill.ammoLoadIndex]) || ($gameParty.getItemAmount($dataArmors[skill.ammoLoadIndex]) < 1)) {
         return false;
      }
   }
   return true;
};

Game_BattlerBase.prototype.canPaySkillItemAmmoCost = function(skill) {
   if (typeof skill.goldCost === 'number') {
      if (skill.goldCost > $gameParty.gold()) {
         return false;
      }
   }
   for (var ammoId in skill.itemAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         var nbOwned = $gameParty.getItemAmount($dataItems[ammoId]);
         if (skill.itemAmmoCost[ammoId] > nbOwned) {
            return false;
         }
      }
   }
   return true;
};

Game_BattlerBase.prototype.canPaySkillEquipAmmoCost = function(skill) {
   if (!this.canPaySkillArmorAmmoCost(skill)) return false;
   if (!this.canPaySkillWeaponAmmoCost(skill)) return false;
   return true;
};

Game_BattlerBase.prototype.canPaySkillArmorAmmoCost = function(skill) {
   var retVal = true;
   for (var ammoId in skill.equipAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this.hasArmor($dataArmors[ammoId])) {
            skill.equipAmmoCost[ammoId] = parseInt(skill.equipAmmoCost[ammoId]);
            if (!isNaN(skill.equipAmmoCost[ammoId])) {
               var nbOwned = 1+$gameParty.getItemAmount($dataArmors[ammoId]);
               if (skill.equipAmmoCost[ammoId] <= nbOwned) {
                  return true;
               } else retVal = false;
            } else retVal = false;
         } else retVal = false;
      }
   }
   return retVal;
};

Game_BattlerBase.prototype.canPaySkillWeaponAmmoCost = function(skill) {
   var retVal = true;
   for (var ammoId in skill.weaponAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this.hasWeapon($dataWeapons[ammoId])) {
            skill.weaponAmmoCost[ammoId] = parseInt(skill.weaponAmmoCost[ammoId]);
            if (!isNaN(skill.weaponAmmoCost[ammoId])) {
               var nbOwned = 1+$gameParty.getItemAmount($dataWeapons[ammoId]);
               if (skill.weaponAmmoCost[ammoId] <= nbOwned) {
                  return true;
               } else retVal = false;
            } else retVal = false;
         } else retVal = false;
      }
   }
   return retVal;
};

Game_BattlerBase.prototype.canPaySkillEquipChargeAmmoCost = function(skill) {
   if (!this.canPaySkillArmorChargeAmmoCost(skill)) return false;
   if (!this.canPaySkillWeaponChargeAmmoCost(skill)) return false;
   return true;
};

Game_BattlerBase.prototype.canPaySkillArmorChargeAmmoCost = function(skill) {
   var retVal = true;
   for (var ammoId in skill.equipChargeAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this.hasArmor($dataArmors[ammoId])) {
            var chargeCost = parseInt(skill.equipChargeAmmoCost[ammoId]);
            if (!isNaN(chargeCost)) {
               var nbOwned = this.getAmmoCurrentCharges($dataArmors[ammoId]);
               if (chargeCost <= nbOwned) {
                  return true;
               } else retVal = false;    
            } else retVal = false;
         } else retVal = false;
      }
   }
   return retVal;
};

Game_BattlerBase.prototype.canPaySkillWeaponChargeAmmoCost = function(skill) {
   var retVal = true;
   for (var ammoId in skill.weaponChargeAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this.hasWeapon($dataWeapons[ammoId])) {
            var chargeCost = parseInt(skill.weaponChargeAmmoCost[ammoId]);
            if (!isNaN(chargeCost)) {
               var nbOwned = this.getAmmoCurrentCharges($dataWeapons[ammoId]);
               if (chargeCost <= nbOwned) {
                  return true;
               } else retVal = false;    
            } else retVal = false;
         } else retVal = false;
      }
   }
   return retVal;
};

Unco.AS.Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Unco.AS.Game_BattlerBase_paySkillCost.call(this, skill);
    if (this.constructor.name === 'Game_Actor') this.paySkillAmmoCost(skill);
};

Game_BattlerBase.prototype.paySkillAmmoCost = function(skill) {
   if (skill.id === this.attackSkillId()) {
      if (typeof this._equips !== 'undefined') {
         if (this._equips[0]._itemId > 0) {
			if ( !Unco.AS.hasAmmoCost(skill) ) {
				skill = $dataWeapons[ ( (typeof $dataWeapons[this._equips[0]._itemId].baseItemId === 'undefined') ? this._equips[0]._itemId : $dataWeapons[this._equips[0]._itemId].baseItemId ) ];
			}            
         }
      }
   }
   this.reloadAmmo(skill);
   this.paySkillItemAmmoCost(skill);
   this.paySkillEquipAmmoCost(skill);
   this.paySkillEquipChargeAmmoCost(skill);
};

Game_BattlerBase.prototype.reloadAmmo = function(skill) {
   if ((typeof skill.ammoLoadIndex === 'number') && (typeof skill.ammoLoadSlot === 'number')) {
      var loadSlot = skill.ammoLoadSlot;
      var legitLoadSlots = this.equippableSlotsFor($dataArmors[skill.ammoLoadIndex]);
      if (legitLoadSlots.contains(loadSlot) === false) {
         loadSlot = legitLoadSlots[0];
      }
      this.changeEquipById(loadSlot,skill.ammoLoadIndex);
   }
};

Game_BattlerBase.prototype.paySkillItemAmmoCost = function(skill) {
   if (typeof skill.goldCost === 'number') {
      $gameParty.loseGold(skill.goldCost);
   }
   for (var ammoId in skill.itemAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         $gameParty.gainItem($dataItems[ammoId],-skill.itemAmmoCost[ammoId]);
      }
   }
};

Game_BattlerBase.prototype.paySkillEquipAmmoCost = function(skill) {
   for (var ammoId in skill.equipAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         skill.equipAmmoCost[ammoId] = parseInt(skill.equipAmmoCost[ammoId]);
         if (this.hasArmor($dataArmors[ammoId]) && !isNaN(skill.equipAmmoCost[ammoId]) && (skill.equipAmmoCost[ammoId] > 0)) {
            this._markForEquipDiscard = ammoId;
            if ($gameParty.getItemAmount($dataArmors[ammoId]) > 0) {
               $gameParty.gainItem($dataArmors[ammoId],-Math.max(skill.equipAmmoCost[ammoId]-1,0));
            }
         }
      }
   }
   for (var ammoId in skill.weaponAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         skill.weaponAmmoCost[ammoId] = parseInt(skill.weaponAmmoCost[ammoId]);
         if (this.hasWeapon($dataWeapons[ammoId]) && !isNaN(skill.weaponAmmoCost[ammoId]) && (skill.weaponAmmoCost[ammoId] > 0)) {
            this._markForWeaponDiscard = ammoId;
            if ($gameParty.getItemAmount($dataWeapons[ammoId]) > 0) {
               $gameParty.gainItem($dataWeapons[ammoId],-Math.max(skill.weaponAmmoCost[ammoId]-1,0));
            }
         }
      }
   }
};

Game_BattlerBase.prototype.paySkillEquipChargeAmmoCost = function(skill) {
   for (var ammoId in skill.equipChargeAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         var chargeCost = parseInt(skill.equipChargeAmmoCost[ammoId]);
         if (this.hasArmor($dataArmors[ammoId]) && !isNaN(chargeCost) && (chargeCost > 0)) {
            this.addAmmoCurrentCharges($dataArmors[ammoId], -chargeCost);
            if (this.getAmmoCurrentCharges($dataArmors[ammoId]) <= 0) {
               this._markForEquipDiscard = ammoId;
            }
         }
      }
   }
   for (var ammoId in skill.weaponChargeAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         var chargeCost = parseInt(skill.weaponChargeAmmoCost[ammoId]);
         if (this.hasWeapon($dataWeapons[ammoId]) && !isNaN(chargeCost ) && (chargeCost  > 0)) {
            this.addAmmoCurrentCharges($dataWeapons[ammoId], -chargeCost);
            if (this.getAmmoCurrentCharges($dataWeapons[ammoId]) <= 0) {
               this._markForWeaponDiscard = ammoId;
            }
         }
      }
   }
};


//=============================================================================
// BattleManager
//=============================================================================
//
// Management of post-action skill cost application:
// - un-equip current ammo,
// - re-equip one if available in inventory.
//

Unco.AS.BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
   Unco.AS.BattleManager_invokeNormalAction.call(this,subject,target);
   if (typeof this._subject._markForEquipDiscard !== 'undefined') {
      for (var i in this._subject.equips()) {
         if ((typeof this._subject.equips()[i] !== 'undefined') && (this._subject.equips()[i] !== null)) {
            if (typeof this._subject.equips()[i].baseItemId !== 'undefined') {
               if (this._subject.equips()[i].baseItemId === this._subject._markForEquipDiscard) {
                  this._subject._markForEquipDiscard = this._subject.equips()[i].id;
               }
            }        
         }
      }
      if ( (typeof $dataArmors[this._subject._markForEquipDiscard].ammoCurrentCharges === 'number') 
        && ($dataArmors[this._subject._markForEquipDiscard].ammoCurrentCharges === 0) 
        && (typeof $dataArmors[this._subject._markForEquipDiscard].ammoMorphIfEmpty === 'number')  ) 
      {
         $gameParty.gainItem($dataItems[ $dataArmors[this._subject._markForEquipDiscard].ammoMorphIfEmpty ] , 1);
      }
      this._subject.discardEquip($dataArmors[this._subject._markForEquipDiscard]);  
      if (($gameParty.getItemAmount($dataArmors[ this._subject._markForEquipDiscard ]) > 0) && (!$dataArmors[ this._subject._markForEquipDiscard ].ammoCharges)) {
         var loadSlot = this._subject.equippableSlotsFor($dataArmors[ this._subject._markForEquipDiscard ])[0];
         var ammoId = ($dataArmors[ this._subject._markForEquipDiscard ].baseItemId) ? ($dataArmors[ this._subject._markForEquipDiscard ].baseItemId) : this._subject._markForEquipDiscard;
         this._subject.changeEquipById(loadSlot,ammoId);
      }    
      delete this._subject._markForEquipDiscard;
   }
   if (typeof this._subject._markForWeaponDiscard !== 'undefined') {
      for (var i in this._subject.equips()) {
         if ((typeof this._subject.equips()[i] !== 'undefined') && (this._subject.equips()[i] !== null)) {
            if (typeof this._subject.equips()[i].baseItemId !== 'undefined') {
               if (this._subject.equips()[i].baseItemId === this._subject._markForWeaponDiscard) {
                  this._subject._markForWeaponDiscard = this._subject.equips()[i].id;
               }
            }        
         }
      }
      if ( (typeof $dataWeapons[this._subject._markForWeaponDiscard].ammoCurrentCharges === 'number') 
        && ($dataWeapons[this._subject._markForWeaponDiscard].ammoCurrentCharges === 0) 
        && (typeof $dataWeapons[this._subject._markForWeaponDiscard].ammoMorphIfEmpty === 'number')  ) 
      {
         $gameParty.gainItem($dataItems[ $dataWeapons[this._subject._markForWeaponDiscard].ammoMorphIfEmpty ] , 1);
      }
      this._subject.discardEquip($dataWeapons[this._subject._markForWeaponDiscard]);   
      if (($gameParty.getItemAmount($dataWeapons[ this._subject._markForWeaponDiscard ]) > 0) && (!$dataWeapons[ this._subject._markForWeaponDiscard ].ammoCharges)) {
         var loadSlot = this._subject.equippableSlotsFor($dataWeapons[ this._subject._markForWeaponDiscard ])[0];
         var ammoId = ($dataWeapons[ this._subject._markForWeaponDiscard ].baseItemId) ? ($dataWeapons[ this._subject._markForWeaponDiscard ].baseItemId) : this._subject._markForWeaponDiscard;
         this._subject.changeEquipById(loadSlot,ammoId);
      }        
      delete this._subject._markForWeaponDiscard;
   }
};

//=============================================================================
// Window_SkillList
//=============================================================================

if ((typeof Imported.YEP_SkillCore === 'undefined') || (Imported.YEP_SkillCore !== true)) {   
   Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
      var dw = width;
      if (this._actor.skillTpCost(skill) > 0) {
         this.changeTextColor(this.tpCostColor());
         var text = this._actor.skillTpCost(skill);
         this.drawText(text, x, y, dw, 'right');
         dw -= this.textWidth(text);
      }
      if (dw !== width) {
         var text = ' ';
         this.drawText(text, x, y, dw, 'right');
         dw -= this.textWidth(text);
      }
      if (this._actor.skillMpCost(skill) > 0) {
         this.changeTextColor(this.mpCostColor());
         var text = this._actor.skillMpCost(skill)
         this.drawText(text, x, y, dw, 'right');
         dw -= this.textWidth(text);
      } 
      return dw; 
   }  
}


Unco.AS.Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;   
   
Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
   var dw = width;
   dw = this.drawAllAmmoCosts(skill, wx, wy, dw);
   return Unco.AS.Window_SkillList_drawSkillCost.call(this,skill, wx, wy, dw);
};
   
Window_SkillList.prototype.drawAmmoCost = function(cost, icon, itemAmountToDisplay, wx, wy, dw) {
   this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
   var text = '';
   if (Unco.Param.compactCostDisplay === 'false') text = text + 'x';
   text = text + String(cost);
   if (Unco.Param.compactCostDisplay === 'false') text = text + ( (itemAmountToDisplay === "") ? "" : (  "/" + itemAmountToDisplay  )  );
   this.contents.fontSize = Unco.Param.ammoFontSize;
   if (Unco.Param.compactCostDisplay === 'false') this.drawText(text, wx, wy, dw, 'right');
   if (Unco.Param.compactCostDisplay === 'false') dw -= this.textWidth(text);
   if (icon > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(icon, iw, wy + 2);
      if (Unco.Param.compactCostDisplay === 'true') {
         this.drawText(text, iw, wy, Window_Base._iconWidth, 'center');
      }
      dw -= Window_Base._iconWidth + 2;
   }
   this.resetFontSettings();
   return dw;
}

Window_SkillList.prototype.drawAllAmmoCosts = function(skill, wx, wy, dw) {
   //---------------------------------------------------//
   // - Gold Cost
   if (typeof skill.goldCost === 'number') {
      dw = this.drawAmmoCost(skill.goldCost, Unco.Param.goldAmmoIconId, "", wx, wy, dw);
   }
   //---------------------------------------------------//
   // - Item Cost
   for (var ammoId in skill.itemAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         var ammoCost = skill.itemAmmoCost[ammoId];
         var icon = $dataItems[ammoId].iconIndex;
         var amountText = ( (Unco.Param.showAmmoLeft === 'false') ? "" : (  "/" + $gameParty.getItemAmount($dataItems[ammoId])  )  );
         dw = this.drawAmmoCost(ammoCost, icon, amountText, wx, wy, dw);
      }
   }
   //---------------------------------------------------//
   // - Armor Cost
   var zeroArmorAmmo = false;
   for (var ammoId in skill.equipAmmoCost) {
      var ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this._actor.hasArmor($dataArmors[ammoId])) {
            var ammoCost = skill.equipAmmoCost[ammoId];
            var icon = $dataArmors[ammoId].iconIndex;
            var amountText = ( (Unco.Param.showAmmoLeft === 'false') ? "" : (  "/" + ( 1 + $gameParty.getItemAmount($dataArmors[ammoId]) )  )  );
            dw = this.drawAmmoCost(ammoCost, icon, amountText, wx, wy, dw);
            zeroArmorAmmo = false;
            break;
         } else {
            zeroArmorAmmo = true;
            if (typeof smallestCost !== 'Number') {
               var smallestCost = skill.equipAmmoCost[ammoId];
            } else {
               if (skill.equipAmmoCost[ammoId] < smallestCost) smallestCost = skill.equipAmmoCost[ammoId];
            }
         }
      }
   }
   if (zeroArmorAmmo === true) {
      var ammoCost = smallestCost;
      var icon = ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId );
      dw = this.drawAmmoCost(ammoCost, icon, "", wx, wy, dw);
   }
   //---------------------------------------------------//
   // - Weapon Cost
   var zeroWeaponAmmo = false;
   for (var ammoId in skill.weaponAmmoCost) {
      var ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this._actor.hasWeapon($dataWeapons[ammoId])) {
            var ammoCost = skill.weaponAmmoCost[ammoId];
            var icon = $dataWeapons[ammoId].iconIndex;
            var amountText = ( (Unco.Param.showAmmoLeft === 'false') ? "" : (  "/" + ( 1 + $gameParty.getItemAmount($dataWeapons[ammoId]) )  )  );
            dw = this.drawAmmoCost(ammoCost, icon, amountText, wx, wy, dw);
            zeroWeaponAmmo = false;
            break;
         } else {
            zeroWeaponAmmo = true;
            if (typeof smallestCost !== 'Number') {
               var smallestCost = skill.weaponAmmoCost[ammoId];
            } else {
               if (skill.weaponAmmoCost[ammoId] < smallestCost) smallestCost = skill.weaponAmmoCost[ammoId];
            }
         }
      }
   }
   if (zeroWeaponAmmo === true) {
      var ammoCost = smallestCost;
      var icon = ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId );
      dw = this.drawAmmoCost(ammoCost, icon, "", wx, wy, dw);
   }
   //---------------------------------------------------//
   // - Charge Armor Cost
   var zeroChargeArmorAmmo = false;
   for (var ammoId in skill.equipChargeAmmoCost) {
      var ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this._actor.hasArmor($dataArmors[ammoId])) {
            var ammoCost = skill.equipChargeAmmoCost[ammoId];
            var icon = $dataArmors[ammoId].iconIndex;
            var amountText = ( (Unco.Param.showAmmoLeft === 'false') ? "" : (  "/" + this._actor.getAmmoCurrentCharges( $dataArmors[ammoId] )  )  );
            dw = this.drawAmmoCost(ammoCost, icon, amountText, wx, wy, dw);
            zeroChargeArmorAmmo = false;
            break;
         } else {
            zeroChargeArmorAmmo = true;
            if (typeof smallestCost !== 'Number') {
               var smallestCost = skill.equipChargeAmmoCost[ammoId];
            } else {
               if (skill.equipChargeAmmoCost[ammoId] < smallestCost) smallestCost = skill.equipChargeAmmoCost[ammoId];
            }
         }
      }
   }
   if (zeroChargeArmorAmmo === true) {
      var ammoCost = smallestCost;
      var icon = ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId );
      dw = this.drawAmmoCost(ammoCost, icon, "", wx, wy, dw);
   }
   //---------------------------------------------------//
   // - Charge Weapon Cost
   var zeroChargeWeaponAmmo = false;
   for (var ammoId in skill.weaponChargeAmmoCost) {
      var ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         if (this._actor.hasWeapon($dataWeapons[ammoId])) {
            var ammoCost = skill.weaponChargeAmmoCost[ammoId];
            var icon = $dataWeapons[ammoId].iconIndex;
            var amountText = ( (Unco.Param.showAmmoLeft === 'false') ? "" : (  "/" + this._actor.getAmmoCurrentCharges( $dataWeapons[ammoId] )  )  );
            dw = this.drawAmmoCost(ammoCost, icon, amountText, wx, wy, dw);
            zeroChargeWeaponAmmo = false;
            break;
         } else {
            zeroChargeWeaponAmmo = true;
            if (typeof smallestCost !== 'Number') {
               var smallestCost = skill.weaponChargeAmmoCost[ammoId];
            } else {
               if (skill.weaponChargeAmmoCost[ammoId] < smallestCost) smallestCost = skill.weaponChargeAmmoCost[ammoId];
            }
         }
      }
   }
   if (zeroChargeWeaponAmmo === true) {
      var ammoCost = smallestCost;
      var icon = ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId );
      dw = this.drawAmmoCost(ammoCost, icon, "", wx, wy, dw);
   }
   return dw;
};


//=============================================================================
// Window_Help
//=============================================================================

Window_Help.prototype.getAmmoAmountText = function(item) {
   var text = '';
   if (typeof item !== 'undefined') {
      var introText = ( (typeof item.ammoText !== 'undefined') ? item.ammoText : Unco.Param.descAmmoLeftText);
      if ((DataManager.isSkill(item)) && (Unco.Param.showAmmoLeftInDesc === 'true') && introText !== "") {
         var skill = item;
         var withAmmo = false;
         //---------------------------------------------------//
         // - Gold Cost
         if (typeof skill.goldCost === 'number') {
            text = text + '\\i[' + String(Unco.Param.goldAmmoIconId) + ']';
            text = text + 'x' + $gameParty.gold();
            withAmmo = true;
         }
         //---------------------------------------------------//
         // - Item Cost
         for (var ammoId in skill.itemAmmoCost) {
            var cost = skill.itemAmmoCost[ammoId];
            ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(cost)) {
               var cost = parseInt(cost);
               var itemOwned = ($gameParty.getItemAmount($dataItems[ammoId]) > 0);
               text = text + '\\i[' + String($dataItems[ammoId].iconIndex) + ']';
               text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataItems[ammoId].name + ' ' );
               text = text + ( ((cost <= 0) && itemOwned) ? '' : ( 'x' + String( $gameParty.getItemAmount($dataItems[ammoId]) ) )  );
               withAmmo = true;
            }
         }
         //---------------------------------------------------//
         // - Armor Cost
         var zeroEquipAmmo = false;
         for (var ammoId in skill.equipAmmoCost) {
            var cost = skill.equipAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && (typeof this._actor !== 'undefined')) {
               cost = parseInt(cost);
               withAmmo = true;
               if (this._actor.hasArmor($dataArmors[ammoId])) {
                  text = text + '\\i[' + String($dataArmors[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataArmors[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( 1 + $gameParty.getItemAmount($dataArmors[ammoId]) ) );
                  text = text + ( (typeof $dataArmors[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataArmors[ammoId].ammoDesc + ')' );
                  zeroEquipAmmo = false;
                  break;
               } else {
                  zeroEquipAmmo = true;
               }
            }
         }
         if (zeroEquipAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Weapon Cost
         var zeroWeaponAmmo = false;
         for (var ammoId in skill.weaponAmmoCost) {
            var cost = skill.weaponAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && (typeof this._actor !== 'undefined')) {
               cost = parseInt(cost);
               withAmmo = true;
               if (this._actor.hasWeapon($dataWeapons[ammoId])) {
                  text = text + '\\i[' + String($dataWeapons[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataWeapons[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( 1 + $gameParty.getItemAmount($dataWeapons[ammoId]) ) );
                  text = text + ( (typeof $dataWeapons[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataWeapons[ammoId].ammoDesc + ')' );
                  zeroWeaponAmmo = false;
                  break;
               } else {
                  zeroWeaponAmmo = true;
               }
            }
         }
         if (zeroWeaponAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Charge Armor Cost
         var zeroChargeEquipAmmo = false;
         for (var ammoId in skill.equipChargeAmmoCost) {
            var cost = skill.equipChargeAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && (typeof this._actor !== 'undefined')) {
               cost = parseInt(cost);
               withAmmo = true;
               if (this._actor.hasArmor($dataArmors[ammoId])) {
                  text = text + '\\i[' + String($dataArmors[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataArmors[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( this._actor.getAmmoCurrentCharges($dataArmors[ammoId]) ) );
                  text = text + ( (typeof $dataArmors[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataArmors[ammoId].ammoDesc + ')' );
                  zeroChargeEquipAmmo = false;
                  break;
               } else {
                  zeroChargeEquipAmmo = true;
               }
            }
         }
         if (zeroChargeEquipAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Charge Weapon Cost
         var zeroChargeWeaponAmmo = false;
         for (var ammoId in skill.weaponChargeAmmoCost) {
            var cost = skill.weaponChargeAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && (typeof this._actor !== 'undefined')) {
               cost = parseInt(cost);
               withAmmo = true;
               if (this._actor.hasWeapon($dataWeapons[ammoId])) {
                  text = text + '\\i[' + String($dataWeapons[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataWeapons[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( this._actor.getAmmoCurrentCharges($dataWeapons[ammoId]) ) );
                  text = text + ( (typeof $dataWeapons[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataWeapons[ammoId].ammoDesc + ')' );
                  zeroWeaponAmmo = false;
                  break;
               } else {
                  zeroWeaponAmmo = true;
               }
            }
         }
         if (zeroChargeWeaponAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - End
         if (withAmmo === true) text = '\n' + introText + ' : ' + text;
      }
   }
   return text;
}

Window_Help.prototype.setItem = function(item) {
   this.setText(item ? item.description + this.getAmmoAmountText(item) : '');
};

Unco.AS.Window_SkillList_setHelpWindowItem = Window_SkillList.prototype.setHelpWindowItem;
Window_SkillList.prototype.setHelpWindowItem = function(item) {
   if (this._helpWindow) {
      this._helpWindow._actor = this._actor;
   }
   Unco.AS.Window_SkillList_setHelpWindowItem.call(this,item)
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.getAmmoText = function(skill) {
    var ammoStr = '';  
    if (Unco.Param.showAmmoLeftForAttack === 'true') {
          //---------------------------------------------------//
          // - Item Cost
          for (var ammoId in skill.itemAmmoCost) {
             var ammoId = parseInt(ammoId);
             var ammoCost = parseInt(skill.itemAmmoCost[ammoId]);
             if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(ammoCost) && (ammoCost > 0)) {
                if (ammoStr !== '') ammoStr += '|';
                ammoStr += String(  $gameParty.getItemAmount($dataItems[ammoId]) );               
             }
          }
          //---------------------------------------------------//
          // - Armor Cost
          var zeroAmmo = false;
          for (var ammoId in skill.equipAmmoCost) {
             var ammoId = parseInt(ammoId);
             var ammoCost = parseInt(skill.equipAmmoCost[ammoId]);
             if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(ammoCost) && (ammoCost > 0)) {
                if (this._actor.hasArmor($dataArmors[ammoId])) {
                   if (ammoStr !== '') ammoStr += '|';
                   ammoStr += String( 1+$gameParty.getItemAmount($dataArmors[ammoId]) );
                   zeroAmmo = false;
                   break;
                } else {
                   zeroAmmo = true;
                }
             }
          }
          if (zeroAmmo === true) {
             if (ammoStr !== '') ammoStr += '|';
             ammoStr += '0';
          }
          //---------------------------------------------------//
          // - Weapon Cost
          var zeroWeaponAmmo = false;
          for (var ammoId in skill.weaponAmmoCost) {
             var ammoId = parseInt(ammoId);
             var ammoCost = parseInt(skill.weaponAmmoCost[ammoId]);
             if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(ammoCost) && (ammoCost > 0)) {
                if (this._actor.hasWeapon($dataWeapons[ammoId])) {
                   if (ammoStr !== '') ammoStr += '|';
                   ammoStr += String( 1+$gameParty.getItemAmount($dataWeapons[ammoId]) );
                   zeroWeaponAmmo = false;
                   break;
                } else {
                   zeroWeaponAmmo = true;
                }
             }
          }
          if (zeroWeaponAmmo === true) {
             if (ammoStr !== '') ammoStr += '|';
             ammoStr += '0';
          }
          //---------------------------------------------------//
          // - Charge Armor Cost
          var zeroChargeAmmo = false;
          for (var ammoId in skill.equipChargeAmmoCost) {
             var ammoId = parseInt(ammoId);
             var ammoCost = parseInt(skill.equipChargeAmmoCost[ammoId]);
             if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(ammoCost) && (ammoCost > 0)) {
                if (this._actor.hasArmor($dataArmors[ammoId])) {
                   if (ammoStr !== '') ammoStr += '|';
                   ammoStr += String( this._actor.getAmmoCurrentCharges($dataArmors[ammoId]) );
                   zeroChargeAmmo = false;
                   break;
                } else {
                   zeroChargeAmmo = true;
                }
             }
          }
          if (zeroChargeAmmo === true) {
             if (ammoStr !== '') ammoStr += '|';
             ammoStr += '0';
          }
          //---------------------------------------------------//
          // - Charge Weapon Cost
          var zeroChargeWeaponAmmo = false;
          for (var ammoId in skill.weaponChargeAmmoCost) {
             var ammoId = parseInt(ammoId);
             var ammoCost = parseInt(skill.weaponChargeAmmoCost[ammoId]);
             if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(ammoCost) && (ammoCost > 0)) {
                if (this._actor.hasWeapon($dataWeapons[ammoId])) {
                   if (ammoStr !== '') ammoStr += '|';
                   ammoStr += String( this._actor.getAmmoCurrentCharges($dataWeapons[ammoId]) );
                   zeroChargeWeaponAmmo = false;
                   break;
                } else {
                   zeroChargeWeaponAmmo = true;
                }
             }
          }
          if (zeroChargeWeaponAmmo === true) {
             if (ammoStr !== '') ammoStr += '|';
             ammoStr += '0';
          }
    }
    //---------------------------------------------------//
    // - End
    if (ammoStr !== '') ammoStr = '[' + ammoStr + ']';
    return ammoStr;
};

Unco.AS.Window_ActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
if (Imported.BOB_BattleCommandList === true) {
   Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext, icon) {
      if (symbol === 'attack') {
		 var skill = $dataSkills[this._actor.attackSkillId()];
		 if ( Unco.AS.hasAmmoCost(skill) ) {
			var ammoStr = this.getAmmoText(skill);
            name = name + ammoStr;
		 } else if ( (this._actor._equips[0]) && (this._actor._equips[0]._itemId) ) {
            var ammoStr = this.getAmmoText($dataWeapons[this._actor._equips[0]._itemId]);
            name = name + ammoStr;
         }
      }
      if (symbol === 'customSkill') {
         var ammoStr = this.getAmmoText(ext);
         name = name + ammoStr;
      }
      Unco.AS.Window_ActorCommand_addCommand.call(this,name, symbol, enabled, ext, icon);
   };
} else {
   if (Imported.YEP_WeaponUnleash) {
	  Window_ActorCommand.prototype.addAttackCommand = function() {
         Yanfly.WUL.Window_ActorCommand_addAttackCommand.call(this);
         var index = this.findSymbol('attack');
         if (index < 0) return;
		 var skill = $dataSkills[this._actor.attackSkillId()];
         var name = skill.commandAttackText;
		 if ( Unco.AS.hasAmmoCost(skill) ) {
			var ammoStr = this.getAmmoText(skill);
            name = name + ammoStr;
		 } else if ((this._actor._equips[0]) && (this._actor._equips[0]._itemId)) {
            var ammoStr = this.getAmmoText($dataWeapons[this._actor._equips[0]._itemId]);
            name = name + ammoStr;
         }
         this._list[index].name = name;
      };
	  Window_ActorCommand.prototype.addGuardCommand = function() {
         Yanfly.WUL.Window_ActorCommand_addGuardCommand.call(this);
         var index = this.findSymbol('guard');
         if (index < 0) return;
         var name = $dataSkills[this._actor.guardSkillId()].commandGuardText;
		 var ammoStr = this.getAmmoText( $dataSkills[this._actor.guardSkillId()] );
         name = name + ammoStr;
         this._list[index].name = name;
      };
   } else {	   
      Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
         if (symbol === 'attack') {
		    var skill = $dataSkills[this._actor.attackSkillId()];
			if ( Unco.AS.hasAmmoCost(skill) ) {
			   var ammoStr = this.getAmmoText(skill);
               name = name + ammoStr;
		    } else if ( (this._actor._equips[0]) && (this._actor._equips[0]._itemId)) {
               var ammoStr = this.getAmmoText($dataWeapons[this._actor._equips[0]._itemId]);
               name = name + ammoStr;
			}
         }
         Unco.AS.Window_ActorCommand_addCommand.call(this,name, symbol, enabled, ext);
      };
   }
}

Unco.AS.Window_ActorCommand_setHelpWindowItem = Window_ActorCommand.prototype.setHelpWindowItem;
Window_ActorCommand.prototype.setHelpWindowItem = function(item) {
   if (this._helpWindow && this._actor) {
      this._helpWindow._actor = this._actor;
   }
   Unco.AS.Window_ActorCommand_setHelpWindowItem.call(this,item)
};



if (Imported.YEP_SkillCore === true) {
//=============================================================================
// Window_Base
//=============================================================================
   Window_Base.prototype.mustDrawActorAmmo = function(actor) {
      var cond = typeof actor._equips !== 'undefined';
      if (cond) cond = typeof actor._equips[0] !== 'undefined';
      if (cond) {
         if (actor._equips[0]._itemId > 0) {
            skill = $dataWeapons[actor._equips[0]._itemId];
            for (var ammoId in skill.itemAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {                
                  if (!isNaN(skill.itemAmmoCost[ammoId])) {
                     return true;
                  }
               }
            }
            for (var ammoId in skill.equipAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {                   
                  if (!isNaN(skill.equipAmmoCost[ammoId])) {
                     return true;
                  }
               }
            }
            for (var ammoId in skill.weaponAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {                   
                  if (!isNaN(skill.weaponAmmoCost[ammoId])) {
                     return true;
                  }
               }
            }
            for (var ammoId in skill.equipChargeAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {                   
                  if (!isNaN(skill.equipChargeAmmoCost[ammoId])) {
                     return true;
                  }
               }
            }
            for (var ammoId in skill.weaponChargeAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {                   
                  if (!isNaN(skill.weaponChargeAmmoCost[ammoId])) {
                     return true;
                  }
               }
            }
         }
      }
      return false;
   }
   Window_Base.prototype.drawActorAmmo = function(actor, x, y, width) {
      if (typeof actor._equips !== 'undefined') {
         if (actor._equips[0]._itemId > 0) {
            skill = $dataWeapons[ ( (typeof $dataWeapons[actor._equips[0]._itemId].baseItemId === 'undefined') ? actor._equips[0]._itemId : $dataWeapons[actor._equips[0]._itemId].baseItemId ) ];
            var dw = width;
            //---------------------------------------------------//
            // - Item Cost
            for (var ammoId in skill.itemAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) { 
                  var ammoCost = parseInt(skill.itemAmmoCost[ammoId]);               
                  this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
                  var text = (ammoCost <= 0) ? '' : 'x' + String( $gameParty.getItemAmount($dataItems[ammoId]) );
                  this.contents.fontSize = Unco.Param.ammoFontSize;
                  this.drawText(text, x, y, dw, 'right');
                  dw -= this.textWidth(text);
                  this.resetFontSettings();
                  if ($dataItems[ammoId].iconIndex > 0) {
                     var iw = x + dw - Window_Base._iconWidth;
                     this.drawIcon($dataItems[ammoId].iconIndex, iw, y + 2);
                     dw -= Window_Base._iconWidth + 2;
                  }
               }
            }
            //---------------------------------------------------//
            // - Armor Cost
            var zeroAmmo = false;
            for (var ammoId in skill.equipAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {
                  var ammoCost = parseInt(skill.equipAmmoCost[ammoId]);  
                  if (actor.hasArmor($dataArmors[ammoId])) {
                     this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
                     var text = (ammoCost <= 0) ? '' : 'x' + String( 1+$gameParty.getItemAmount($dataArmors[ammoId]) );
                     this.contents.fontSize = Unco.Param.ammoFontSize;
                     this.drawText(text, x, y, dw, 'right');
                     dw -= this.textWidth(text);
                     this.resetFontSettings();
                     if ($dataArmors[ammoId].iconIndex > 0) {
                        var iw = x + dw - Window_Base._iconWidth;
                        this.drawIcon($dataArmors[ammoId].iconIndex, iw, y + 2);
                        dw -= Window_Base._iconWidth + 2;
                     }
                     zeroAmmo = false;
                     break;
                  } else {
                     zeroAmmo = true;
                  }
               }
            }
            if (zeroAmmo === true) {
               this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
               var text = 'x0';
               this.contents.fontSize = Unco.Param.ammoFontSize;
               this.drawText(text, x, y, dw, 'right');
               dw -= this.textWidth(text);
               this.resetFontSettings();
               var iw = x + dw - Window_Base._iconWidth;
               this.drawIcon( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) , iw, y + 2);
               dw -= Window_Base._iconWidth + 2;
            }
            //---------------------------------------------------//
            // - Weapon Cost
            var zeroWeaponAmmo = false;
            for (var ammoId in skill.weaponAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {
                  var ammoCost = parseInt(skill.weaponAmmoCost[ammoId]);  
                  if (actor.hasWeapon($dataWeapons[ammoId])) {
                     this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
                     var text = (ammoCost <= 0) ? '' : 'x' + String( 1+$gameParty.getItemAmount($dataWeapons[ammoId]) );
                     this.contents.fontSize = Unco.Param.ammoFontSize;
                     this.drawText(text, x, y, dw, 'right');
                     dw -= this.textWidth(text);
                     this.resetFontSettings();
                     if ($dataWeapons[ammoId].iconIndex > 0) {
                        var iw = x + dw - Window_Base._iconWidth;
                        this.drawIcon($dataWeapons[ammoId].iconIndex, iw, y + 2);
                        dw -= Window_Base._iconWidth + 2;
                     }
                     zeroWeaponAmmo = false;
                     break;
                  } else {
                     zeroWeaponAmmo = true;
                  }
               }
            }
            if (zeroWeaponAmmo === true) {
               this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
               var text = 'x0';
               this.contents.fontSize = Unco.Param.ammoFontSize;
               this.drawText(text, x, y, dw, 'right');
               dw -= this.textWidth(text);
               this.resetFontSettings();
               var iw = x + dw - Window_Base._iconWidth;
               this.drawIcon( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) , iw, y + 2);
               dw -= Window_Base._iconWidth + 2;
            }
            //---------------------------------------------------//
            // - Charge Armor Cost
            var zeroChargeAmmo = false;
            for (var ammoId in skill.equipChargeAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {
                  var ammoCost = parseInt(skill.equipChargeAmmoCost[ammoId]);  
                  if (actor.hasArmor($dataArmors[ammoId])) {
                     this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
                     var text = (ammoCost <= 0) ? '' : 'x' + String( actor.getAmmoCurrentCharges($dataArmors[ammoId]) );
                     this.contents.fontSize = Unco.Param.ammoFontSize;
                     this.drawText(text, x, y, dw, 'right');
                     dw -= this.textWidth(text);
                     this.resetFontSettings();
                     if ($dataArmors[ammoId].iconIndex > 0) {
                        var iw = x + dw - Window_Base._iconWidth;
                        this.drawIcon($dataArmors[ammoId].iconIndex, iw, y + 2);
                        dw -= Window_Base._iconWidth + 2;
                     }
                     zeroChargeAmmo = false;
                     break;
                  } else {
                     zeroChargeAmmo = true;
                  }
               }
            }
            if (zeroChargeAmmo === true) {
               this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
               var text = 'x0';
               this.contents.fontSize = Unco.Param.ammoFontSize;
               this.drawText(text, x, y, dw, 'right');
               dw -= this.textWidth(text);
               this.resetFontSettings();
               var iw = x + dw - Window_Base._iconWidth;
               this.drawIcon( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) , iw, y + 2);
               dw -= Window_Base._iconWidth + 2;
            }
            //---------------------------------------------------//
            // - Charge Weapon Cost
            var zeroChargeWeaponAmmo = false;
            for (var ammoId in skill.weaponChargeAmmoCost) {
               var ammoId = parseInt(ammoId);
               if (!isNaN(ammoId) && (ammoId > 0)) {
                  var ammoCost = parseInt(skill.weaponChargeAmmoCost[ammoId]);  
                  if (actor.hasWeapon($dataWeapons[ammoId])) {
                     this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
                     var text = (ammoCost <= 0) ? '' : 'x' + String( actor.getAmmoCurrentCharges($dataWeapons[ammoId]) );
                     this.contents.fontSize = Unco.Param.ammoFontSize;
                     this.drawText(text, x, y, dw, 'right');
                     dw -= this.textWidth(text);
                     this.resetFontSettings();
                     if ($dataWeapons[ammoId].iconIndex > 0) {
                        var iw = x + dw - Window_Base._iconWidth;
                        this.drawIcon($dataWeapons[ammoId].iconIndex, iw, y + 2);
                        dw -= Window_Base._iconWidth + 2;
                     }
                     zeroChargeWeaponAmmo = false;
                     break;
                  } else {
                     zeroChargeWeaponAmmo = true;
                  }
               }
            }
            if (zeroChargeWeaponAmmo === true) {
               this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
               var text = 'x0';
               this.contents.fontSize = Unco.Param.ammoFontSize;
               this.drawText(text, x, y, dw, 'right');
               dw -= this.textWidth(text);
               this.resetFontSettings();
               var iw = x + dw - Window_Base._iconWidth;
               this.drawIcon( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) , iw, y + 2);
               dw -= Window_Base._iconWidth + 2;
            }
         }
      }
   };
   
//=============================================================================
// DataManager (again)
//=============================================================================
   Unco.AS.DataManager_processGSCNotetags1 = DataManager.processGSCNotetags1;
   DataManager.processGSCNotetags1 = function(group) {
     Unco.AS.DataManager_processGSCNotetags1.call(this,group);
     for (var n = 1; n < group.length; n++) {
       var obj = group[n];
       var notedata = obj.note.split(/[\r\n]+/);

       for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
           var gauge = parseInt(RegExp.$1);
           var text = String(RegExp.$2).toUpperCase();
           if (['AMMO'].contains(text)) {
             if (gauge === 1) obj.gauge1 = text;
             if (gauge === 2) obj.gauge2 = text;
             if (gauge === 3) obj.gauge3 = text;
           }
         }
       }
     }
   };
   Unco.AS.DataManager_processGSCNotetags2 = DataManager.processGSCNotetags2;
   DataManager.processGSCNotetags2 = function(group) {
     Unco.AS.DataManager_processGSCNotetags2.call(this,group);
     for (var n = 1; n < group.length; n++) {
       var obj = group[n];
       var notedata = obj.note.split(/[\r\n]+/);

       for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
           var gauge = parseInt(RegExp.$1);
           var text = String(RegExp.$2).toUpperCase();
           if (['AMMO'].contains(text)) {
             if (gauge === 1) obj.gauge1 = text;
             if (gauge === 2) obj.gauge2 = text;
             if (gauge === 3) obj.gauge3 = text;
           }
         }
       }
     }
   };
   
   Unco.AS.Window_Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
   Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
       if ((this.mustDrawActorAmmo(actor)) && (actor.gauge1() === 'AMMO')) {
       this.drawActorAmmo(actor, x, y, width);
       } else {
         Unco.AS.Window_Window_Base_drawActorHp.call(this, actor, x, y, width);
       }
   };
   
   Unco.AS.Window_Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
   Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
       if ((this.mustDrawActorAmmo(actor)) && (actor.gauge2() === 'AMMO')) {
         this.drawActorAmmo(actor, x, y, width);
       } else {
         Unco.AS.Window_Window_Base_drawActorMp.call(this, actor, x, y, width);
       }
   };
   
   Unco.AS.Window_Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
   Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
       if ((this.mustDrawActorAmmo(actor)) && (actor.gauge3() === 'AMMO')) {
       this.drawActorAmmo(actor, x, y, width);
       } else {
         Unco.AS.Window_Window_Base_drawActorTp.call(this, actor, x, y, width);
       }
   };
}

//-----------------------------------------------------------------------------
// Window_Base
//
// Draw item with charges.

Window_Base.prototype.drawItemName = function(item, x, y, width) {
   width = width || 312;
   if (item) {
      var iconBoxWidth = (Imported.YEP_CoreEngine === true) ? this.lineHeight() : (Window_Base._iconWidth + 4);
      var padding = (Imported.YEP_CoreEngine === true) ? ( (iconBoxWidth - Window_Base._iconWidth) / 2 ) : 2;
      this.resetTextColor();
      this.drawIcon(item.iconIndex, x + padding, y + padding);
      if (typeof item.ammoCurrentCharges !== 'undefined') {
         this.changeTextColor(this.textColor(Unco.Param.ammoFontColor));
         this.contents.fontSize = Unco.Param.ammoFontSize;
         this.drawText( String( item.ammoCurrentCharges ) , x + padding ,  y + padding , Window_Base._iconWidth , 'center');
         this.resetTextColor();
         this.resetFontSettings();
      }
      this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
   }
};

//-----------------------------------------------------------------------------
// Window_Ammo
//
// The window for displaying the ammunition amount for attack action.

function Window_Ammo() {
    this.initialize.apply(this, arguments);
}

Window_Ammo.prototype = Object.create(Window_Base.prototype);
Window_Ammo.prototype.constructor = Window_Ammo;

Window_Ammo.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    var y = Graphics.height-this.fittingHeight(6);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};

Window_Ammo.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_Ammo.prototype.clear = function() {
    this.setText('');
};


Window_Ammo.prototype.setItem = function(actor,item) {
   var text = '';
   if (typeof item !== 'undefined') {
      if ((DataManager.isSkill(item)) && (Unco.Param.showAmmoLeftInDesc === 'true')) {
         var skill = item;
         if (skill.id === actor.attackSkillId()) {
			if ( !Unco.AS.hasAmmoCost(skill) ) {
               if (typeof actor._equips !== 'undefined') {
                  if (actor._equips[0]._itemId > 0) {
                     skill = $dataWeapons[ ( (typeof $dataWeapons[actor._equips[0]._itemId].baseItemId === 'undefined') ? actor._equips[0]._itemId : $dataWeapons[actor._equips[0]._itemId].baseItemId ) ];
                  }
               }
			}
         }
         //---------------------------------------------------//
         // - Item Cost
         var withAmmo = false;
         for (var ammoId in skill.itemAmmoCost) {
            var cost = skill.itemAmmoCost[ammoId];
            ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0) && !isNaN(cost)) {
               var cost = parseInt(cost);
               var itemOwned = ($gameParty.getItemAmount($dataItems[ammoId]) > 0);
               text = text + '\\i[' + String($dataItems[ammoId].iconIndex) + ']';
               text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataItems[ammoId].name + ' ' );
               text = text + ( ((cost <= 0) && itemOwned) ? '' : ( 'x' + String( $gameParty.getItemAmount($dataItems[ammoId]) ) )  );
               withAmmo = true;
            }
         }
         //---------------------------------------------------//
         // - Armor Cost
         var zeroEquipAmmo = false;
         for (var ammoId in skill.equipAmmoCost) {
            var cost = skill.equipAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0)) {
               cost = parseInt(cost);
               withAmmo = true;
               if (actor.hasArmor($dataArmors[ammoId])) {
                  text = text + '\\i[' + String($dataArmors[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataArmors[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( 1 + $gameParty.getItemAmount($dataArmors[ammoId]) )  );
                  text = text + ( (typeof $dataArmors[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataArmors[ammoId].ammoDesc + ')' );
                  zeroEquipAmmo = false;
                  break;
               } else {
                  zeroEquipAmmo = true;
               }
            }
         }
         if (zeroEquipAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Weapon Cost
         var zeroWeaponAmmo = false;
         for (var ammoId in skill.weaponAmmoCost) {
            var cost = skill.weaponAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0)) {
               cost = parseInt(cost);
               withAmmo = true;
               if (actor.hasWeapon($dataWeapons[ammoId])) {
                  text = text + '\\i[' + String($dataWeapons[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataWeapons[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( 1 + $gameParty.getItemAmount($dataWeapons[ammoId]) )  );
                  text = text + ( (typeof $dataWeapons[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataWeapons[ammoId].ammoDesc + ')' );
                  zeroWeaponAmmo = false;
                  break;
               } else {
                  zeroWeaponAmmo = true;
               }
            }
         }
         if (zeroWeaponAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Charge Armor Cost
         var zeroChargeEquipAmmo = false;
         for (var ammoId in skill.equipChargeAmmoCost) {
            var cost = skill.equipChargeAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0)) {
               cost = parseInt(cost);
               withAmmo = true;
               if (actor.hasArmor($dataArmors[ammoId])) {
                  text = text + '\\i[' + String($dataArmors[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataArmors[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( actor.getAmmoCurrentCharges($dataArmors[ammoId]) )  );
                  text = text + ( (typeof $dataArmors[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataArmors[ammoId].ammoDesc + ')' );
                  zeroChargeEquipAmmo = false;
                  break;
               } else {
                  zeroChargeEquipAmmo = true;
               }
            }
         }
         if (zeroChargeEquipAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         //---------------------------------------------------//
         // - Charge Weapon Cost
         var zeroChargeWeaponAmmo = false;
         for (var ammoId in skill.weaponChargeAmmoCost) {
            var cost = skill.weaponChargeAmmoCost[ammoId];
            var ammoId = parseInt(ammoId);
            if (!isNaN(ammoId) && (ammoId > 0)) {
               cost = parseInt(cost);
               withAmmo = true;
               if (actor.hasWeapon($dataWeapons[ammoId])) {
                  text = text + '\\i[' + String($dataWeapons[ammoId].iconIndex) + ']';
                  text = text + ( (typeof skill.showAmmoName === 'undefined') ? '' : $dataWeapons[ammoId].name + ' ' );
                  text = text + ( (cost <= 0) ? '' : 'x' + String( actor.getAmmoCurrentCharges($dataWeapons[ammoId]) )  );
                  text = text + ( (typeof $dataWeapons[ammoId].ammoDesc === 'undefined') ? '' : '(' + $dataWeapons[ammoId].ammoDesc + ')' );
                  zeroChargeWeaponAmmo = false;
                  break;
               } else {
                  zeroChargeWeaponAmmo = true;
               }
            }
         }
         if (zeroChargeWeaponAmmo === true) text = text + '\\i[' + String( ( (skill.noAmmoIconId) ? skill.noAmmoIconId : Unco.Param.defaultNoAmmoIconId ) ) + ']x0';
         
         if (withAmmo === true) text = ( (typeof skill.ammoText !== 'undefined') ? skill.ammoText : Unco.Param.descAmmoLeftText) + ' : ' + text;
      }
   }
   if (text !== '') {
      this.setText(item ? text : '');
      this.show();
   }
};

Window_Ammo.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Unco.AS.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    Unco.AS.Scene_Battle_createAllWindows.call(this);
    this.createAmmoWindow();
};

Scene_Battle.prototype.createAmmoWindow = function() {
    this._ammoWindow = new Window_Ammo();
    this._ammoWindow.visible = false;
    this.addWindow(this._ammoWindow);
};

Scene_Battle.prototype.showAmmoWindow = function() {
  if (Unco.Param.showAmmoLeftActorCommand === 'true') this._ammoWindow.setItem(BattleManager.actor(),$dataSkills[BattleManager.actor().attackSkillId()]);
};

Unco.AS.Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    this._ammoWindow.hide();
    Unco.AS.Scene_Battle_onSelectAction.call(this);
};

Unco.AS.Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack = function() {
   this._ammoWindow.hide();
   Unco.AS.Scene_Battle_commandAttack.call(this);
};
Unco.AS.Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
   this._ammoWindow.hide();
   Unco.AS.Scene_Battle_commandSkill.call(this);
};
Unco.AS.Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
Scene_Battle.prototype.commandGuard = function() {
   this._ammoWindow.hide();
   Unco.AS.Scene_Battle_commandGuard.call(this);
};
Unco.AS.Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
   this._ammoWindow.hide();
   Unco.AS.Scene_Battle_commandItem.call(this);
};
Unco.AS.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
   this.showAmmoWindow();
   Unco.AS.Scene_Battle_startActorCommandSelection.call(this);
};
Unco.AS.Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
   this.showAmmoWindow();
   Unco.AS.Scene_Battle_onSkillCancel.call(this);
};
Unco.AS.Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
   this.showAmmoWindow();
   Unco.AS.Scene_Battle_onItemCancel.call(this);
};
Unco.AS.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
   if (this._actorCommandWindow.currentSymbol() === 'attack') {
      this.showAmmoWindow();
   }
   Unco.AS.Scene_Battle_onEnemyCancel.call(this);
};