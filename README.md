# electron-autoupdater

**IMPORTANT**
If you are on mac, you need a signing certificate.

1. `git clone https://github.com/ivns1993/electron-autoupdater.git`
2. `cd electron-autoupdater`
3. `npm install`
4. `npm run publish`
5. `npm run server`
6. open http://127.0.0.1:8080 and download the app (`.dmg` for mac, `.AppImage` for linux or `.exe` for windows)
7. install the app and open it, make sure to note the current version
8. edit version in `package.json` and run `npm run publish` again
9. wait a bit and you will see app closing and opening with the new version

To see app logs -> `cd ~/Library/Logs/electron-auto-update-example` and `cat main.log`
