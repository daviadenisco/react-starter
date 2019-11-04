const { NODE_ENV } = process.env;

const inProduction = () => NODE_ENV === 'production';

exports.APP_ID_CALLBACK_URL = '/ibm/cloud/appid/callback';

exports.OAUTH_SERVER_URL =
  'https://appid-oauth.ng.bluemix.net/oauth/v3/772701a7-16f2-4f04-9a3d-f65703b8f2ac';

exports.APP_URL = inProduction()
  ? 'https://garage-talent-tool-cluster.us-east.containers.appdomain.cloud'
  : 'http://localhost:5000';

exports.APP_ID_TENANT_ID = process.env.APP_ID_TENANT_ID;
exports.APP_ID_CLIENT_ID = process.env.APP_ID_CLIENT_ID;
exports.APP_ID_SECRET = process.env.APP_ID_SECRET;
exports.APP_ID_PROFILES_URL = 'https://appid-profiles.ng.bluemix.net';

console.log('process.env: ', process.env);

exports.AUTH_PAGE = '/auth';
exports.UNAUTH_PAGE = '/unauth';
exports.ENGAGEMENTS_PAGE = '/engagements';
exports.PROFILE_PAGE = '/profile';
exports.TDMVIEW_PAGE = '/tdmview';
exports.MAIN_PAGE = '/main';
