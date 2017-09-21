# twxauth

> Easy Twitter XAuth(?).

## install
``` shell
npm install twxauth
```

## usage
``` javascript
'use strict';
const tx = require('twxauth');

const ck = "your consumerKey",
      cs = "your consumerSecret",
      un = "your twitter username",
      pw = "your twitter password";

(async() => {
  const token = await tx.twxauth(ck, cs, un, pw);
  console.log(token);
  /*
  **
  **  example result,
  **
  **{ accessToken: 'XXXX-XXXXXXXX',
  **  accessTokenSecret: 'XXXXXXXXXX',
  **  userId: 'XXXXXXXXXX',
  **  screenName: 'XXXXXX' }
  */
})();
```