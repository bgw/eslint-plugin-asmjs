# Find all asm.js modules and validate them (asmjs)

asm.js has performance benefits over vanilla JS in many browsers. However,
invalid asm.js code may be interpreted as normal JS, causing a hard-to-identify
deoptimization. This helps identify those cases in hand-written asm.js code that
may be intertwined with your normal JS.

## Rule Details

This rule aims to find invalid asm.js in hand-written asm.js code.

The following patterns are considered warnings:

```js
function Module(foo) { 'use asm'; }
// missing return value
```

The following patterns are not warnings:

```js
function NotAModule(foo) { }

function GeometricMean(stdlib, foreign, buffer) {
  "use asm";

  var exp = stdlib.Math.exp;
  var log = stdlib.Math.log;
  var values = new stdlib.Float64Array(buffer);

  function logSum(start, end) {
    start = start|0;
    end = end|0;

    var sum = 0.0, p = 0, q = 0;

    // asm.js forces byte addressing of the heap by requiring shifting by 3
    for (p = start << 3, q = end << 3; (p|0) < (q|0); p = (p + 8)|0) {
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
```

## When Not To Use It

Don't use this if you don't use asm.js, or if you're just calling into imported
or compiled asm.js code.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
