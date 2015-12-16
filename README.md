Oneman webclient
=====================================

Web client for Oneman web server.

---

### Dev

1. Clone this repo from `https://github.com/fuksi/client-oneman`
2. Set your your server address in `custom_config.js` file by copying `cp config.js custom_config.js`
3. Run `npm install gulp -g` and `npm install node-gyp -g`
3. Run `npm install` from the root directory
4. Run `gulp dev`
5. If you're at local, your browser will automatically be opened and directed to the browser-sync proxy address. If you're not at local, open your server at port 3001. 
6. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

### Troubleshooting

- On *nix based systems (latest Ubuntu, Fedora version) you might get an `Error: watch ENOSPC` when running `gulp dev`. To fix, check [this post](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on Stackoverflow. 
- Most problem with Windows come from node-gyp installation. Please refer https://github.com/nodejs/node-gyp for how to install it properly beforehand.
