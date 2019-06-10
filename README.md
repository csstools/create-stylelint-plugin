# Create Stylelint Plugin [<img src="https://jonneal.dev/stylelint-logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Gitter Chat][git-img]][git-url]

[Create Stylelint Plugin] lets you quickly create new [stylelint] plugins.

```sh
npm init stylelint-plugin YOUR_DESTINATION
```

Alternatively, you can use the `npx` command:

```sh
npx create-stylelint-plugin YOUR_DESTINATION
```

After completing the instructions, write your plugin to `src/index.js` and
update `README.md` with further details outlining your plugin functionality.

## Usage

By default, **Create PostCSS Plugin** provides you the following prompts:

```
Plugin Name: [TITLE]
Keywords: [KEYWORDS]
```

Once completed, you will see the following message:

```
Success! Created PostCSS [TITLE] at [DIRECTORY]

We suggest that you begin by typing:
  cd [DIRECTORY]
  npm test

Happy PostCSS-ing!
```

To skip all prompts, you must at least provide a title and keywords.

```sh
create-stylelint-plugin --title Stuff --keywords comma,separated,keywords
```

If your system cannot access git user information from `.gitconfig`, you must
also provide an author, email, and user.

```sh
create-stylelint-plugin --title Stuff --author "Cee S Esse" --email "stylelint@stylelint.org" --user ceesesse --keywords comma,separated,keywords
```

[create-stylelint-plugin]: https://github.com/csstools/create-stylelint-plugin
[stylelint]: https://github.com/stylelint/stylelint
