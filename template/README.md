# {{title}} [<img src="https://jonathantneal.github.io/stylelint-logo.svg" alt="stylelint" width="90" height="90" align="right">][stylelint]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[{{title}}] is a [stylelint] rule to.

## Usage

Add [stylelint] and [{{title}}] to your project.

```bash
npm install stylelint {{id}} --save-dev
```

Add [{{title}}] to your [stylelint configuration].

```js
{
  "plugins": [
    "{{id}}"
  ],
  "rules": {
    "{{user}}/{{id}}": "always" || "never" || "ignore"
  }
}
```

## Options

### always

If the first option is `"always"` or `true`, then [{{title}}] requires all
nodes to be linted, and the following patterns are _not_ considered violations:

```pcss
.example {}
```

While the following patterns are considered violations:

```pcss
.example {}
```

### never

If the first option is `"never"` or `false`, then [{{title}}] requires all 
nodes to be linted, and the following patterns are _not_ considered
violations:

```pcss
.example {}
```

While the following patterns are considered violations:

```pcss
.example {}
```

### ignore

If the first option is `"ignore"` or `null`, then [{{title}}] does nothing.

[cli-img]: https://img.shields.io/travis/{{user}}/{{id}}.svg
[cli-url]: https://travis-ci.org/{{user}}/{{id}}
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/stylelint/stylelint
[npm-img]: https://img.shields.io/npm/v/{{id}}.svg
[npm-url]: https://www.npmjs.com/package/{{id}}

[stylelint]: https://github.com/stylelint/stylelint
[stylelint configuration]: https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#readme
[{{title}}]: https://github.com/{{user}}/{{id}}
