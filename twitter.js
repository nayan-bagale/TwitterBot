import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";

// OAuth 1.0a (User context)
const userClient = new TwitterApi({
  appKey: process.env.APPKEY,
  appSecret: process.env.APPSECRET,
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: process.env.ACCESSTOKEN,
  accessSecret: process.env.ACCESSSECRECT,
});

const rwClient = userClient.readWrite;

// import Twit from 'twit'

// const T = new Twit({
//   consumer_key: "",
//   consumer_secret: "",
//   access_token: "",
//   access_token_secret: "",
// });

export default rwClient;
