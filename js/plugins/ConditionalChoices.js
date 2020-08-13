/*:
 * @plugindesc Allows better control of Show Choices options. Version 0.2
 * @author Reashu
 * Version 0.1 (2016 Feb 21): Initial release
 * Version 0.2 (2016 Apr 12): Fixed an issue which caused conditions after the
 *                            first one in any given choice to be ignored
 *
 *
 * @param Default fallback
 * @desc Fallback when the "default" choice is hidden and no priorities are set. 'none', 'first', 'last', or 'smart'.
 * @default smart
 *
 * @param Cancel fallback
 * @desc Fallback when the "cancel" choice is hidden and no priorities are set. 'none', 'first', 'last', or 'smart'.
 * @default smart
 *
 * @help
 * Allows the use of tags in the "Show choices" command which control the
 * visibility of options.
 *
 * Examples:
 * - [cc:S1]     Show this option only if switch 1 is on
 * - [cc:S1=S2]  Show this option only if switch 1 is the same as switch 2
 * - [cc:S4=off] Show this option only if switch 4 is off
 * - [cc:SB]     Show this option only if self-switch B in on
 * - [cc:V5]     Show this option only if variable 5 is greater than 0
 * - [cc:V1=2]   Show this option only if variable 1 is 2
 * - [cc:V1>3]   Show this option only if variable 1 is greater than 3
 * - [cc:V5!V6]  Show this option only if variable 5 is different from variable 6
 * - [cc:D1]     Use this as the default option, even if one is set in the editor
 * - [cc:D2]     As above, but D1 will take priority if it is visible
 * - [cc:C1]     Use this as the cancel option, even if one is set in the editor
 * - [cc:C2]     As above, but C1 will take priority if it is visible
 *
 * Default and Cancel options
 *  The RPG Maker MV editor allows you to select a single default option and a
 *  cancel option (you can also select no default option, and either disallow
 *  canceling or use a completely separate branch). This does not account for
 *  cases when the default option is hidden, or (worse) when the cancel option is
 *  hidden.
 *
 *  This plugin allows you to specify a default and cancel 'priority' for each
 *  choice. Even if you have set a default (or cancel) choice with the editor,
 *  these priorities will override that setting. If you want to have no default
 *  option, or disallow (or use a separate branch) for cancels, then avoid
 *  setting these custom priorities.
 *
 *  To set a default priority, add the tag [cc:DX] (where X is a number) to the
 *  choice text. The visible choice with the lowest number will be the one
 *  selected by default. If there are no priorities set, then the choice set in
 *  the editor will be used. If that choice is hidden, the fallback (see below)
 *  will be used. If there are no priorities set and the editor is set to
 *  "no default", the fallback will not be used and no default will be shown.
 *
 *  To set a cancel priority, add the tag [cc:CX] (where X is a number) to the
 *  choice text. The visible choice with the lowest number will be the one
 *  used for cancels. If there are no priorities set, then the choice set in
 *  the editor will be used. If that choice is hidden, the fallback (see below)
 *  will be used. If there are no priorities set and the editor is set to
 *  "disallow cancel", the fallback will not be used and cancels will be
 *  disallowed. If there are no priorites set and the editor is set to
 *  "separate branch", a separate branch will be used.
 *
 *  The choice set in the dialog will always be overridden by priorities, if
 *  priorities have been used! Even if all choices with priorities have been
 *  hidden, the choice made in the editor will be completely disregarded.
 *
 * Fallback options:
 * The fallback option is only used if the dialog was expected to have a
 * default or cancel option, but all candidates are hidden. If no option was
 * selected in the editor and no priorities were set with tags, the fallbacks
 * will not be used.
 *
 * The following alternatives exist for both fallback options:
 * - none:  Do not select a new default / cancel option. Show no default /
 *          disallow cancels.
 * - first: Select the first option as default / cancel.
 * - last:  Select the last option as default / cancel.
 * - smart: If priorities were set (but all those options are hidden) this acts
 *          as 'none'. If no priorities were set (but an option was selected in
 *          the editor) then do the following: If the first option was selected,
 *          (but hidden), then use the first visible option. If the last option
 *          was selected (but hidden), then use the last visible option.
 *          Otherwise act as 'none'.
 *
 * Tag structure reference (you shouldn't have to read this):
 * - Tag         -> Open Command Close
 * - Open        -> [cc:
 * - Close       -> ]
 * - Command     -> Check | Default | Cancel
 * - Default     -> D1, D2, D3, etc. to indicate priority for being the default
 *                  (lowest visible number will be default)
 * - Cancel      -> C1, C2, C3, etc. to indicate priority for being cancel option
 *                  (lowest visible number will be used)
 * - Check       -> Scheck | Vcheck
 * - Scheck      -> Switch Ospredicate
 * - Vcheck      -> Variable Ovpredicate
 * - Ospredicate -> Spredicate | ^
 * - Ovpredicate -> Vpredicate | ^
 * - Spredicate  -> Soperator Svalue
 * - Vpredicate  -> Voperator Vvalue
 * - Soperator   -> = | !
 * - Voperator   -> = | > | < | >= | <= | !
 * - Svalue      -> Switch | on | off
 * - Vvalue      -> Variable | numeric value
 * - Switch      -> S1, S2, S3, SA, etc. to identify switches or self-switches
 * - Variable    -> V1, V2, etc. to represent variables 1 and 2 respectively
 */
(function() {
  var parameters = PluginManager.parameters('ConditionalChoices');
  var defaultFallback = String(parameters['Default fallback'] || 'smart');
  if (['none', 'first', 'smart'].indexOf(defaultFallback) < 0) {
    throw "Unknown parameter given for ConditionalChoices - Default fallback. Allowed values are 'none', 'first', and 'smart'.";
  }

  var cancelFallback = String(parameters['Cancel fallback'] || 'smart');
  if (['none', 'first', 'last', 'smart'].indexOf(defaultFallback) < 0) {
    throw "Unknown parameter given for ConditionalChoices - Cancel fallback. Allowed values are 'none', 'first', 'last', and 'smart'.";
  }

  var _Game_Message_setChoices = Game_Message.prototype.setChoices;
  var _Game_Message_setChoiceCallback = Game_Message.prototype.setChoiceCallback;

  /*
   * choices: Array of strings, each representing a choice
   * defaultType: -1: no default
   *               n: select the n:th option upon opening the choice window
   * cancelType: -2: use a separate branch for cancels
   *             -1: disallow cancel
   *              n: treat cancels as the n:th option
   */
  Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
    var parsedChoices = parseChoices(choices);
    var shownChoices = [];
    var newDefault = -1;
    var newCancel = -1;

    var shownToOriginal = [];
    var originalToShown = [];

    // Select which choices should be shown
    for (var i = 0; i < parsedChoices.length; i++) {
      if (parsedChoices[i].visible) {
        shownChoices.push(parsedChoices[i]);
        shownToOriginal.push(i);
        originalToShown.push(shownChoices.length - 1);
      } else {
        originalToShown.push(-1);
      }
    }

    var choiceTexts = shownChoices.map(function(choice) { return choice.text });
    var newDefault = getAutoIndex(parsedChoices, shownChoices, 'defaultPriority', defaultType, defaultFallback, originalToShown);
    var newCancel = getAutoIndex(parsedChoices, shownChoices, 'cancelPriority', cancelType, cancelFallback, originalToShown);

    this.originalChoiceIndices = shownToOriginal;
    _Game_Message_setChoices.call(this, choiceTexts, newDefault, newCancel);
  }

  // Gets the index of a choice to use for an auto-action (default selection or
  // canceling)
  function getAutoIndex(parsedChoices, shownChoices, priorityName, originalIndex, fallbackStrategy, originalToShown) {
    var bestPriorityIndex = findBestPriority(shownChoices, priorityName);
    if (bestPriorityIndex >= 0) {
      return bestPriorityIndex;
    }

    var prioritiesSet = anyPrioritiesSet(parsedChoices, priorityName)
    if (!prioritiesSet && originalIndex >= 0) {
      var newLocationOfOriginalIndex = originalToShown[originalIndex];
      if (newLocationOfOriginalIndex >= 0) {
        return newLocationOfOriginalIndex;
      }
    }

    switch (fallbackStrategy) {
    case 'none':
      return -1;
    case 'first':
      return 0;
    case 'last':
      return shownChoices.length;
    case 'smart':
      if (anyPrioritiesSet) {
        return -1;
      } else if (originalIndex === 0) {
        return 0;
      } else if (originalIndex === parsedChoices.length - 1) {
        return shownChoices.length - 1;
      } else {
        return -1;
      }
    }
  }

  /*
   * Find the choice with the lowest priority of the given type and returns
   * its index in the list.
   */
  function findBestPriority(objects, priorityName) {
    var lowest = Number.MAX_SAFE_INTEGER;
    var lowestIndex = -1;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i][priorityName] < lowest) {
        lowestIndex = i;
      }
    }
    return lowestIndex;
  }

  /*
   * Checks if any priorities of the given type have been set
   */
  function anyPrioritiesSet(objects, priorityName) {
    return objects.some(function(object) {
      return object[priorityName] < Number.MAX_SAFE_INTEGER;
    });
  }

  /*
   * callback: a function to be called when a selection is made
   */
  Game_Message.prototype.setChoiceCallback = function(callback) {
    /*
     * selectedIndex: the index of the selected option (-1 = cancel)
     */
    var callbackAdapter = function(selectedIndex) {
      if (selectedIndex >= 0) {
        // If an option was selected, transform the updated option index back to
        // the original one
        var originalChoiceIndex = this.originalChoiceIndices[selectedIndex];
        callback(originalChoiceIndex);
      } else {
        // If cancel branch, proceed as normal
        callback(selectedIndex);
      }
    }
    _Game_Message_setChoiceCallback.call(this, callbackAdapter);
  };

  /*
   * Parses all choice texts and returns a structured representation of them
   */
  function parseChoices(choiceTexts) {
    return choiceTexts.map(parseChoice);
  }

  /*
   * Parses a single choice text into a structure representation
   */
  function parseChoice(choiceText) {
    return {
      visible: evaluateVisibility(choiceText),
      defaultPriority: evaluateDefaultPriority(choiceText),
      cancelPriority: evaluateCancelPriority(choiceText),
      text: trimTags(choiceText)
    }
  }

  /*
   * Given the text of a choice, checks if it is allowed or should be removed
   */
  function evaluateVisibility(choice) {
    var conditions = parseConditions(choice);
    console.log("Conditions: ");
    console.log(conditions);
    //conditions.each(function(condition){console.log(evaluateCondition(condition));});

    return conditions.every(evaluateCondition);
  }

  /*
   * Finds any default-priority tag in the given choice and returns its value
   */
  function evaluateDefaultPriority(choice) {
    var priorityStr = /\[cc:d(\d+)\]/i.exec(choice);
    if (priorityStr) {
      return parseInt(priorityStr[1]);
    } else {
      return Number.MAX_SAFE_INTEGER;
    }
  }

  /*
   * Finds any cancel-priority tag in the given choice and returns its value
   */
  function evaluateCancelPriority(choice) {
    var priorityStr = /\[cc:c(\d+)\]/i.exec(choice);
    if (priorityStr) {
      return parseInt(priorityStr[1]);
    } else {
      return Number.MAX_SAFE_INTEGER;
    }
  }

  /*
   * Parses a choice and returns all of its conditions
   */
  function parseConditions(choice) {
    var conditionStrs = choice.match(/\[cc:(?:S|V).+?\]/ig) || [];
    return conditionStrs.map(parseCondition);
  }

  /*
   * Parses a single condition tag
   */
  function parseCondition(conditionStr) {
    return conditionStr.match(/\[cc:((?:S|V).+?)\]/i)[1];
  }

  /*
   * Evaluates a condition tag
   */
  function evaluateCondition(conditionStr) {
    var match = conditionStr.match(/^(S\d+|S[ABCD]|V\d+)(?:(=|!|>|<|>=|<=)(S\d+|S[ABCD]|V\d+|on|off|\d+))?$/i);
    if (match[1] && match[2] && match[3]) {
      // We have a full condition with a subject, operator and object
      var operatorFunction = operators[match[2]];
      var lValue = evaluateValue(match[1]);
      var rValue = evaluateValue(match[3]);
      return operatorFunction(lValue, rValue);
    } else if (match[1] && match[2] === undefined && match[3] === undefined) {
      // We have a simple condition with only a subject
      var value = evaluateValue(match[1]);
      if (typeof value === 'number') {
        return value > 0;
      } else {
        return value;
      }
    } else {
      // We have a malformed condition
      throw "ConditionalChoices: Malformed condition " + conditionStr;
    }
  }

  var operators = {
    '=': function(left, right) {
      return left === right;
    },
    '!': function(left, right) {
      return left !== right;
    },
    '>': function(left, right) {
      return left > right;
    },
    '<': function(left, right) {
      return left < right;
    },
    '>=': function(left, right) {
      return left >= right;
    },
    '<=': function(left, right) {
      return left <= right;
    }
  };

  /*
   * Evaluates a string such as 'V2' (variable 2), 'SC' (self-switch C),
   * 'on' (true) or '8' (8) and returns the result. Used to parse tags.
   */
  function evaluateValue(value) {
    value = value.toLowerCase();
    if (value === 'on') {
      return true;
    } else if (value === 'off') {
      return false;
    } else if (value.startsWith('v')) {
      return $gameVariables.value(parseInt(value.substring(1)));
    } else if (value.startsWith('s')) {
      var selfSwitchIndex = ['a', 'b', 'c', 'd'].indexOf(value[1]);
      if (selfSwitchIndex >= 0) {
        return $gameSelfSwitches.value([$gameMap._mapId, $gameMap._interpreter._eventId, value[1].toUpperCase()]);
      } else {
        return $gameSwitches.value(parseInt(value.substring(1)));
      }
    } else {
      return parseInt(value);
    }
  }

  /*
   * Given the text of a choice, trims all conditional tags from it, returning
   * the text to be displayed
   */
  function trimTags(choice) {
    return choice.replace(/\[cc:.+?\]/g, '');
  }
})();
