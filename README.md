ML 4th Year Project
===================

Visualisations for linear classifiers.

![image](http://i.imgur.com/IP13hkl.png)


Dev
---

Install dependencies:

    npm install

Scripts are combined using webpack and a served to <http://localhost:3000/> using a live-reload server.  To fire this up, run

    npm start

Language gotchas
----------------

Source files with a `.jsx` extension are ES6 Javascript with Facebook [JSX][1] and Flow [type annotations][2].
Source files with a `.cjsx` extension are CoffeeScript, also with inline JSX.
Webpack compiles all of these nicely for us.

There are no styles yet, although [webpack.config.js][3] has commented out support for these.

Extra build tools
-----------------

### flow ###

Facebook Flow typechecks all files with a `/* @flow */` header.  Install flow seperately, then run `flow` to start a server in the background.
After saving changes to a file, another call to `flow` will typecheck the entire codebase (hopefully reporting `No errors!`).

Run `flow stop` to kill the server. (The server sometimes freaks out when switching branches)

### jshint & jscs ###

Keep both running in the background with:

    npm run watch

JSHint statically analyses code. It enforces some savage requirements, e.g. maximum of 10 statements per function.  This greatly improves
code readability.  Run it once with `npm run jshint`

JSCS is a code-style checker.  It enforces things like spaces around binary operators etc.  Run it once with `npm run jscs`.


Old versions
------------

![old](http://i.imgur.com/8EmBDZa.png)


![older](http://i.imgur.com/qutfFK0.png)

This 'dot' visualisation is found in the `ObjectiveFunctionVis.cjsx` class.  I never bothered to translate it to flow-typed ES6.

![oldest](http://i.imgur.com/BDOsar4.png)



[1]: http://facebook.github.io/react/
[2]: http://flowtype.org/
[3]: ./webpack.config.js