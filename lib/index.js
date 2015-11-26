/**
 * @fileoverview asm.js validation for ESLint
 * @author Benjamin Woodruff
 * @copyright 2015 Benjamin Woodruff. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex("./rules");
