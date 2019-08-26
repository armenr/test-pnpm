## Testing PNPM VS NPM

To duplicate the issue, this repository requires a globally-installed pino-syslog package.

pnpm install wasn't working

--shamefully-flatten wasn't producing working results

npm & yarn installs were working

_______

## Problems

### First problem

PNPM will throw the following:

```
➜ pnpm run start

> test-pnpm@1.0.0 start /Users/armenr/Desktop/test-pnpm
> node server.js | pino-syslog

internal/modules/cjs/loader.js:775
    throw err;
    ^

Error: Cannot find module 'attempt-x'
Require stack:
- /Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/index-of-x/2.3.0/node_modules/index-of-x/index.js
- /Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/inspect-x/1.9.1/node_modules/inspect-x/index.js
- /Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/util-format-x/1.3.0/node_modules/util-format-x/index.js
- /Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/axe/3.1.9/node_modules/axe/lib/index.js
- /Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/cabin/4.0.0/node_modules/cabin/lib/index.js
- /Users/armenr/Desktop/test-pnpm/server.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:772:15)
    at Function.Module._load (internal/modules/cjs/loader.js:677:27)
    at Module.require (internal/modules/cjs/loader.js:830:19)
    at require (internal/modules/cjs/helpers.js:68:18)
    at Object.<anonymous> (/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/index-of-x/2.3.0/node_modules/index-of-x/index.js:26:17)
    at Module._compile (internal/modules/cjs/loader.js:936:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Module.require (internal/modules/cjs/loader.js:830:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/index-of-x/2.3.0/node_modules/index-of-x/index.js',
    '/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/inspect-x/1.9.1/node_modules/inspect-x/index.js',
    '/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/util-format-x/1.3.0/node_modules/util-format-x/index.js',
    '/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/axe/3.1.9/node_modules/axe/lib/index.js',
    '/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/cabin/4.0.0/node_modules/cabin/lib/index.js',
    '/Users/armenr/Desktop/test-pnpm/server.js'
  ]
}
```

...so, go ahead and `pnpm install attempt-x` and try to run again.

Now, you'll run into problem 2.

_______

### Second Problem

```
~/Desktop/test-pnpm is 📦 v1.0.0 via ⬢ v12.9.1 took 2s
➜ pnpm run start

> test-pnpm@1.0.0 start /Users/armenr/Desktop/test-pnpm
> node server.js | pino-syslog

/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/index-of-x/2.3.0/node_modules/index-of-x/index.js:27
  var res = attempt.call([0, 1], pIndexOf, 1, 2);
                    ^

TypeError: attempt.call is not a function
    at Object.<anonymous> (/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/index-of-x/2.3.0/node_modules/index-of-x/index.js:27:21)
    at Module._compile (internal/modules/cjs/loader.js:936:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)
    at Module.load (internal/modules/cjs/loader.js:790:32)
    at Function.Module._load (internal/modules/cjs/loader.js:703:12)
    at Module.require (internal/modules/cjs/loader.js:830:19)
    at require (internal/modules/cjs/helpers.js:68:18)
    at Object.<anonymous> (/Users/armenr/Desktop/test-pnpm/node_modules/.registry.npmjs.org/inspect-x/1.9.1/node_modules/inspect-x/index.js:51:15)
    at Module._compile (internal/modules/cjs/loader.js:936:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:947:10)

```

_______

### Things that worked when I made minor changes

After filing my bug report, I made the following changes to packages from the repo where this was happening:

```
@@ -5,32 +5,24 @@
   "main": "server.js",
   "dependencies": {
     "@hapi/joi": "^15.1.1",
-    "attempt-x": "^2.1.1",
     "axios": "^0.19.0",
     "cabin": "^4.0.0",
     "chalk": "^2.4.2",
-    "clock": "^1.0.2",
     "compression": "^1.7.4",
     "cookie-parser": "^1.4.4",
     "cors": "^2.8.5",
-    "dotenv": "^8.0.0",
-    "elastic-apm-node": "^2.13.0",
+    "dotenv": "^8.1.0",
     "express": "^4.17.1",
     "express-http-proxy": "^1.5.1",
     "express-request-id": "^1.4.1",
-    "express-session": "^1.16.1",
-    "geoip-lite": "^1.3.7",
     "ioredis": "^4.11.2",
     "morgan": "^1.9.1",
-    "pino": "^5.13.1",
+    "pino": "^5.13.2",
     "request-received": "^0.0.2",
     "response-time": "^2.3.2",
-    "signale": "^1.4.0",
-    "spotify-web-api-js": "^1.2.0",
-    "util-promisifyall": "^1.0.6"
+    "signale": "^1.4.0"
   },
   "devDependencies": {
-    "babel-plugin-root-import": "^6.2.0",
     "eslint": "^5.16.0",
     "eslint-config-airbnb": "^17.1.0",
     "eslint-config-prettier": "^4.3.0",
@@ -40,11 +32,7 @@
     "prettier": "^1.17.1"
   },
```

...as you can see, I removed a few things, and bumped a few minor version updates.

Now, with these changes, --shamefully-flatten actually began to produce working results.

I'm a bit lost as to what's going on. Any help would be much appreciated.

_______

### Here's where the bonus weirdness kicks in

Check this repo for two files I've included:

`pnpm-lock.yaml-flattened` and `pnpm-lock.yaml`

pnpm-lock.yaml-flattened is a copy of the pnpm-lock.yaml file I made when I did a --shamefully-flatten install.

pnpm-lock.yaml is a copy of the lockfile generated witha regular installation.

Run a diff of those two files. Naturally, there's no difference.
