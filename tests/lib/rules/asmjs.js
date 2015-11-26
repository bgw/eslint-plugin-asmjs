/**
 * @fileoverview Find all asm.js modules and validate them
 * @author Benjamin Woodruff
 * @copyright 2015 Benjamin Woodruff. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/asmjs"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("asmjs", rule, {

    valid: [
        "function NotAModule(foo) { }",
        `
            function GeometricMean(stdlib, foreign, buffer) {
                "use asm";

                var exp = stdlib.Math.exp;
                var log = stdlib.Math.log;
                var values = new stdlib.Float64Array(buffer);

                function logSum(start, end) {
                    start = start|0;
                    end = end|0;

                    var sum = 0.0, p = 0, q = 0;

                    // asm.js forces byte addressing of the heap by requiring
                    // shifting by 3
                    for (p = start << 3, q = end << 3;
                            (p|0) < (q|0);
                            p = (p + 8)|0) {
                        sum = sum + +log(values[p>>3]);
                    }

                    return +sum;
                }

                function geometricMean(start, end) {
                    start = start|0;
                    end = end|0;

                    return +exp(+logSum(start, end) / +((end - start)|0));
                }

                return { geometricMean: geometricMean };
            }
        `
    ],

    invalid: [
        {
            code: "function Module(foo) { 'use asm'; }",
            errors: [{
                message: "expected single exports declaration, got 0 " +
                    "ReturnStatement nodes"
            }]
        }
    ]
});
