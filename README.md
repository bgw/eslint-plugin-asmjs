# eslint-plugin-asmjs

asm.js validation for ESLint

asm.js has performance benefits over vanilla JS in many browsers. However,
invalid asm.js code may be interpreted as normal JS, causing a hard-to-identify
deoptimization. This helps identify those cases in hand-written asm.js code that
may be intertwined with your normal JS.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-asmjs`:

```
$ npm install eslint-plugin-asmjs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must
also install `eslint-plugin-asmjs` globally.

## Usage

Add `asmjs` to the plugins section of your `.eslintrc` configuration file. You
can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "asmjs"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "asmjs/asmjs": 2
    }
}
```

## Supported Rules

* [`asmjs`](docs/rules/asmjs.md): Uses the [official asm.js validator][official]
  to verify any function with a `"use asm"` directive.

[official]: https://github.com/dherman/asm.js/

## Known Limitations

* The official validator has no error recovery, so this only returns one error
  at a time.
* Mixing this rule with certain other eslint rules, such as
  [`no-bitwise`][no-bitwise] may cause conflicts.

[no-bitwise]: http://eslint.org/docs/rules/no-bitwise
