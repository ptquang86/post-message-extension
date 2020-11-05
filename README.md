# Post Message extension

## How to update/install

1. yarn build
2. go to `chrome://extensions/` -> turn on `Developer mode` -> click `Load unpacked` -> select the `build` folder
3. open DevTools, you will see a new `Post Message` panel

## Troubleshoot

### `Post Message` panel is not visible. Error: Refused to execute inline script because it violates the following Content Security Policy directive

1. Check the status `Post Message Extension` in `chrome://extensions/`. If there is button `Errors`, click on it.
2. Copy the sha256 key `sha256-...=`
3. Paste the sha256 key into the field `content_security_policy` of `public/manifest.json`
   Example: "content_security_policy": "script-src 'self' 'PASTE_SHA256_KEY_HERE'; object-src 'self'",
