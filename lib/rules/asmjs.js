/**
 * @fileoverview Find all asm.js modules and validate them
 * @author Benjamin Woodruff
 * @copyright 2015 Benjamin Woodruff. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

var asm = require("asm.js");
var cloneDeep = require("lodash.clonedeep");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Handler for both FunctionExpression and FunctionDeclaration. Runs
     * `asm.validateAst`, and transforms the result.
     *
     * @param {(FunctionExpression|FunctionDeclaration)} node
     *        The function ast node to process
     * @returns {undefined}
     */
    function processFunction(node) {
        if (node.body.type === "BlockStatement" &&
            node.body.body.length > 0 &&
            node.body.body[0].type === "ExpressionStatement" &&
            node.body.body[0].expression.type === "Literal" &&
            node.body.body[0].expression.value === "use asm") {

            try {
                // validateAst may mutate the AST, which is disallowed in ESLint
                asm.validateAst(cloneDeep(node));
            } catch (ex) {
                if (!(ex instanceof asm.ValidationError)) {
                    throw ex;
                }
                context.report({
                    node: node,
                    message: ex.message.replace(/ at \d+:\d+-\d+:\d+$/, ""),
                    loc: ex.loc.start
                });
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        FunctionExpression: processFunction,
        FunctionDeclaration: processFunction
    };

};

module.exports.schema = [];
