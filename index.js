'use strict';

const autwh = require('autwh');
const client = require('cheerio-httpcli');

exports.twxauth = async(consumerKey, consumerSecret, screen_name, password) => {
  const twAuth = autwh.default({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret
  });
  const ctx = await twAuth.begin();
  
  const result = await client.fetch(ctx.url)
    .then((res) => {
      const form = res.$('#oauth_form');
      form.field({
        "session[username_or_email]": screen_name,
        "session[password]": password,
        "authenticityToken": res.body.match(/<input name=\"authenticity_token\" type=\"hidden\" value=\"(.*?)\">/)[1],
        'redirect_after_login': "https%3A%2F%2Fapi.twitter.com%2Foauth%2Fauthorize%3Foauth_token%3D" + ctx.requestToken,
        'oauth_token': ctx.requestToken
      });
      
      return res.$('#allow').click();
    })
    .then(async(res) => {
      const PIN = res.body.match(/<code>(.*?)<\/code>/);
      
      if (PIN !== null) {
        if (PIN[1].match(/[0-9]{7}/)) {
          return await twAuth.done(ctx, PIN[1]);
        }else{
          return false;
        }
      }else{
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
    
  return result;
};