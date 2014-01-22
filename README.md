# Watcher.js

A build watcher for component. [component(1)](https://github.com/component/component) will integrate a lot of these features once they are stable. You are expected to fork this if you want your own watcher or builder - do not expect every possible option.
There are just too many.

![](http://i.imgur.com/YHR3m0F.png)

Features:

- Watches for file changes in the component's paths and automatically build.
- Automatically installs all the dependencies.
- Build without re-resolving.
- Build just your JS or CSS depending on the file changed.
- Check if your dependencies are outdated.
- Update and/or your outdated dependencies.

Notes:

- Probably only works on UNIX.
- Only works with local components in paths right now.
- File builder is not yet implemented (which extensions do we watch?).
- Implements the newer component spec, so change your `local` to `locals`.

## Usage

You probably want to fork this. In particular, you probably want a builder specific to an app. Fork this repo and set it as a dependency in your `package.json`. Don't bother publishing or versioning it:

```js
{
  "devDependencies": {
    "component-watcher": "jonathanong/watcher.js"
  }
}
```

```bash
npm install
```

It's now a dependency, now run it with:

```
node --harmony-generators ./node_modules/component-watcher
```

Note that it's not a binary yet. You also have to run it with `--harmony-generators` for now.

### config.json

See the included `config.json` file. Some configurations are set in this file. You can also specify your own file with the environmental variable `COMPONENT_WATCHER_CONFIG` (suggest a better name!).

Some options:

- `fields` - the fields to download. By default, it downloads all the fields in the spec.
- `extensions` - extensions to watch on a per-builder basis.
- `options` - various options for the resolver and builders.

However, not every option can be set here. For example, using rework with whichever plugins you'd like will require you to fork this repo and edit your own JS.

### CLI

You can enter stuff into the watch process. Here are some commands:

- `update` - update all pinned dependencies
- `pin` - update and pin all dependencies (including semver ranges)
- `outdated` - check for outdated dependencies
- `resolve` - resolve and build
- `scripts` - build the scripts
- `styles` - build the styles
- `files` - copy/symlink the files

If you just want to build everything, just add a `--kill` option when you start it:

```
node --harmony-generators ./node_modules/component-watcher --kill
```

### Testing

```
npm i
npm start
```

Then touch all the local components in `test/` like your spouse.

Please don't pin and update components in the `test/` directory!

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
