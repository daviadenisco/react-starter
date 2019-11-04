const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const { WebAppStrategy } = require('ibmcloud-appid');
const userProfileManager = require('ibmcloud-appid').UserProfileManager;

require('dotenv').config();

const {
  OAUTH_SERVER_URL,
  APP_URL,
  APP_ID_CALLBACK_URL,
  APP_ID_TENANT_ID,
  APP_ID_CLIENT_ID,
  APP_ID_SECRET,
  APP_ID_PROFILES_URL,
  AUTH_PAGE,
  UNAUTH_PAGE,
  TDMVIEW_PAGE,
  MAIN_PAGE,
} = require('../constants');

userProfileManager.init({
  profilesUrl: APP_ID_PROFILES_URL,
  oauthServerUrl: OAUTH_SERVER_URL,
});

const app = express();

app.use(helmet());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(morgan('tiny'));

app.use(
  session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.session());

// passport.use(
//   new WebAppStrategy({
//     tenantId: '772701a7-16f2-4f04-9a3d-f65703b8f2ac',
//     clientId: '5594d316-9e31-4787-bdc9-feb80c483a32',
//     secret: 'MWE4M2I4YjEtMGQwMi00MjU2LTlkODItMDZlMmYxN2Y3ZDdl',
//     oauthServerUrl:
//       'https://appid-oauth.ng.bluemix.net/oauth/v3/772701a7-16f2-4f04-9a3d-f65703b8f2ac',
//     redirectUri: `https://garage-talent-tool-cluster.us-east.containers.appdomain.cloud${APP_ID_CALLBACK_URL}`,
//   })
// );

passport.use(
  new WebAppStrategy({
    tenantId: APP_ID_TENANT_ID,
    clientId: APP_ID_CLIENT_ID,
    secret: APP_ID_SECRET,
    oauthServerUrl: OAUTH_SERVER_URL,
    redirectUri: `${APP_URL}${APP_ID_CALLBACK_URL}`,
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get(
  APP_ID_CALLBACK_URL,
  passport.authenticate(WebAppStrategy.STRATEGY_NAME)
);

app.get(AUTH_PAGE, passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get(
  APP_ID_CALLBACK_URL,
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: TDMVIEW_PAGE,
    successReturnToOrRedirect: TDMVIEW_PAGE,
    failureRedirect: UNAUTH_PAGE,
  })
);

app.get(UNAUTH_PAGE, function(req, res) {
  WebAppStrategy.logout(req);
  res.redirect(AUTH_PAGE);
});

// Serve static files on behalf of the client
app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle React routing by returning all requests to client
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}!`));
